import React from 'react'
import {Form, FormField, Button, Box, Heading } from 'grommet'
import SelectWithBoxes from './SelectWithBoxes'

// import * as userActions from './redux/modules/user'

import { User } from './types'

interface Props {
  user?: User;
  onSave: Function;
}

export default function Profile(props: Props) {
  const { onSave } = props
  // const isEdit = !!props.user?.email



  return (
      <Box background="light-2" pad="medium" >
        <Heading level={3}>Create User</Heading>
        <Form
          onSubmit={(form: any) => onSave(form)}
          onChange={(form: any) => console.log(JSON.stringify(form))} >

          <FormField name="fullName" label="Name" />
          <FormField name="password" label="Password" type="password" />
          <FormField name="email" label="Email" type="email"/>
          <FormField defaultValue={['PetSitter']} name="roles" multiple label="Roles" component={SelectWithBoxes} options={['PetSitter', 'PetOwner']} />
          <Button fill type="submit" primary label="Create User" />
        </Form>
      </Box>
  )
}
