import React, { Component } from 'react'
import { Box, Heading } from 'grommet'

interface Props {
  route: string;
}

export default class Header extends Component<Props, any> {

  render() {
    // const {route} = this.props

    return (
      <Box>
        <Heading style={{display: 'inline-block'}} textAlign="center" size="large"> PetSitter </Heading>
      </Box>
    )
  }
}
