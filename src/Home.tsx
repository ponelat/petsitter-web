import React, { Component } from 'react'
import {Form, FormField, Button, Box, Heading } from 'grommet'
import { navigate } from 'hookrouter'


interface Props {

}

export default class Home extends Component<Props, any> {

  onSubmit = () => {
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
