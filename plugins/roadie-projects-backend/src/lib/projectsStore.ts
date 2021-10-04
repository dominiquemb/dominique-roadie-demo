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

import { Logger } from 'winston';
import { ProjectRepository } from './projectRepository';
import { Project, Issue, Comment } from './types';

interface ProjectsStoreOptions {
  logger: Logger;
  projectRepository: ProjectRepository;
}

export class ProjectsStore {
  private readonly logger: Logger;
  private readonly projectRepository: ProjectRepository;

  constructor(options: ProjectsStoreOptions) {
    this.logger = options.logger;
    this.projectRepository = options.projectRepository;
  }

  getProjects = async (): Promise<Project[]> => {
    this.logger.info('Retrieving projects from repository');
    const projects = (await this.projectRepository.getProjects()) as Project[];
    return projects;
  };

  getProject = async(projectId: number): Promise<Project|null> => {
    this.logger.info('Retrieving projects from repository by ID');
    const project = (await this.projectRepository.getProject(projectId)) as Project|null;
    return project;
  };

  getIssuesForProject = async(projectId: number, query: any): Promise<Issue[]> => {
    this.logger.info('Retrieving issues from repository by project ID');
    const issues = (await this.projectRepository.getIssuesForProject(projectId, query)) as Issue[];
    return issues;
  };

  getIssue = async(issueId: number): Promise<Issue|null> => {
    this.logger.info('Retrieving issue by ID');
    const issue = (await this.projectRepository.getIssue(issueId)) as Issue|null;
    return issue;
  };

  getIssues = async(query: any): Promise<Issue[]> => {
    this.logger.info('Retrieving issues');
    const issues = (await this.projectRepository.getIssues(query)) as Issue[];
    return issues;
  };

  getIssueComments = async(issueId: number): Promise<Comment[]> => {
    this.logger.info('Retrieving issue comments');
    const comments = (await this.projectRepository.getIssueComments(issueId)) as Comment[];
    return comments;
  }
}
