import { Project } from './types';

export interface ProjectRepository {
  getProjects(): Promise<Project[]>;

  // getProject(id: number): Promise<Project>
  // getIssuesForProject(projectId: number): Promise<Issue[]>
  // getIssue(issueId: number): Promise<Issue>
}

export class RoadieProjectRepository implements ProjectRepository {
  async getProjects(): Promise<Project[]> {
    const data = await import('./projects.json');
    return data.projects;
  }
}
