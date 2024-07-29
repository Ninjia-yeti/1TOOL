'use client';

import { useMemo } from 'react';

import dynamic from 'next/dynamic';

import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import { ThemeProvider } from 'next-themes';

import { CaptchaProvider } from '@kit/auth/captcha/client';
import { I18nProvider } from '@kit/i18n/provider';
import { MonitoringProvider } from '@kit/monitoring/components';
import { AppEventsProvider } from '@kit/shared/events';
import { If } from '@kit/ui/if';
import { VersionUpdater } from '@kit/ui/version-updater';

import { AnalyticsProvider } from '~/components/analytics-provider';
import { AuthProvider } from '~/components/auth-provider';
import appConfig from '~/config/app.config';
import authConfig from '~/config/auth.config';
import featuresFlagConfig from '~/config/feature-flags.config';
import { i18nResolver } from '~/lib/i18n/i18n.resolver';
import { getI18nSettings } from '~/lib/i18n/i18n.settings';

import { ReactQueryProvider } from './react-query-provider';

const captchaSiteKey = authConfig.captchaTokenSiteKey;

const CaptchaTokenSetter = dynamic(async () => {
  if (!captchaSiteKey) {
    return Promise.resolve(() => null);
  }

  const { CaptchaTokenSetter } = await import('@kit/auth/captcha/client');

  return {
    default: CaptchaTokenSetter,
  };
});

export function RootProviders({
  lang,
  theme = appConfig.theme,
  children,
}: React.PropsWithChildren<{
  lang: string;
  theme?: string;
}>) {
  const i18nSettings = useMemo(() => getI18nSettings(lang), [lang]);

  return (
    <MonitoringProvider>
      <AppEventsProvider>
        <AnalyticsProvider>
          <ReactQueryProvider>
            <ReactQueryStreamedHydration>
              <I18nProvider settings={i18nSettings} resolver={i18nResolver}>
                <CaptchaProvider>
                  <CaptchaTokenSetter siteKey={captchaSiteKey} />

                  <AuthProvider>
                    <ThemeProvider
                      attribute="class"
                      enableSystem
                      disableTransitionOnChange
                      defaultTheme={theme}
                      enableColorScheme={false}
                    >
                      {children}
                    </ThemeProvider>
                  </AuthProvider>
                </CaptchaProvider>

                <If condition={featuresFlagConfig.enableVersionUpdater}>
                  <VersionUpdater />
                </If>
              </I18nProvider>
            </ReactQueryStreamedHydration>
          </ReactQueryProvider>
        </AnalyticsProvider>
      </AppEventsProvider>
    </MonitoringProvider>
  );
}
