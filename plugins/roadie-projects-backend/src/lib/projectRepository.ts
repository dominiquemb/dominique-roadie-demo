import { Project, Issue } from './types';

export interface ProjectRepository {
  getProjects(): Promise<Project[]>;
  getProject(projectId: number): Promise<Project|null>
  getIssuesForProject(projectId: number): Promise<Issue[]>
  getIssue(issueId: number): Promise<Issue|null>
  getIssues(): Promise<Issue[]>
}

export class RoadieProjectRepository implements ProjectRepository {
  async getProjects(): Promise<Project[]> {
    const data = await import('./projects.json');
    return data.projects;
  }

  async getProject(projectId: number): Promise<Project|null> {
    const data = await import('./projects.json');
    let foundProject = null;
    data.projects.filter((project) => {
      if (project.id === projectId) {
        foundProject = project;
      }
    })
    return foundProject;
  }

  async getIssuesForProject(projectId: number): Promise<Issue[]> {
    const data = await import('./projects.json');
    let issues: Issue[] = [];
    data.projects.forEach((project) => {
      if (project.id === projectId) {
        issues = project.issues;
      }
    })
    return issues;
  }

  async getIssues(): Promise<Issue[]> {
    const data = await import('./projects.json');
    const issues:Issue[] = [];
    data.projects.forEach((project) => {
      project.issues.forEach((issue) => {
        issues.push(issue)
      });
    })
    return issues;
  }

  async getIssue(issueId: number): Promise<Issue|null> {
    const data = await import('./projects.json');
    let foundIssue = null;
    data.projects.forEach((project) => {
      project.issues.forEach((issue) => {
        if (issue.id === issueId) {
          foundIssue = issue;
        }
      });
    })
    return foundIssue;
  }
}
