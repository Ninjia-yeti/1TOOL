/**
 * This file is used to register monitoring instrumentation
 * for your Next.js application.
 */
export async function register() {
  const { registerMonitoringInstrumentation } = await import(
    '@kit/monitoring/instrumentation'
  );

  // Register monitoring instrumentation
  // based on the MONITORING_PROVIDER environment variable.
  await registerMonitoringInstrumentation();
}
