import { Project, Issue, Comment } from './types';

export interface ProjectRepository {
  getProjects(): Promise<Project[]>;
  getProject(projectId: number): Promise<Project|null>
  getIssuesForProject(projectId: number, query: any): Promise<Issue[]>
  getIssue(issueId: number): Promise<Issue|null>
  getIssues(query:any): Promise<Issue[]>
  getIssueComments(issueId: number): Promise<Comment[]>
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
      console.log(project.id);
      if (project.id === projectId) {
        foundProject = project;
      }
    })
    return foundProject;
  }

  async getIssuesForProject(projectId: number, query: any): Promise<Issue[]> {
    const data = await import('./projects.json');
    const { title, description, assignedTo, createdBy, type, status } = query;

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

        if (title) {
          issues = issues.filter((issue) => issue.title.toLowerCase().indexOf(title) > -1);
        }

        if (description) {
          issues = issues.filter((issue) => issue.description.toLowerCase().indexOf(description) > -1);
        }

        if (createdBy) {
          issues = issues.filter((issue) => issue.created_by === createdBy);
        }
      }
    })
    return issues;
  }

  async getIssues(query:any): Promise<Issue[]> {
    const { title, description, assignedTo, createdBy, type, status } = query;
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

        if (title) {
          issues = issues.filter((issue) => issue.title.toLowerCase().indexOf(title) > -1);
        }

        if (description) {
          issues = issues.filter((issue) => issue.description.toLowerCase().indexOf(description) > -1);
        }

        if (createdBy) {
          issues = issues.filter((issue) => issue.created_by === createdBy);
        }
      });
    });
    return issues;
  }

  async getIssue(issueId: number): Promise<Issue|null> {
    const data = await import('./projects.json');
    let foundIssue = null;
    data.projects.forEach((project: Project) => {
      project.issues.forEach((issue: Issue) => {
        if (issue.id === issueId) {
          foundIssue = issue;
        }
      });
    })
    return foundIssue;
  }

  async getIssueComments(issueId: number): Promise<Comment[]> {
    const data = await import('./projects.json');
    let comments: Comment[] = [];

    data.projects.forEach((project: Project) => {
      project.issues.forEach((issue: Issue) => {
        if (issue.id === issueId) {
          if (issue.comments) {
            comments = issue.comments;
          }
        }
      });
    });

    return comments;
  }
}
