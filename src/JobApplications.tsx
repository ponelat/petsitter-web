import React from 'react'
import {Button, Box, Table, TableBody, TableRow, TableCell, TableHeader} from 'grommet'
import { A } from 'hookrouter'

const jobApplications = [
  {
    "id": "string0",
    "user_id": "string",
    "job_id": "string99",
    "status": "APPLYING"
  },{
    "id": "string1",
    "user_id": "string",
    "job_id": "string98",
    "status": "APPLYING"
  },{
    "id": "string2",
    "user_id": "string",
    "job_id": "string97",
    "status": "APPLYING"
  }
]



export function JobApplicationRow(jobApplication: any) {

  const {id, job_id, status, accept} = jobApplication

  return (
    <TableRow>

      <TableCell>
        <A href={`/jobs/${job_id}`}>#{job_id}</A>
      </TableCell>

      <TableCell>{status}</TableCell>

      <TableCell><A href={`/job-applications/${id}`}>Details</A></TableCell>

      <TableCell>
        <Button label="Accept" primary onClick={accept} />
      </TableCell>

    </TableRow>
  )

}


interface Props {

}

export default function JobApplications (props: Props) {
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
