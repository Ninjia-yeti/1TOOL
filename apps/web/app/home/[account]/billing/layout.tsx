import { notFound } from 'next/navigation';

import featureFlagsConfig from '~/config/feature-flags.config';

function TeamAccountBillingLayout(props: React.PropsWithChildren) {
  const isEnabled = featureFlagsConfig.enableTeamAccountBilling;

  if (!isEnabled) {
    notFound();
  }

  return <>{props.children}</>;
}

export default TeamAccountBillingLayout;
