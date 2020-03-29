import React, { useState } from 'react'
import {Form, FormField, Button, Box, Heading } from 'grommet'
import { navigate } from 'hookrouter'
import { connect } from 'react-redux'
import { login } from './duck-user'
import SelectCheckboxes from './SelectCheckboxes'

// import * as userActions from './redux/modules/user'

import { User } from './types'

interface Props {
  login: Function;
}

export function LoginPage(props: Props) {

  const onSubmit = (form: any) => {
    const {email, password} : User = form.value
    props.login({email,password})
    navigate('/jobs')
  }

  const [form, setForm] = useState({
    roles: ['PetSitter']
  })
  const [roles, setRoles] = useState(['PetSitter'])
  console.log("roles", roles)



  // const onChangeForm = (form: any) => {
  //   setForm({...form, roles})
  // }

  return (
    <Box gap="medium" direction="row" align="center" fill="horizontal" justify="center" >

      <Box background="light-2" pad="medium" >
        <Heading level={3}>Create User</Heading>
        <Form
          onSubmit={(form: any) => alert(JSON.stringify(form.value))}
          value={form} >

          <FormField name="fullName" label="Name" />
          <FormField name="password" label="Password" type="password" />
          <FormField name="email" label="Email" type="email"/>
          <FormField name="roles" label="Roles">
            <SelectCheckboxes
              options={['PetSitter', 'PetOwner']}
              value={form.roles}
              onChange={setRoles}
            />
          </FormField>
          <Button fill type="submit" primary label="Create User" />
        </Form>
      </Box>

      <Box background="light-2" pad="medium" width="medium" >
        <Heading level={3}>Login</Heading>
        <Form onSubmit={onSubmit}>
          <FormField name="email" label="Email" type="email"/>
          <FormField name="password" label="Password" type="password" />
          <Button fill type="submit" primary label="Login"/>
        </Form>
      </Box>

    </Box>
  )
}

export default connect((state) => {
  return {}
}, {
  login
})(LoginPage)
