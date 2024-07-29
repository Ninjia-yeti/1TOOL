import type { PlopTypes } from '@turbo/gen';

import { createEnvironmentVariablesGenerator } from './templates/env/generator';
import { createKeystaticAdminGenerator } from './templates/keystatic/generator';
import { createPackageGenerator } from './templates/package/generator';
import { createEnvironmentVariablesValidatorGenerator } from './templates/validate-env/generator';

// List of generators to be registered
const generators = [
  createPackageGenerator,
  createKeystaticAdminGenerator,
  createEnvironmentVariablesGenerator,
  createEnvironmentVariablesValidatorGenerator,
];

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  generators.forEach((gen) => gen(plop));
}
