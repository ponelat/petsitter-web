import React from 'react'
import {Button, Table, TableBody, TableRow, TableCell, TableHeader} from 'grommet'
import { A } from 'hookrouter'
import { connect } from 'react-redux'


const jobs = {
  "items": [{
    "id": "string0",
    "creator_user_id": "string",
    "worker_user_id": "string",
    "starts_at": "2020-03-19T14:37:20.132Z",
    "ends_at": "2020-03-19T14:37:20.132Z",
    "dog": {
      "name": "string",
      "size": "small",
      "years_old": 0,
      "breed": "string"
    },
    "activities": [
      "walk"
    ],
    "created_at": "2020-03-19T14:37:20.132Z",
    "updated_at": "2020-03-19T14:37:20.132Z",
    "description": "string"
  },{
    "id": "string1",
    "creator_user_id": "string",
    "worker_user_id": "string",
    "starts_at": "2020-03-19T14:37:20.132Z",
    "ends_at": "2020-03-19T14:37:20.132Z",
    "dog": {
      "name": "string",
      "size": "small",
      "years_old": 0,
      "breed": "string"
    },
    "activities": [
      "walk"
    ],
    "created_at": "2020-03-19T14:37:20.132Z",
    "updated_at": "2020-03-19T14:37:20.132Z",
    "description": "string"
  }],
  "total_items": 2,
  "has_more": true
}

interface Props {
  findAll: Function;
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

        {jobs.items.map(job => <JobRow key={job.id} {...job}/>)}

      </TableBody>
    </Table>
  )
}

export default connect((state) => {
  return {}

}, {
  findAll: () => {}
})(Jobs)
