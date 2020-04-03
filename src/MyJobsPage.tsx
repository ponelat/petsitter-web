import { Box, Heading, Button } from 'grommet'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Jobs from './Jobs'
import { navigate } from 'hookrouter'
import { RootState, Job, User } from './types'
import { deleteJob, getMyJobs, applyToJob } from './duck-jobs'

interface Props {
  myJobs?: Job[];
  user: User;
  applyToJob: Function;
  getMyJobs: Function;
  deleteJob: Function;
}

export function JobsPageComponent(props: Props) {

  const { myJobs, getMyJobs, deleteJob, applyToJob, user} = props

  useEffect(() => {
    getMyJobs()
  },[getMyJobs])

  const deleteThenReloadJobs = (id: string) => {
    deleteJob(id).then(() => {
      getMyJobs()
    })
  }

  return (
    <Box gap="medium" fill="horizontal" align="center" pad="medium">
      <Heading level={3}>My Jobs</Heading>

      <Jobs
        jobs={myJobs}
        user={user}
        deleteJob={deleteThenReloadJobs}
        editJob={(id: string) => navigate(`/jobs/${id}`) }
        applyToJob={applyToJob}
      />

      <Button onClick={() => navigate('/jobs/new')} label="Create Job" primary />
    </Box>
  )
}

export default connect((state: RootState) => {
  return {
    myJobs: state.jobs.myJobs,
    user: state.user,
  }
}, {
  getMyJobs,
  deleteJob,
  applyToJob,
})(JobsPageComponent)
