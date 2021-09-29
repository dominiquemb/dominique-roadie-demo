import { Project, Issue } from './types';

export interface ProjectRepository {
  getProjects(): Promise<Project[]>;
  getProjectsById(projectId: number): Promise<Project[]>;
  getIssuesByProjectId(projectId: number): Promise<Issue[]>;

  // getProject(id: number): Promise<Project>
  // getIssuesForProject(projectId: number): Promise<Issue[]>
  // getIssue(issueId: number): Promise<Issue>
}

export class RoadieProjectRepository implements ProjectRepository {
  async getProjects(): Promise<Project[]> {
    const data = await import('./projects.json');
    return data.projects;
  }

  async getProjectsById(projectId: number): Promise<Project[]> {
    const data = await import('./projects.json');
    const projectsById = data.projects.filter((project) => {
      if (project.id === projectId) {
        return true;
      }
      return false;
    })
    return projectsById;
  }


  async getIssuesByProjectId(projectId: number): Promise<Issue[]> {
    const data = await import('./projects.json');
    let issues: Issue[] = [];
    data.projects.forEach((project) => {
      if (project.id === projectId) {
        issues = project.issues;
      }
    })
    return issues;
  }
}
