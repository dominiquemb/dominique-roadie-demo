import React from 'react';
import { Table, TableColumn, Progress } from '@backstage/core';
import Alert from '@material-ui/lab/Alert';
import { useAsync } from 'react-use';
import { Issue } from './types';

type DenseTableProps = {
  issues: Issue[];
};

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const DenseTable = ({ issues }: DenseTableProps) => {

  const columns: TableColumn[] = [
    { title: 'Type', field: 'type' },
    { title: 'Title', field: 'title' },
    { title: 'Status', field: 'status' },
    { title: 'Assigned to', field: 'assignedTo' },
    { title: 'Created by', field: 'createdBy' },
  ];

  const data = issues.map(issue => {
    return {
      type: issue.type,
      title: issue.title,
      status: issue.status,
      assignedTo: issue.assigned_to,
      createdBy: issue.created_by
    };
  });

  return (
    <Table
      title="Issues"
      options={{ search: false, paging: false }}
      columns={columns}
      data={data}
    />
  );
};

export const SummaryStatsComponent = (params: { projectId: string|null|false } ) => {
  if (!params.projectId) {
    return <DenseTable issues={[]} />
  }

  const { value, loading, error } = useAsync(async (): Promise<Issue[]> => {
    const response = await fetch(`http://localhost:7000/api/ticketing/projects/${params.projectId}/issues/`);
    let data = await response.json();
    if (data) {
      data = data.map((issue: Issue) => {
        if (issue.status === "inprogress") {
          issue.status = "In Progress"
        }

        issue.status = capitalizeFirstLetter(issue.status);
        issue.type = capitalizeFirstLetter(issue.type);

        return issue;
      });
    }
    return data;
  }, []);

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  return <DenseTable issues={value || []} />;
};
