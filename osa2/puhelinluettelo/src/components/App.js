import React, { useState, useEffect } from 'react'

import PersonService from '../services/persons'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    PersonService
      .getAll()
      .then(initial => {
        setPersons(initial)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()

    let person = persons.find(p =>
      p.name === newName
    )

    if (person === undefined) {
      person = {
        name: newName,
        number: newNumber
      }

      PersonService
        .create(person)
        .then(newPerson => {
          setPersons([...persons, newPerson])
          setNewName('')
          setNewNumber('')
          console.log(`${newPerson.name} is added to phonebook`)
        })
    } else {
      if (window.confirm(
        `${newName} is already added to phonebook,
        replace the old number with a new one?
        `)) {
        const changedPerson = { ...person, number: newNumber }
        PersonService
          .update(changedPerson)
          .then(newPerson => {
            setPersons(persons.map(p => p.name === newName ? changedPerson : p))
            setNewName('')
            setNewNumber('')
            console.log(`${newPerson.name} is changed to phonebook`)
          })
      }

    }

  }

  const deleteName = (id) => (event) => {
    PersonService
      .get(id)
      .then(p => {
        if (window.confirm(`Delete ${p.name} ?`)) {
          PersonService.deleteName(id)
          setPersons(persons.filter(p => p.id !== id))
          console.log(`${id} was deleted`)
        }
      })

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) =>
    setNewNumber(event.target.value)

  const handleFilterChange = (event) =>
    setFilter(event.target.value)

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

      <Persons
        persons={persons}
        filter={filter}
        onClick={(id) => deleteName(id)}
      />
    </div>
  )
}

export default App;
