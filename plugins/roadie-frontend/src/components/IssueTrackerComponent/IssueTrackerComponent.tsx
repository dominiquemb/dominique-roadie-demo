import React from 'react';
import { Typography, Grid } from '@material-ui/core';
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
import { SummaryStatsComponent } from '../SummaryStatsComponent';
import { IssueTrackerCommentsComponent } from '../IssueTrackerCommentsComponent';

export const IssueTrackerComponent = () => {
  const issueId = (new URLSearchParams(window.location.search)).get("issueId");
  const { entity } = useEntity();
  const { metadata } = entity;
  const { annotations } = metadata;
  const projectId = annotations && annotations['backstage.io/project-id'] ? annotations['backstage.io/project-id'] : false;
  
  return (
  <Page themeId="tool">
    <Content>
      <Grid container spacing={3} direction="column">
        <Grid item>
        {!issueId && (
          <InfoCard title="Summary">
            <Typography variant="body1">
                <SummaryStatsComponent projectId={projectId} />
            </Typography>
          </InfoCard>
        )}
        {issueId && (
          <IssueTrackerCommentsComponent issueId={issueId} />
        )}
        </Grid>
      </Grid>
    </Content>
  </Page>
  )
};
