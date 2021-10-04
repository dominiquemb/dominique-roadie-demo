/*
 * Copyright 2020 Larder Software Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import express from 'express';
import bodyParser from 'body-parser';
import Router from 'express-promise-router';
import { Logger } from 'winston';
import { Config } from '@backstage/config';
import { ProjectsStore } from '../lib';
import { RoadieProjectRepository } from '../lib/projectRepository';

export interface RouterOptions {
  logger: Logger;
  appPackageName: string;
  config: Config;
  staticFallbackHandler?: express.Handler;
}

export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  try {
    const projectStore = new ProjectsStore({
      logger: options.logger,
      projectRepository: new RoadieProjectRepository(),
    });
    const router = Router();
    router.use(bodyParser.json());

    router
      .get('/projects', async (_, res) => {
        res.status(200).send(await projectStore.getProjects());
      })
      .get('/projects/:projectId', async (_req, res) => {
        const { params } = _req;
        const { projectId } = params;
        if (projectId) {
          try {
          const projectById = await projectStore.getProject(parseInt(projectId));
          res.status(200).send(projectById);
          } catch(err) {
            res.status(501).send(`Error: ${err}`);
          }
        } else {
          res.status(501).send('Project ID missing');
        }
      })
      .get('/projects/:projectId/issues', async (_req, res) => {
        const { params, query } = _req;
        const { projectId } = params;
        if (projectId) {
          try {
          const issuesByProjectId = await projectStore.getIssuesForProject(parseInt(projectId), query);
          res.status(200).send(issuesByProjectId);
          } catch(err) {
            res.status(501).send(`Error: ${err}`);
          }
        } else {
          res.status(501).send('Project ID missing');
        }
      })
      .get('/issues/', async (_req, res) => {
        const { query } = _req;
        
        try {
          const issues = await projectStore.getIssues(query);
          res.status(200).send(issues);
        } catch(err) {
          res.status(501).send(`Error: ${err}`);
        }
      })
      .get('/issues/:issueId', async (_req, res) => {
        const { params } = _req;
        const { issueId } = params;
        if (issueId) {
          try {
          const issue = await projectStore.getIssue(parseInt(issueId));
          res.status(200).send(issue);
          } catch(err) {
            res.status(501).send(`Error: ${err}`);
          }
        } else {
          res.status(501).send('Issue ID missing');
        }
      })
      .get('/issues/:issueId/comments', async (_req, res) => {
        const { params } = _req;
        const { issueId } = params;
        if (issueId) {
          try {
          const issue = await projectStore.getIssueComments(parseInt(issueId));
          res.status(200).send(issue);
          } catch(err) {
            res.status(501).send(`Error: ${err}`);
          }
        } else {
          res.status(501).send('Issue ID missing');
        }
      });

    return router;
  } catch (e) {
    options.logger.error(
      `plugin configured incorrectly: ${e}. Defaulting to empty router.`,
    );
    const router = Router();
    router.use((_, res) =>
      res.status(501).send('plugin configured incorrectly'),
    );
    return router;
  }
}
