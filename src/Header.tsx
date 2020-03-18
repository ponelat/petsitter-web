import React, { Component } from 'react'
import { Box, Heading, Text } from 'grommet'
import { User, RootState } from './types'
import { connect } from 'react-redux'
import { navigate } from 'hookrouter'

interface Props {
  user: User,
}

export class Header extends Component<Props, any> {

  render() {
    const {user} = this.props

    return (
      <Box>
        <Heading onClick={() => navigate('/')} style={{display: 'inline-block'}} textAlign="center" size="large">
          PetSitter
        </Heading>
          <small>
            {user.email ? user.email : ''}
          </small>
      </Box>
    )
  }
}

export default connect(
  (state: RootState) => ({
    user: state.user
  }), {

  }
)(Header)
