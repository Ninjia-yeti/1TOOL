import { revalidatePath } from 'next/cache';
import dynamic from 'next/dynamic';
import { notFound, redirect } from 'next/navigation';

import { getBillingGatewayProvider } from '@kit/billing-gateway';
import { BillingSessionStatus } from '@kit/billing-gateway/components';
import { getSupabaseServerComponentClient } from '@kit/supabase/server-component-client';

import billingConfig from '~/config/billing.config';
import { withI18n } from '~/lib/i18n/with-i18n';
import { requireUserInServerComponent } from '~/lib/server/require-user-in-server-component';

interface SessionPageProps {
  searchParams: {
    session_id: string;
  };
}

const LazyEmbeddedCheckout = dynamic(
  async () => {
    const { EmbeddedCheckout } = await import('@kit/billing-gateway/checkout');

    return EmbeddedCheckout;
  },
  {
    ssr: false,
  },
);

async function ReturnCheckoutSessionPage({ searchParams }: SessionPageProps) {
  const sessionId = searchParams.session_id;

  if (!sessionId) {
    redirect('../');
  }

  const { customerEmail, checkoutToken } = await loadCheckoutSession(sessionId);

  if (checkoutToken) {
    return (
      <LazyEmbeddedCheckout
        checkoutToken={checkoutToken}
        provider={billingConfig.provider}
      />
    );
  }

  return (
    <>
      <div className={'fixed left-0 top-48 z-50 mx-auto w-full'}>
        <BillingSessionStatus
          onRedirect={onRedirect}
          customerEmail={customerEmail ?? ''}
        />
      </div>

      <BlurryBackdrop />
    </>
  );
}

export default withI18n(ReturnCheckoutSessionPage);

function BlurryBackdrop() {
  return (
    <div
      className={
        'fixed left-0 top-0 w-full bg-background/30 backdrop-blur-sm' +
        ' !m-0 h-full'
      }
    />
  );
}

async function loadCheckoutSession(sessionId: string) {
  await requireUserInServerComponent();

  const client = getSupabaseServerComponentClient();
  const gateway = await getBillingGatewayProvider(client);

  const session = await gateway.retrieveCheckoutSession({
    sessionId,
  });

  if (!session) {
    notFound();
  }

  const checkoutToken = session.isSessionOpen ? session.checkoutToken : null;

  // otherwise - we show the user the return page
  // and display the details of the session
  return {
    status: session.status,
    customerEmail: session.customer.email,
    checkoutToken,
  };
}

/**
 * Revalidates the layout to update cached pages
 * and redirects back to the home page.
 */
// eslint-disable-next-line @typescript-eslint/require-await
async function onRedirect() {
  'use server';

  // revalidate the home page to update cached pages
  // which may have changed due to the billing session
  revalidatePath('/home', 'layout');

  // redirect back to billing page
  redirect('../billing');
}
