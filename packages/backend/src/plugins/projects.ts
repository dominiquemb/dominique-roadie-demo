import { createRouter } from '@roadiehq/roadie-projects-backend';
import { Router } from 'express';
import { PluginEnvironment } from '../types';

export default async function createPlugin({
  logger,
  config,
}: PluginEnvironment): Promise<Router> {
  return await createRouter({
    logger,
    config,
    appPackageName: 'roadie-projects-backend',
  });
}
