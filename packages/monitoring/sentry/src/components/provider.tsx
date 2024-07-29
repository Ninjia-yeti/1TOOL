import { MonitoringContext } from '@kit/monitoring-core';

import { SentryMonitoringService } from '../services/sentry-monitoring.service';

const sentry = new SentryMonitoringService();

export function SentryProvider({ children }: React.PropsWithChildren) {
  return <MonitoringProvider>{children}</MonitoringProvider>;
}

function MonitoringProvider(props: React.PropsWithChildren) {
  return (
    <MonitoringContext.Provider value={sentry}>
      {props.children}
    </MonitoringContext.Provider>
  );
}
