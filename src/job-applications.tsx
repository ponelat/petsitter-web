import { Box, Heading } from 'grommet'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import JobApplications from './JobApplications'
import { RootState, JobApplication } from './types'
import {fetchMyJobApplications, acceptDenyJobApplication} from './duck-jobs'

interface Props {
  jobApplications?: JobApplication[];
  fetchMyJobApplications: Function;
  acceptDenyJobApplication: Function;
}

export function JobApplicationsPage(props: Props) {

  const { jobApplications=[], fetchMyJobApplications, acceptDenyJobApplication } = props

  useEffect(() => {
    fetchMyJobApplications()
  },[fetchMyJobApplications])

  return (
    <Box gap="medium" fill="horizontal" align="center" pad="medium">
      <Heading level={3}>Pending Job Applications</Heading>
      <JobApplications
        jobApplications={jobApplications}
        acceptDenyJobApplication={acceptDenyJobApplication}
      />
    </Box>
  )
}

export default connect((state: RootState) => {
  return {
    jobApplications: state.jobs.currentApplications,
  }
}, {
  fetchMyJobApplications,
  acceptDenyJobApplication,
})(JobApplicationsPage)
