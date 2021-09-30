import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import {
  InfoCard,
  Header,
  Page,
  Content,
  ContentHeader,
  HeaderLabel,
  SupportButton,
} from '@backstage/core';
import { useEntity } from '@backstage/plugin-catalog-react';
import { SummaryStatsComponent } from '../SummaryStatsComponent';

export const IssueTrackerComponent = () => {
  const { entity } = useEntity();
  const { metadata } = entity;
  const { annotations } = metadata;
  const projectId = annotations && annotations['backstage.io/project-id'] ? annotations['backstage.io/project-id'] : false;

  console.log(entity);
  console.log(projectId)
  
  return (
  <Page themeId="tool">
    <Header title="Welcome to roadie-frontend!" subtitle="Optional subtitle">
      <HeaderLabel label="Owner" value="Team X" />
      <HeaderLabel label="Lifecycle" value="Alpha" />
    </Header>
    <Content>
      <ContentHeader title="Plugin title">
        <SupportButton>A description of your plugin goes here.</SupportButton>
      </ContentHeader>
      <Grid container spacing={3} direction="column">
        <Grid item>
          <InfoCard title="Summary Stats">
            <Typography variant="body1">
              <SummaryStatsComponent projectId={projectId} />
            </Typography>
          </InfoCard>
        </Grid>
      </Grid>
    </Content>
  </Page>
  )
};
