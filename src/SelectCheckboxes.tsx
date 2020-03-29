import React from "react"
import { Box, CheckBox } from 'grommet'

interface SelectCheckBoxProps {
  value: string[];
  options: string[];
  onChange: Function;
}

export default function SelectCheckboxes (props: SelectCheckBoxProps) {
  const { options, onChange, value } = props

  const onCheckboxChange = (e: any, label: string) => {
    const { checked } = e.target
    const newValue = [...value]
    console.log("e.target", e.target)


    if(checked){
      newValue.push(label)
    } else {
      const i = newValue.findIndex((a: string) => a === label)
      newValue.splice(i, 1)
    }

    if(onChange) {
      onChange({target: {value: newValue}})
    }
  }

  return (
    <Box direction="row" gap="small" pad="small">
      {options.map( (option) => {
        const checked = value.includes(option)
        return (
          <CheckBox
            key={option+''}
            label={option}
            onChange={(e) => onCheckboxChange(e, option)}
            checked={checked}
            />
        )

      })}
    </Box>
  )
}
