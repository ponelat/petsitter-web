import React from 'react'
import { Box, Heading, Header, Nav } from 'grommet'
import { RootState, User } from './types'
import { connect } from 'react-redux'
import { navigate, setLinkProps } from 'hookrouter'
import Link from './Link'
import Avatar from './Avatar'

// interface Props {
//   route: string;
// }

export function HeaderComp(props: any) {

  const { full_name } : User = props.user

  return (
    <Box>
      <Heading onClick={() => navigate('/')} style={{display: 'inline-block'}} textAlign="center" size="medium">
        PetSitter
      </Heading>

      <Header background="brand" pad="small">
        <Nav background="brand" direction="row" pad="small">
          <Link href="/" label="Home"/>
          <Link href="/jobs" label="Jobs"/>
          <Link href="/jobs/new" label="New Job"/>
        </Nav>
        {full_name ? (
          <Box direction="row" align="center" gap="small">
            <Link color="white" href="/logout" label="Logout"/>
            <Link color="white" href="/profile" label={full_name}/>
            <Avatar {...setLinkProps({href: '/profile'})}/>
          </Box>
        ) : null }
      </Header>
    </Box>
  )
}

export default connect(
  (state: RootState) => ({
    user: state.user
  }), {

  }
)(HeaderComp)
