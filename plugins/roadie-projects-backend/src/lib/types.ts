export type Project = {
  name: string;
  owner: string;
  url: string;
  issues: Issue[];
};

export type Issue = {
  id: number;
  type: string;
  title: string;
  description: string;
  status: string;
  assigned_to: string;
  created_by: string;
  created_at: string;
};
