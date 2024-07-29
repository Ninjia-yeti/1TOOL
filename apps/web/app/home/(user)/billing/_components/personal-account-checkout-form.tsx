'use client';

import { useState, useTransition } from 'react';

import dynamic from 'next/dynamic';

import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

import { PlanPicker } from '@kit/billing-gateway/components';
import { useAppEvents } from '@kit/shared/events';
import { Alert, AlertDescription, AlertTitle } from '@kit/ui/alert';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@kit/ui/card';
import { If } from '@kit/ui/if';
import { Trans } from '@kit/ui/trans';

import billingConfig from '~/config/billing.config';

import { createPersonalAccountCheckoutSession } from '../_lib/server/server-actions';

const EmbeddedCheckout = dynamic(
  async () => {
    const { EmbeddedCheckout } = await import('@kit/billing-gateway/checkout');

    return {
      default: EmbeddedCheckout,
    };
  },
  {
    ssr: false,
  },
);

export function PersonalAccountCheckoutForm(props: {
  customerId: string | null | undefined;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState(false);
  const appEvents = useAppEvents();

  const [checkoutToken, setCheckoutToken] = useState<string | undefined>(
    undefined,
  );

  // only allow trial if the user is not already a customer
  const canStartTrial = !props.customerId;

  // If the checkout token is set, render the embedded checkout component
  if (checkoutToken) {
    return (
      <EmbeddedCheckout
        checkoutToken={checkoutToken}
        provider={billingConfig.provider}
        onClose={() => setCheckoutToken(undefined)}
      />
    );
  }

  // Otherwise, render the plan picker component
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            <Trans i18nKey={'common:planCardLabel'} />
          </CardTitle>

          <CardDescription>
            <Trans i18nKey={'common:planCardDescription'} />
          </CardDescription>
        </CardHeader>

        <CardContent className={'space-y-4'}>
          <If condition={error}>
            <ErrorAlert />
          </If>

          <PlanPicker
            pending={pending}
            config={billingConfig}
            canStartTrial={canStartTrial}
            onSubmit={({ planId, productId }) => {
              startTransition(async () => {
                try {
                  appEvents.emit({
                    type: 'checkout.started',
                    payload: { planId },
                  });

                  const { checkoutToken } =
                    await createPersonalAccountCheckoutSession({
                      planId,
                      productId,
                    });

                  setCheckoutToken(checkoutToken);
                } catch (e) {
                  setError(true);
                }
              });
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}

function ErrorAlert() {
  return (
    <Alert variant={'destructive'}>
      <ExclamationTriangleIcon className={'h-4'} />

      <AlertTitle>
        <Trans i18nKey={'common:planPickerAlertErrorTitle'} />
      </AlertTitle>

      <AlertDescription>
        <Trans i18nKey={'common:planPickerAlertErrorDescription'} />
      </AlertDescription>
    </Alert>
  );
}
