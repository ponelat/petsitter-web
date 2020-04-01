import React, {useState} from 'react'
import {Form, FormField, Button, Box, Heading } from 'grommet'
import SelectWithBoxes from './SelectWithBoxes'

// import * as userActions from './redux/modules/user'

import { User } from './types'

interface Props {
  user?: User;
  onSave: Function;
}

export default function Profile(props: Props) {
  const { onSave, user } = props
  const [formValue, setForm] = useState(user || {roles: ['PetOwner'], email: 'bob@example.com'})

  return (
      <Box background="light-2" pad="medium" >
        <Heading level={3}>Create User</Heading>
        <Form
          validate="blur"
          value={formValue}
          onChange={(form: any) => setForm(form.value)}
          onSubmit={(form: any) => onSave(form)}
           >

          <FormField required name="full_name" label="Name" />
          <FormField required name="password" label="Password" type="password" />
          <FormField required name="email" label="Email" type="email"/>
          <FormField
            required
            name="roles"
            multiple
            label="Roles"
            component={SelectWithBoxes}
            options={['PetSitter', 'PetOwner']}
            validate={(val) => {
              if(!val?.length || val.length < 1)
                return 'At least one role is required.'
            }}
          />
          <Button fill type="submit" primary label="Create User" />
        </Form>
      </Box>
  )
}
