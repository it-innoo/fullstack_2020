import React from 'react'
import Person from './Person'

const Persons = ({ persons }) => {
  return (
    persons.map(p =>
      <Person person={p} />
    )
  )
}

export default Persons