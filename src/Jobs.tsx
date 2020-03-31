import React from 'react'
import {Button, Table, TableBody, TableRow, TableCell, TableHeader} from 'grommet'
import { A, navigate } from 'hookrouter'
import { Job } from './types'


interface Props {
  jobs?: Job[];
  deleteJob: Function;
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

interface JobRowProps {
  job: Job;
  deleteJob: Function;
}
function JobRow({job, deleteJob} : JobRowProps) {

  const {id, dog, starts_at, ends_at, activities} = job
  const startsAtStr = formatDate(starts_at)
  const endsAtStr = formatDate(ends_at)

  const deleteJobWithAlert = () => window.confirm(`Are you sure you want to delete job #${id}`) ? deleteJob(id) : null

  return (
    <TableRow>

      <TableCell>
        <A href={`/jobs/${id}`}>#{id}</A>
      </TableCell>

      <TableCell>{dog?.name}</TableCell>

      <TableCell>{duration(starts_at, ends_at)}</TableCell>

      <TableCell>{startsAtStr} to {endsAtStr}</TableCell>

      <TableCell>{activities.join(',')}</TableCell>

      <TableCell gap="small" direction="row" >
        <Button label="Delete" color="status-critical" onClick={deleteJobWithAlert} />
        <Button label="Edit" onClick={() => navigate(`/jobs/${id}`)} />
      </TableCell>

    </TableRow>
  )

}

export default function Jobs(props: Props) {
  const { deleteJob, jobs=[] } = props

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

        {jobs.map(job => <JobRow key={job.id} job={job} deleteJob={deleteJob} />)}

      </TableBody>
    </Table>
  )
}
