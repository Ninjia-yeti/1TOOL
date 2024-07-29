import { useEffect } from 'react';

import { useMonitoring } from './use-monitoring';

export function useCaptureException(error: Error) {
  const service = useMonitoring();

  useEffect(() => {
    void service.captureException(error);
  }, [error, service]);
}
