import React from 'react';
import { Link } from 'react-router-dom';
import { Table, TableColumn, Progress } from '@backstage/core';
import { Select, InputLabel, MenuItem } from '@material-ui/core';
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
    { title: 'Title', field: 'title', render: (row:any) => <Link style={{color: "#0000EE"}} to={`?issueId=${row.id}`}>{row.title}</Link>},
    { title: 'Status', field: 'status' },
    { title: 'Assigned to', field: 'assignedTo' },
    { title: 'Created by', field: 'createdBy' },
  ];

  const data = issues.map(issue => {
    return {
      id: issue.id,
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
  const [issues, setIssues] = React.useState(null as any);
  const [issueTypes, setIssueTypes] = React.useState([] as string[]);
  const [issueStatuses, setIssueStatuses] = React.useState([] as string[]);
  const [issueUsers, setIssueUsers] = React.useState([] as string[]);
  const [currentType, setCurrentType] = React.useState('All');
  const [currentStatus, setCurrentStatus] = React.useState('All');
  const [viewingUser, setViewingUser] = React.useState('All');

  const handleTypeChange = (event: any) => {
    setCurrentType(event.target.value);
  };

  const handleStatusChange = (event: any) => {
    setCurrentStatus(event.target.value);
  };

  const handleAssignedToChange = (event: any) => {
    setViewingUser(event.target.value);
  };

  const fetchData = async() => {
    let queryStr = '';

    if (currentType !== 'All') {
      queryStr += `type=${currentType}`
    }

    if (currentStatus !== 'All') {
      queryStr += `status=${currentStatus}`
    }

    if (viewingUser !== 'All') {
      queryStr += `assignedTo=${viewingUser}`
    }

    if (queryStr.length > 0) {
      queryStr = '?' + queryStr;
    } 

    const response = await fetch(`http://localhost:7000/api/ticketing/projects/${params.projectId}/issues${queryStr}`);
    let data = await response.json();
    if (data) {
      data = data.map((issue: Issue) => {
        if (issueTypes.indexOf(issue.type) === -1) {
          let issueTypesNew = issueTypes;
          issueTypesNew.push(issue.type);
          setIssueTypes(issueTypesNew);
        }

        if (issueStatuses.indexOf(issue.status) === -1) {
          let issueStatusesNew = issueStatuses;
          issueStatusesNew.push(issue.status);
          setIssueStatuses(issueStatusesNew);
        }

        if (issueUsers.indexOf(issue.assigned_to) === -1) {
          let issueUsersNew = issueUsers;
          issueUsersNew.push(issue.assigned_to);
          setIssueUsers(issueUsersNew);
        }

        if (issue.status === "inprogress") {
          issue.status = "In Progress"
        }

        issue.status = capitalizeFirstLetter(issue.status);
        issue.type = capitalizeFirstLetter(issue.type);
        return issue;
      });
    }
    setIssues(data);
  }


  if (!params.projectId) {
    return <DenseTable issues={[]} />
  }

  React.useEffect(() => {
    fetchData();
  }, [currentType, currentStatus, viewingUser]);

  // const { value, loading, error } = useAsync(async (): Promise<Issue[]> => {
  //   const response = await fetch(`http://localhost:7000/api/ticketing/projects/${params.projectId}/issues/`);
  //   let data = await response.json();
  //   if (data) {
  //     data = data.map((issue: Issue) => {
  //       if (issueTypes.indexOf(issue.type) === -1) {
  //         let issueTypesNew = issueTypes;
  //         issueTypesNew.push(issue.type);
  //         setIssueTypes(issueTypesNew);
  //       }

  //       if (issue.status === "inprogress") {
  //         issue.status = "In Progress"
  //       }

  //       issue.status = capitalizeFirstLetter(issue.status);
  //       issue.type = capitalizeFirstLetter(issue.type);

  //       return issue;
  //     });
  //   }
  //   setIssues(data);

  //   return data;
  // }, []);

  // if (loading) {
  //   return <Progress />;
  // } else if (error) {
  //   return <Alert severity="error">{error.message}</Alert>;
  // }

  return (
    <>
      <div style={{display: 'inline-block', margin: 15}}>
        <InputLabel id="type-select">Type</InputLabel>
        <Select
          labelId="type-select"
          id="type-select"
          value={currentType}
          label="Type"
          onChange={handleTypeChange}
        >
          <MenuItem value={'All'}>All</MenuItem>
          {issueTypes.map((issueType, i) => {
              return <MenuItem value={issueType} key={i}>{issueType}</MenuItem>
          })}
        </Select>
      </div>
      <div style={{display: 'inline-block', margin: 15}}>
        <InputLabel id="status-select">Status</InputLabel>
        <Select
          labelId="status-select"
          id="status-select"
          value={currentStatus}
          label="Status"
          onChange={handleStatusChange}
        >
          <MenuItem value={'All'}>All</MenuItem>
          {issueStatuses.map((issueStatus, i) => {
              return <MenuItem value={issueStatus} key={i}>{issueStatus}</MenuItem>
          })}
        </Select>
      </div>
      <div style={{display: 'inline-block', margin: 15}}>
        <InputLabel id="assignedto-select">Assigned to</InputLabel>
        <Select
          labelId="assignedto-select"
          id="assignedto-select"
          value={viewingUser}
          label="Assigned to"
          onChange={handleAssignedToChange}
        >
          <MenuItem value={'All'}>All</MenuItem>
          {issueUsers.map((issueUser, i) => {
              return <MenuItem value={issueUser} key={i}>{issueUser}</MenuItem>
          })}
        </Select>
      </div>
      <DenseTable issues={issues || []} />
    </>
  )
};
