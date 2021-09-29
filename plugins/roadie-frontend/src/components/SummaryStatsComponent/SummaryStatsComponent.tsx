import React from 'react';
import { Table, TableColumn, Progress } from '@backstage/core';
import Alert from '@material-ui/lab/Alert';
import { useAsync } from 'react-use';
import { Issue } from './types';

type DenseTableProps = {
  issues: Issue[];
};

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

export const SummaryStatsComponent = () => {
  const { value, loading, error } = useAsync(async (): Promise<Issue[]> => {
    const response = await fetch('https://localhost:7000/api/ticketing/projects/3/issues/');
    const data = await response.json();
    return data.results;
  }, []);

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  return <DenseTable issues={value || []} />;
};
