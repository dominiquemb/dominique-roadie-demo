import React from 'react';
// import { useParams } from 'react-router';
import { Typography, Grid } from '@material-ui/core';
import moment from 'moment';
import {
  InfoCard,
  // Header,
  Page,
  Content,
  // ContentHeader,
  // HeaderLabel,
  // SupportButton,
} from '@backstage/core';
import { useEntity } from '@backstage/plugin-catalog-react';

export const IssueTrackerCommentsComponent = (params: any) => {
  // const { issueId } = useParams();
  const { entity } = useEntity();
  const [comments, setComments] = React.useState(null as any);
  const [issue, setIssue] = React.useState(null as any);
  const { metadata } = entity;
  const { annotations } = metadata;
  const projectId = annotations && annotations['backstage.io/project-id'] ? annotations['backstage.io/project-id'] : false;

  
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const fetchIssue = async() => {
    const response = await fetch(`http://localhost:7000/api/ticketing/issues/${params.issueId}`);
    let data = await response.json();
    setIssue(data);
  }

  const fetchComments = async() => {
    const response = await fetch(`http://localhost:7000/api/ticketing/issues/${params.issueId}/comments`);
    let data = await response.json();
    setComments(data);
  }

  React.useEffect(() => {
    if (!issue) {
      fetchIssue();
    }
    if (!comments) {
      fetchComments();
    }
  }, [comments, issue]);


  return (
  <Page themeId="tool">
    <Content>
      <Grid container spacing={3} direction="column">
        <Grid item>
          <InfoCard title={issue && issue.title ? issue.title : ``}>
              <InfoCard title="Details">
                <Typography variant="body1">
                    <strong>Type: </strong> <span>{ issue && issue.type && capitalizeFirstLetter(issue.type) }</span>
                </Typography>
                <Typography variant="body1">
                    <strong>Assigned to: </strong> <span>{ issue && issue.assigned_to }</span>
                </Typography>
                <Typography variant="body1">
                    <strong>Created by: </strong> <span>{ issue && issue.created_by }</span>
                </Typography>
                <Typography variant="body1">
                    <strong>Status: </strong> {issue && issue.status && (<span>{ issue.status === 'inprogress' ? `In progress` : capitalizeFirstLetter(issue.status) }</span>)}
                </Typography>
                <Typography variant="body1">
                    <strong>Created: </strong> <span>{ issue && issue.created_at && moment(issue.created_at).format('dddd, MMM Do YYYY') }</span>
                </Typography>
                <br />
                <Typography variant="body1">
                  <strong>Description:</strong>
                </Typography>
                <Typography variant="body1">
                  <span>{ issue && issue.description }</span>
                </Typography>
              </InfoCard>
            <br /><br />
              <InfoCard title="Comments">
              { comments && comments.map((comment: any, index: number) => (
                    <InfoCard key={index} title={<Typography variant="body1"><strong>{comment.author}</strong></Typography>}>
                    <p>{comment.comment}</p>
                    <br />
                    <p><strong>Written </strong><em>{`${moment(comment.timestamp).format('dddd, MMM Do YYYY')} (${moment(comment.timestamp).startOf('hour').fromNow()})`}</em></p>
                    </InfoCard>
              ))}
              </InfoCard>
          </InfoCard>
        </Grid>
      </Grid>
    </Content>
  </Page>
  )
};
