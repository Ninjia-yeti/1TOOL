# Your Application

Write here everything about your application.

## Setup

For working locally, please add a file named `.env.local` where we can place our environment variables. This file is not committed to Git, therefore it is safe to store sensitive information in it.

After starting Supabase, copy the service role key from the Supabase project settings and add it to the `.env.local` file.

```
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Stripe

For the Stripe integration, first we need to start the Stripe CLI:

```
pnpm run stripe:listen
```

Then, update the `.env.local` file with the following variables:

```
STRIPE_WEBHOOK_SECRET=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

### Supabase

Please follow the instructions in the [Supabase README](../supabase/README.md) to setup your Supabase project.
