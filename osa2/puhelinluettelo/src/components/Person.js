import React from 'react'

const Person = ({ person, onClick }) => {
  return (
    <p>
      {person.name} {person.number}
      <button onClick={onClick(person.id)}>delete</button>
    </p>
  )
}

export default Person
