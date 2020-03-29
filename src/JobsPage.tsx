import { Box, Heading, Button } from 'grommet'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Jobs from './Jobs'
import { navigate } from 'hookrouter'
import { RootState, JobsPage } from './types'
import {getNextPage} from './duck-jobs'

interface Props {
  jobsPage?: JobsPage;
  getNextPage: Function;
}

export function JobsPageComponent(props: Props) {

  const { jobsPage, getNextPage} = props

  useEffect(() => {
    getNextPage()
  },[getNextPage])

  return (
    <Box gap="medium" fill="horizontal" align="center" pad="medium">
      <Heading level={3}>My Jobs</Heading>
      <Jobs jobsPage={jobsPage}/>

      <Button onClick={() => navigate('/jobs/new')} label="Create Job" primary />
    </Box>
  )
}

export default connect((state: RootState) => {
  return {
    jobsPage: state.jobs.jobsPage,
  }
}, {
  getNextPage,
})(JobsPageComponent)
