# Monitoring / @kit/monitoring

Please set the following environment variable to your preferred monitoring provider:

```
NEXT_PUBLIC_MONITORING_PROVIDER=
ENABLE_MONITORING_INSTRUMENTATION=true
```

## Available Providers

To use a specific provider, set the `NEXT_PUBLIC_MONITORING_PROVIDER` environment variable to one of the following values:

1. Baselime: `baselime`
2. Sentry: `sentry`

## Baselime

To use Baselime, set the `NEXT_PUBLIC_MONITORING_PROVIDER` environment variable to `baselime`.

```
NEXT_PUBLIC_MONITORING_PROVIDER=baselime
```

## Sentry

To use Sentry, set the `NEXT_PUBLIC_MONITORING_PROVIDER` environment variable to `sentry`.

```
NEXT_PUBLIC_MONITORING_PROVIDER=sentry
```

## Instrumentation

To enable instrumentation, set the `ENABLE_MONITORING_INSTRUMENTATION` environment variable to `true`.

```
ENABLE_MONITORING_INSTRUMENTATION=true
```