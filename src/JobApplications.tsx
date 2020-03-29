import React, {useEffect} from 'react'
import {Button, Box, Table, TableBody, TableRow, TableCell, TableHeader} from 'grommet'
import { A } from 'hookrouter'
import { RootState, JobApplication } from './types'
import { connect } from 'react-redux'


export function JobApplicationRow(jobApplication: any) {

  const {job_id, status, accept} = jobApplication

  return (
    <TableRow>

      <TableCell>
        <A href={`/jobs/${job_id}`}>#{job_id}</A>
      </TableCell>

      <TableCell>{status}</TableCell>

      <TableCell>
        <Button label="Accept" primary onClick={accept} />
      </TableCell>

    </TableRow>
  )

}


interface Props {
  jobApplications?: JobApplication[];
}

export default function JobApplicationsComp (props: Props) {
  const { jobApplications = [] } = props

  return (
    <Box gap="medium" fill="horizontal" align="center" pad="medium">

      <Table>
        <TableHeader>
          <TableRow>

            <TableCell scope="col" border="bottom">
              Job ID
            </TableCell>

            <TableCell scope="col" border="bottom">
              Status
            </TableCell>

            <TableCell scope="col" border="bottom">
            </TableCell>

          </TableRow>
        </TableHeader>
        <TableBody>

          {jobApplications.map(job => <JobApplicationRow key={job.id} {...job}/>)}

        </TableBody>
      </Table>
    </Box>
  )

}
