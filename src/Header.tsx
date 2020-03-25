import React from 'react'
import { Box, Heading, Nav } from 'grommet'
import { RootState } from './types'
import { connect } from 'react-redux'
import { navigate } from 'hookrouter'
import Link from './Link'

// interface Props {
//   route: string;
// }

export function Header(props: any) {

  return (
    <Box>
      <Heading onClick={() => navigate('/')} style={{display: 'inline-block'}} textAlign="center" size="medium">
        PetSitter
      </Heading>
      <Nav background="brand" direction="row" pad="small">
        <Link href="/" label="Home"/>
        <Link href="/jobs" label="Jobs"/>
        <Link href="/jobs/new" label="New Job"/>
      </Nav>

    </Box>
  )
}

export default connect(
  (state: RootState) => ({
    user: state.user
  }), {

  }
)(Header)
