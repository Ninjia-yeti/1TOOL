import { getMonitoringProvider } from './get-monitoring-provider';
import { InstrumentationProvider } from './monitoring-providers.enum';

const PROVIDER = getMonitoringProvider();

/**
 * @name registerMonitoringInstrumentation
 * @description Register monitoring instrumentation based on the MONITORING_PROVIDER environment variable.
 *
 * Please set the MONITORING_PROVIDER environment variable to register the monitoring instrumentation provider.
 */
export async function registerMonitoringInstrumentation() {
  if (!PROVIDER) {
    return;
  }

  switch (PROVIDER) {
    case InstrumentationProvider.Baselime: {
      const { registerInstrumentation } = await import(
        '@kit/baselime/instrumentation'
      );

      return registerInstrumentation();
    }

    case InstrumentationProvider.Sentry: {
      // Sentry v8 automatically sets this up

      return;
    }

    default:
      throw new Error(
        `Unknown instrumentation provider: ${process.env.NEXT_PUBLIC_MONITORING_PROVIDER}`,
      );
  }
}
