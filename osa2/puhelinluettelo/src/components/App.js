import React, { useState } from 'react';
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '010-1231244' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addName = (event) => {
    event.preventDefault()

    if (persons.find(
      ({ name }) => name === newName) === undefined) {
      const person = {
        name: newName,
        number: newNumber
      }

      console.log(person)
      setPersons([...persons, person])
      setNewName('')
      setNewNumber('')
      console.log(`${newName} is added to phonebook`)
    } else {
      window.alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    }

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) =>
    setNewNumber(event.target.value)

  const handleFilterChange = (event) =>
    setFilter(event.target.value)

  const personsToShow = persons
    .filter(p =>
      p.name
        .toLowerCase()
        .includes(
          filter.toLowerCase())
    )

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
        handleChange={handleFilterChange}
        value={filter}
      />

      <h3>Add a new</h3>

      <PersonForm
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        onSubmit={addName}
        newName={newName}
        newNumber={newNumber}
      />

      <h3>Numbers</h3>

      <Persons persons={personsToShow} />
    </div>
  )
}

export default App;
