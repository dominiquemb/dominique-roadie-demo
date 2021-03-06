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
      import('./components/IssueTrackerComponent').then(m => m.IssueTrackerComponent),
    mountPoint: rootRouteRef,
  }),
);

export const IssueTrackerComments = roadieFrontendPlugin.provide(
  createRoutableExtension({
    component: () =>
      import('./components/IssueTrackerCommentsComponent').then(m => m.IssueTrackerCommentsComponent),
    mountPoint: rootRouteRef,
  }),
);
