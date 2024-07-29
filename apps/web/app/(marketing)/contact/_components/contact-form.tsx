'use client';

import { useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Alert, AlertDescription, AlertTitle } from '@kit/ui/alert';
import { Button } from '@kit/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@kit/ui/form';
import { Input } from '@kit/ui/input';
import { Textarea } from '@kit/ui/textarea';
import { Trans } from '@kit/ui/trans';

import { ContactEmailSchema } from '~/(marketing)/contact/_lib/contact-email.schema';
import { sendContactEmail } from '~/(marketing)/contact/_lib/server/server-actions';

export function ContactForm() {
  const [pending, startTransition] = useTransition();

  const [state, setState] = useState({
    success: false,
    error: false,
  });

  const form = useForm({
    resolver: zodResolver(ContactEmailSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  if (state.success) {
    return <SuccessAlert />;
  }

  if (state.error) {
    return <ErrorAlert />;
  }

  return (
    <Form {...form}>
      <form
        className={'flex flex-col space-y-4'}
        onSubmit={form.handleSubmit((data) => {
          startTransition(async () => {
            try {
              await sendContactEmail(data);

              setState({ success: true, error: false });
            } catch (error) {
              setState({ error: true, success: false });
            }
          });
        })}
      >
        <FormField
          name={'name'}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>
                  <Trans i18nKey={'marketing:contactName'} />
                </FormLabel>

                <FormControl>
                  <Input maxLength={200} {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          name={'email'}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>
                  <Trans i18nKey={'marketing:contactEmail'} />
                </FormLabel>

                <FormControl>
                  <Input type={'email'} {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          name={'message'}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>
                  <Trans i18nKey={'marketing:contactMessage'} />
                </FormLabel>

                <FormControl>
                  <Textarea
                    className={'min-h-36'}
                    maxLength={5000}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            );
          }}
        />

        <Button disabled={pending} type={'submit'}>
          <Trans i18nKey={'marketing:sendMessage'} />
        </Button>
      </form>
    </Form>
  );
}

function SuccessAlert() {
  return (
    <Alert variant={'success'}>
      <AlertTitle>
        <Trans i18nKey={'marketing:contactSuccess'} />
      </AlertTitle>

      <AlertDescription>
        <Trans i18nKey={'marketing:contactSuccessDescription'} />
      </AlertDescription>
    </Alert>
  );
}

function ErrorAlert() {
  return (
    <Alert variant={'destructive'}>
      <AlertTitle>
        <Trans i18nKey={'marketing:contactError'} />
      </AlertTitle>

      <AlertDescription>
        <Trans i18nKey={'marketing:contactErrorDescription'} />
      </AlertDescription>
    </Alert>
  );
}
