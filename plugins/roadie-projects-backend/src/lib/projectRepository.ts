import { Project, Issue } from './types';

export interface ProjectRepository {
  getProjects(): Promise<Project[]>;
  getProject(projectId: number): Promise<Project|null>
  getIssuesForProject(projectId: number, query: any): Promise<Issue[]>
  getIssue(issueId: number): Promise<Issue|null>
  getIssues(query:any): Promise<Issue[]>
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

  async getIssuesForProject(projectId: number, query: any): Promise<Issue[]> {
    const data = await import('./projects.json');
    const { assignedTo, type, status } = query;

    let issues: Issue[] = [];
    data.projects.forEach((project) => {
      if (project.id === projectId) {
        issues = project.issues;

        if (assignedTo) {
          issues = issues.filter((issue) => issue.assigned_to === assignedTo);
        }

        if (type) {
          issues = issues.filter((issue) => issue.type === type);
        }

        if (status) {
          issues = issues.filter((issue) => issue.status === status);
        }
      }
    })
    return issues;
  }

  async getIssues(query:any): Promise<Issue[]> {
    const { assignedTo, type, status } = query;
    const data = await import('./projects.json');
    let issues:Issue[] = [];

    data.projects.forEach((project) => {
      project.issues.forEach((issue) => {
        issues.push(issue);

        if (assignedTo) {
          issues = issues.filter((issue) => issue.assigned_to === assignedTo);
        }

        if (type) {
          issues = issues.filter((issue) => issue.type === type);
        }

        if (status) {
          issues = issues.filter((issue) => issue.status === status);
        }
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
