import React, { useState } from 'react'
import {Form, FormField, Button, Box, Heading } from 'grommet'
import { navigate } from 'hookrouter'
import { connect } from 'react-redux'
import { login } from './duck-user'
import Profile from './Profile'
import { User } from './types'

const signup = () => {}

interface Props {
  login: Function;
}

export function LoginPage(props: Props) {

  const onLogin = (form: any) => {
    const {email, password} : User = form.value
    props.login({email,password})
    navigate('/jobs')
  }

  // const [roles, setRoles] = useState(['PetOwner'])
  // const [form, setForm] = useState({
  //   roles
  // })

  return (
    <Box gap="medium" direction="row" align="center" fill="horizontal" justify="center" >

      <Profile onSave={signup} />

      <Box background="light-2" pad="medium" width="medium" >
        <Heading level={3}>Login</Heading>
        <Form onSubmit={onLogin}>
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
  login,
  signup,
})(LoginPage)
