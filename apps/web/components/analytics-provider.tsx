'use client';

import { useEffect } from 'react';

import { usePathname, useSearchParams } from 'next/navigation';

import { analytics } from '@kit/analytics';
import {
  AppEvent,
  AppEventType,
  ConsumerProvidedEventTypes,
  useAppEvents,
} from '@kit/shared/events';

type AnalyticsMapping<
  T extends ConsumerProvidedEventTypes = NonNullable<unknown>,
> = {
  [K in AppEventType<T>]?: (event: AppEvent<T, K>) => void;
};

/**
 * Hook to subscribe to app events and map them to analytics actions
 * @param mapping
 */
function useAnalyticsMapping<T extends ConsumerProvidedEventTypes>(
  mapping: AnalyticsMapping<T>,
) {
  const appEvents = useAppEvents<T>();

  useEffect(() => {
    const subscriptions = Object.entries(mapping).map(
      ([eventType, handler]) => {
        appEvents.on(eventType as AppEventType<T>, handler);

        return () => appEvents.off(eventType as AppEventType<T>, handler);
      },
    );

    return () => {
      subscriptions.forEach((unsubscribe) => unsubscribe());
    };
  }, [appEvents, mapping]);
}

/**
 * Define a mapping of app events to analytics actions
 * Add new mappings here to track new events in the analytics service from app events
 */
const analyticsMapping: AnalyticsMapping = {
  'user.signedIn': (event) => {
    const userId = event.payload.userId;

    if (userId) {
      analytics.identify(userId);
    }
  },
  'user.signedUp': (event) => {
    analytics.trackEvent(event.type, event.payload);
  },
  'checkout.started': (event) => {
    analytics.trackEvent(event.type, event.payload);
  },
  'user.updated': (event) => {
    analytics.trackEvent(event.type, event.payload);
  },
};

/**
 * Provider for the analytics service
 */
export function AnalyticsProvider(props: React.PropsWithChildren) {
  // Subscribe to app events and map them to analytics actions
  useAnalyticsMapping(analyticsMapping);

  // Report page views to the analytics service
  useReportPageView((url) => analytics.trackPageView(url));

  // Render children
  return props.children;
}

/**
 * Hook to report page views to the analytics service
 * @param reportAnalyticsFn
 */
function useReportPageView(reportAnalyticsFn: (url: string) => void) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = [pathname, searchParams.toString()].filter(Boolean).join('?');

    reportAnalyticsFn(url);
  }, [pathname, reportAnalyticsFn, searchParams]);
}
