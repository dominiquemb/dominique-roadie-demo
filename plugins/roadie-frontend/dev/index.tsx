import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { roadieFrontendPlugin, RoadieFrontendPage } from '../src/plugin';

createDevApp()
  .registerPlugin(roadieFrontendPlugin)
  .addPage({
    element: <RoadieFrontendPage />,
    title: 'Root Page',
  })
  .render();
