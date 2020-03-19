import React, { Component } from 'react'
import {Form, FormField, Button, Box, Heading } from 'grommet'
import { navigate } from 'hookrouter'
import { connect } from 'react-redux'

interface Props {
  findAll: Function;
}

export function Jobs(props: Props) {

  return (
    <Box gap="medium" direction="row" align="center" fill="horizontal" justify="center" >

    Jobs

    </Box>
  )
}

export default connect((state) => {

}, {
})(Jobs)
