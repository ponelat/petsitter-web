import { Box, Heading, Button } from 'grommet'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Jobs from './Jobs'
import JobApplications from './JobApplications'
import { navigate } from 'hookrouter'
import { RootState, JobsPage, JobApplication } from './types'
import {getNextPage, fetchJobApplicationsForUser} from './duck-jobs'

interface Props {
  jobsPage?: JobsPage;
  jobApplications?: JobApplication[];
  getNextPage: Function;
  fetchJobApplicationsForUser: Function;
}

export function JobsPageComponent(props: Props) {

  const { jobsPage, getNextPage, jobApplications=[], fetchJobApplicationsForUser } = props

  useEffect(() => {
    getNextPage()
    fetchJobApplicationsForUser()
  },[getNextPage, fetchJobApplicationsForUser])

  return (
    <Box gap="medium" fill="horizontal" align="center" pad="medium">
      <Heading level={3}>Pending Job Applications</Heading>
      <JobApplications jobApplications={jobApplications}/>

      <Heading level={3}>My Jobs</Heading>
      <Jobs jobsPage={jobsPage}/>

      <Button onClick={() => navigate('/jobs/new')} label="Create Job" primary />
    </Box>
  )
}

export default connect((state: RootState) => {
  return {
    jobsPage: state.jobs.jobsPage,
    jobApplications: state.jobs.currentApplications,
  }
}, {
  fetchJobApplicationsForUser,
  getNextPage,
})(JobsPageComponent)
