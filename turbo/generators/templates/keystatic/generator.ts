import type { PlopTypes } from '@turbo/gen';
import { execSync } from 'node:child_process';

export function createKeystaticAdminGenerator(plop: PlopTypes.NodePlopAPI) {
  return plop.setGenerator('keystatic', {
    description: 'Generate a the admin for Keystatic',
    prompts: [],
    actions: [
      {
        type: 'add',
        path: 'apps/web/app/keystatic/layout.tsx',
        templateFile: 'templates/keystatic/layout.tsx.hbs',
      },
      {
        type: 'add',
        path: 'apps/web/app/keystatic/[[...params]]/page.tsx',
        templateFile: 'templates/keystatic/page.tsx.hbs',
      },
      {
        type: 'add',
        path: 'apps/web/app/api/keystatic/[...params]/route.ts',
        templateFile: 'templates/keystatic/route.ts.hbs',
      },
      {
        type: 'modify',
        path: 'apps/web/package.json',
        async transform(content) {
          const pkg = JSON.parse(content);
          const dep = `@keystatic/next`;

          const version = await fetch(
            `https://registry.npmjs.org/-/package/${dep}/dist-tags`,
          )
            .then((res) => res.json())
            .then((json) => json.latest);

          pkg.dependencies![dep] = `^${version}`;
          pkg.dependencies!['@kit/keystatic'] = `workspace:*`;

          return JSON.stringify(pkg, null, 2);
        },
      },
      async () => {
        /**
         * Install deps and format everything
         */
        execSync('pnpm manypkg fix', {
          stdio: 'inherit',
        });

        execSync('pnpm i', {
          stdio: 'inherit',
        });

        return `Keystatic admin generated!`;
      },
    ],
  });
}
