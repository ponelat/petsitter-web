import React, { Component } from 'react'
import {Form, FormField, Button, Box, Heading } from 'grommet'
import { navigate } from 'hookrouter'
import { connect } from 'react-redux'
import { login } from './redux/modules/user'

// import * as userActions from './redux/modules/user'

import { User } from './types'

interface Props {
  login: Function;
}

export class Home extends Component<Props, any> {

  onSubmit = (form: any) => {
    const {email, password} : User = form.value
    this.props.login({email,password})
    navigate('/jobs')
  }

  render() {

    return (
      <Box gap="medium" direction="row" align="center" fill="horizontal" justify="center" >

        <Box background="light-2" pad="medium" >
          <Heading level={3}>Create User</Heading>
          <Form>
            <FormField name="fullName" label="Name" />
            <FormField name="password" label="Password" type="password" />
            <FormField name="email" label="Email" type="email"/>
            <Button fill type="submit" primary label="Create User" />
          </Form>
        </Box>

        <Box background="light-2" pad="medium" width="medium" >
          <Heading level={3}>Login</Heading>
          <Form onSubmit={this.onSubmit}>
            <FormField name="email" label="Email" type="email"/>
            <FormField name="password" label="Password" type="password" />
            <Button fill type="submit" primary label="Login"/>
          </Form>
        </Box>

      </Box>
    )
  }
}

export default connect((state) => {
}, {
  login
})(Home)
