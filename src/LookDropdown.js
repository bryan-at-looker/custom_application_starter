import React, {useEffect} from 'react'
import { Dropdown } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css"


export function LookDropdown({...props}) {
  useEffect(() => {
    
  })

  const options = (props && props.looks) ? lookOptions(props.looks) : []

  const handleLook = (event, data) =>{
    props.setLook(data.value)
  }

  return (
    <>
    
    <Dropdown
      placeholder={'Select a Look'}
      selection
      options={options}
      onChange={handleLook}
    ></Dropdown>
    </>
  )
}

function lookOptions (looks) {
  return looks.map(lk=>{
    return {
      key: lk.id,
      description: lk.description,
      value: lk.id,
      text: lk.title
    }
  })
}