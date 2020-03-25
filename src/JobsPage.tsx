import { Box, Heading, Button } from 'grommet'
import React from 'react'
import { connect } from 'react-redux'
import Jobs from './Jobs'
import JobApplications from './JobApplications'
import { navigate } from 'hookrouter'

interface Props {

}

export function JobsPage(props: Props) {
  return (
    <Box gap="medium" fill="horizontal" align="center" pad="medium">

      <Heading level={3}>Pending Job Applications</Heading>
      <JobApplications/>

      <Heading level={3}>My Jobs</Heading>
      <Jobs/>

      <Button onClick={() => navigate('/jobs/new')} label="Create Job" primary />


    </Box>
  )
}

export default connect((state) => {
  return {}

}, {
})(JobsPage)
