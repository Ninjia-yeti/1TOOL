import { notFound } from 'next/navigation';

import featureFlagsConfig from '~/config/feature-flags.config';

function UserBillingLayout(props: React.PropsWithChildren) {
  const isEnabled = featureFlagsConfig.enablePersonalAccountBilling;

  if (!isEnabled) {
    notFound();
  }

  return <>{props.children}</>;
}

export default UserBillingLayout;
