import {Form, RangeInput, Calendar, FormField, Button, Box, Heading, Select, RadioButtonGroup } from 'grommet'
import React, {useState} from 'react'
import { connect } from 'react-redux'
import { navigate } from 'hookrouter'
import { createJob } from './duck-jobs'
import { Job } from './types'

export function NewJobsPage(props: any) {
  const today = new Date()
  const todayStr = today.toISOString()
  let todayNextYear = new Date()
  todayNextYear.setFullYear(today.getFullYear() + 1)
  const todayNextYearStr = todayNextYear.toISOString()
  const [startsEnds, setStartsEnds] = useState([todayStr, todayStr])

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

    let newForm : Job = {
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

    alert(JSON.stringify(newForm))
    props.createJob(newForm).then(() => {
      navigate('/jobs')
    })
  }

  const [formValue, setForm] = useState({
    years_old: 1,
  })

  return (
    <Box gap="medium" fill="horizontal" align="center" pad="medium">
      <Box background="light-2" pad="medium" width="large" >
        <Heading level={3}>Create new job</Heading>
        <Form onSubmit={onSubmit} value={formValue} onChange={(form: any) => setForm(form.value)}>

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
            <Button type="submit" primary label="Save"/>
          </Box>
        </Form>
      </Box>
    </Box>
  )
}

export default connect((state) => {
  return {}
}, {
  createJob
})(NewJobsPage)
