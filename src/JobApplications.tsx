import React from 'react'
import {Button, Box, Table, TableBody, TableRow, TableCell, TableHeader} from 'grommet'
import { A } from 'hookrouter'
import { JobApplication } from './types'


interface RowProps extends JobApplication {
  key: string;
  deny: Function;
  accept: Function;
}

export function JobApplicationRow(jobApplication: RowProps) {

  const {job_id, status, deny, accept} = jobApplication

  return (
    <TableRow>

      <TableCell>
        <A href={`/jobs/${job_id}`}>#{job_id}</A>
      </TableCell>

      <TableCell>{status}</TableCell>

      <TableCell gap="small" direction="row">
        <Button label="Accept" primary onClick={() => accept()} />
        <Button label="Deny" onClick={() => deny()} />
      </TableCell>

    </TableRow>
  )

}


interface Props {
  jobApplications?: JobApplication[];
  acceptDenyJobApplication: Function;
}

export default function JobApplicationsComp (props: Props) {
  const { jobApplications = [], acceptDenyJobApplication } = props

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

          {
            jobApplications.map(job => (
              <JobApplicationRow
                {...job}
                key={job.id || ''}
                deny={() => acceptDenyJobApplication(job.id, 'DENIED')}
                accept={() => acceptDenyJobApplication(job.id, 'ACCEPTED')}
              />
            ))
          }

        </TableBody>
      </Table>
    </Box>
  )

}
