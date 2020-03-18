import React from 'react'
import { createGlobalStyle } from 'styled-components'
import {useRoutes} from 'hookrouter';

import { Grommet, Grid, Main, Box } from 'grommet'

import Header from './Header'
import Home from './Home'

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    min-height: 100vh;
  }
`

const routes = {
  '/': () => <Home/> ,
  '/jobs': () => <Box>Jobs</Box>,
  '/profile': () => <Box> Profile </Box>
}

const PageNotFound = () => <Box>Page not found</Box>

function App() {

  const route = useRoutes(routes)

  return (
    <>
      <GlobalStyle/>
      <Grommet plain>
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
            <Header />
          </Box>
          <Main gridArea="main" direction="row" alignContent="end" gap="small" >
            {route || <PageNotFound/>}
          </Main>
          <Box gridArea="footer" background="light-2" >
            Footer
          </Box>
        </Grid>
      </Grommet>
    </>
  )
}

export default App
