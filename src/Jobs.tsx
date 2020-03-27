import React from 'react'
import {Button, Table, TableBody, TableRow, TableCell, TableHeader} from 'grommet'
import { A } from 'hookrouter'
import { connect } from 'react-redux'
import { JobsPage, Job } from './types'


interface Props {
  jobsPage: JobsPage
}

function applyTo(id: string) {

}

function formatDate(str: string) {
  const d = new Date(str)
  const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' })
  const [{ value: mo },,{ value: da }] = dtf.formatToParts(d)
  return `${mo}-${da}`
}

function duration(starts: string, ends: string) {
  const first = new Date(starts).getTime()
  const second = new Date(ends).getTime()
  const days = Math.round((second-first)/(1000*60*60*24)) + 1;
  return days + (days > 1 ? ' days' : ' day')
}

function JobRow(job: Job) {

  const {id, dog, starts_at, ends_at} = job
  const startsAtStr = formatDate(starts_at)
  const endsAtStr = formatDate(ends_at)

  return (
    <TableRow>

      <TableCell>
        <A href={`/jobs/${id}`}>#{id}</A>
      </TableCell>

      <TableCell>{dog?.name}</TableCell>

      <TableCell>{duration(starts_at, ends_at)}</TableCell>

      <TableCell>{startsAtStr} to {endsAtStr}</TableCell>

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
