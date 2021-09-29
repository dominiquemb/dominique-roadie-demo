import { createPlugin, createRoutableExtension } from '@backstage/core';

import { rootRouteRef } from './routes';

export const roadieFrontendPlugin = createPlugin({
  id: 'roadie-frontend',
  routes: {
    root: rootRouteRef,
  },
});

export const RoadieFrontendPage = roadieFrontendPlugin.provide(
  createRoutableExtension({
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
