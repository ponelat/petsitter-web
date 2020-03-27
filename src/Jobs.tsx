import React from 'react'
import {Button, Table, TableBody, TableRow, TableCell, TableHeader} from 'grommet'
import { A } from 'hookrouter'
import { connect } from 'react-redux'
import { JobsPage } from './types'


interface Props {
  jobsPage: JobsPage
}

function applyTo(id: string) {

}

function JobRow(job: any) {

  const {id, dog={}} = job

  return (
    <TableRow>

      <TableCell>
        <A href={`/jobs/${id}`}>#{id}</A>
      </TableCell>

      <TableCell>{dog.name}</TableCell>

      <TableCell>1 day</TableCell>

      <TableCell>Jan-01 to Jan-02</TableCell>

      <TableCell><A href="/jobs/1234">Details</A></TableCell>

      <TableCell>
        <Button label="Apply" primary onClick={() => applyTo('1234')} />
      </TableCell>

    </TableRow>
  )

}


export function Jobs(props: Props) {
  const jobs = props.jobsPage.items || []
  return (
    <Table>
      <TableHeader>
        <TableRow>

          <TableCell scope="col" border="bottom">
            Job ID
          </TableCell>

          <TableCell scope="col" border="bottom">
            Dog
          </TableCell>

          <TableCell scope="col" border="bottom">
            Duration
          </TableCell>

          <TableCell scope="col" border="bottom">
            Date
          </TableCell>

          <TableCell scope="col" border="bottom">
            Activities
          </TableCell>

          <TableCell scope="col" border="bottom">
          </TableCell>

        </TableRow>
      </TableHeader>
      <TableBody>

        {!jobs.length ? (
          <TableRow><TableCell> No Jobs! </TableCell></TableRow>
        ) : null }

        {jobs.map(job => <JobRow key={job.id} {...job}/>)}

      </TableBody>
    </Table>
  )
}

export default connect((state) => {
  return {}

}, {
  findAll: () => {}
})(Jobs)
