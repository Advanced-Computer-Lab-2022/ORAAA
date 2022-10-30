import React, { useState, useMemo } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'

function SelectCountryForm() {
  const [value, setValue] = useState('')
  const options = useMemo(() => countryList().getData(), [])

  

  const changeHandler = value => {
    setValue(value)
 }
 
  

  return ( 
    <>
    <dev>
    <h1></h1>
  <Select options={options} value={value} onChange={changeHandler} />
  </dev>
    </>
  )
  

}

export default SelectCountryForm