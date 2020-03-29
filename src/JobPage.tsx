import {Calendar, Form, FormField, Button, Box, Heading, Select, RadioButtonGroup } from 'grommet'
import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { navigate } from 'hookrouter'
import { createJob, fetchJob, updateJob, deleteJob } from './duck-jobs'
import { Job, RootState } from './types'

interface Props {
  jobId: string;
  job?: Job;
  createJob: Function;
  updateJob: Function;
  deleteJob: Function;
  fetchJob: Function;
}

interface JobForm {
  name?: string;
  breed: string;
  size: string;
  starts_at: string;
  ends_at: string;
  years_old: string;
  activities: string[];
  description: string;
}

function jobToForm(job?: Job) : JobForm {
  if(!job) {
    return {
      years_old: '1',
      breed: '',
      activities: [],
      starts_at: (new Date()).toISOString(),
      ends_at: (new Date()).toISOString(),
      size: 'medium',
      description: '',
    }
  }
  return {
    name: job.dog.name,
    breed: job.dog.breed || '',
    size: job.dog.size || '',
    years_old: job.dog.years_old+'',
    starts_at: job.starts_at,
    ends_at: job.ends_at,
    activities: job.activities,
    description: job.description,
  }
}

export function JobPage(props: Props) {
  const today = new Date()
  const todayStr = today.toISOString()
  let todayNextYear = new Date()
  todayNextYear.setFullYear(today.getFullYear() + 1)
  const todayNextYearStr = todayNextYear.toISOString()
  const isEdit = props.jobId !== 'new'


  function onSelect(dates: any) {

    if(dates) {
      if(Array.isArray(dates)) {
        setStartsEnds(dates[0])
      } else {
        setStartsEnds([dates, dates])
      }
    }
  }


  function onSubmit(form: any) {
    const [starts_at, ends_at] = startsEnds

    const {
      name, breed, size, years_old,
      activities,
      description,
    } = form.value

    let job : Job = {
      ...props.job,
      activities,
      description,
      dog: {
        name,
        breed,
        size,
        years_old: +years_old,
      },
      starts_at,
      ends_at
    }

    if(isEdit){
      props.updateJob(job)
        .then(() => {
          navigate('/jobs')
        })
    } else {
      props.createJob(job)
        .then(() => {
          navigate('/jobs')
        })
    }
  }

  const { fetchJob, deleteJob, jobId, job } = props

  useEffect(() => {
    if(isEdit)
      fetchJob(jobId)
  }, [fetchJob, jobId, isEdit])

  const [startsEnds, setStartsEnds] = useState([
    props.job?.starts_at || todayStr,
    props.job?.ends_at   || todayStr
  ])

  const [formValue, setForm] = useState(jobToForm(props.job))
  useEffect(() => setForm(jobToForm(job)), [job])

  return (
    <Box gap="medium" fill="horizontal" align="center" pad="medium">
      <Box background="light-2" pad="medium" width="large" >
        <Heading level={3}>{isEdit ? "Edit Job" : "Create new Job"}</Heading>
        <Form validate="blur" onSubmit={onSubmit} value={formValue} onChange={(form: any) => setForm(form.value)}>

          <FormField required name="name" label="Dog name"  />
          <FormField required name="breed" label="Dog breed"  />
          <FormField required name="size" label="Size" component={RadioButtonGroup} options={['small', 'medium', 'large']} />
          <FormField name="years_old" label="Dog Age (years)" type="number" min={1} max={30} step={1} />

          <FormField required name="description" label="Description" />

          <FormField label="Start / End" >
            <Calendar
              size="small"
              bounds={[todayStr, todayNextYearStr]}
              onSelect={onSelect}
              range
              dates={[startsEnds]}
            />
          </FormField>

          <FormField required name="activities" placeholder="Select one or more activites" label="Activities" multiple options={[ "walk", "dropin", "boarding", "sitting", "daycare"]} component={Select} />

          <Box direction="row" justify="between" gap="medium" >
            <Button onClick={() => navigate('/jobs')} label="Back to Jobs"/>
            <Button label="Delete" onClick={() => {
              if(window.confirm("Do you want to remove this job?")) {
                deleteJob(jobId)
                navigate('/jobs')
              }
            }}/>
            <Button type="submit" primary label="Save"/>
          </Box>
        </Form>
      </Box>
    </Box>
  )
}


export default connect((state: RootState) => {
  return {
    job: state.jobs.current
  }
}, {
  createJob,
  updateJob,
  deleteJob,
  fetchJob,
})(JobPage)
