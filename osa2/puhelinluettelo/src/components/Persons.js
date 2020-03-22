import React from 'react'
import Person from './Person'

const Persons = ({ persons, filter, onClick }) => {

  return (
    persons
      .filter(p =>
        p.name
          .toLowerCase()
          .includes(
            filter.toLowerCase())
      )
      .map(p =>
        <Person
          key={p.id}
          person={p}
          onClick={onClick}
        />
      )
  )
}

export default Persons