import React from 'react'
import { createGlobalStyle } from 'styled-components'
import {useRoutes, useInterceptor} from 'hookrouter';

import { Grommet, Grid, Main, Box, Heading } from 'grommet'

import Header from './Header'
import JobsPageComponent from './JobsPage'
import JobPage from './JobPage'
import Home from './Home'
import ErrorComp from './ErrorComp'
import { logout } from './duck-user'
import { connect } from 'react-redux'

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    min-height: 100vh;
  }
`

const routes = {
  '/': () => <Home/> ,
  '/jobs': () => <JobsPageComponent/>,
  '/jobs/:id': ({id}: any) => <JobPage jobId={id} />,
  '/profile': () => <Box> Profile </Box>,
} // End of Routes


const theme = {

}

const PageNotFound = () => (
  <Heading level={2}> Page not found </Heading>
)

interface Props {
  logout: Function;
}

function App(props: Props) {

  useInterceptor((currentPath: string, nextPath: string) => {
    if(nextPath === '/logout') {
      props.logout()
      return '/'
    }
    return nextPath
  })

  const route = useRoutes(routes)

  return (
    <>
      <GlobalStyle/>
      <Grommet plain theme={theme}>
        <Grid
          style={{'minHeight': '100vh'}}
          rows={['200px', '1fr', 'xsmall']}
          columns={['flex']}
          gap="small"
          areas={[
            { name: 'header', start: [0, 0], end: [1, 0] },
            { name: 'main', start: [0, 1], end: [1, 1] },
            { name: 'footer', start: [0, 2], end: [1, 2] },
          ]}
        >
          <Box gridArea="header">
            <Header/>
            <ErrorComp/>
          </Box>
          <Main gridArea="main" direction="row" alignContent="end" gap="small" >
            {route || <PageNotFound/>}
          </Main>
          <Box gridArea="footer" background="light-2" >
          </Box>
        </Grid>
      </Grommet>
    </>
  )
}

export default connect(()=>{
  return {}
}, {
  logout
})(App)
