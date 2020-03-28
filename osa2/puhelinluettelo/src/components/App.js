import React, { useState, useEffect } from 'react'

import PersonService from '../services/persons'
import Filter from './Filter'
import Notification from './Notification'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [message, setMessage] = useState({ message: null })
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

    PersonService
      .create({
        name: newName,
        number: newNumber
      })
      .then(person => {
        setPersons([...persons, person])
        setNewName('')
        setNewNumber('')
        setMessage(
          { message: `Added ${person.name}`, type: 'info' }
        )
        setTimeout(() => setMessage({ message: null }), 5000)
      })
      .catch(error => {
        setNewName('')
        setNewNumber('')
        setMessage(
          {
            message: error.response.data.error,
            type: 'error'
          }
        )
        setTimeout(() => setMessage({ message: null }), 5000)

      })

    /*
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
              setMessage(
                { message: `Added ${newPerson.name}`, type: 'info' }
              )
              setTimeout(() => setMessage({ message: null }), 5000)
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
                setMessage(
                  {
                    message: `Changed ${newPerson.name}`,
                    type: 'info'
                  }
                )
                setTimeout(() => setMessage({ message: null }), 5000)
              }).catch(() => {
                setNewName('')
                setNewNumber('')
                setPersons(persons.filter(p => p.id !== changedPerson.id))
                setMessage(
                  {
                    message: `Infomation of ${changedPerson.name} has already been removed from server`,
                    type: 'error'
                  }
                )
                setTimeout(() => setMessage({ message: null }), 5000)
    
              })
          }
        }
        */
  }

  const deleteName = (id) => (event) => {
    PersonService
      .get(id)
      .then(p => {
        if (window.confirm(`Delete ${p.name} ?`)) {
          PersonService.deleteName(id)
          setPersons(persons.filter(p => p.id !== id))
          setMessage(
            {
              message: `Deleted ${p.name}`
              , type: 'info'
            }
          )
          setTimeout(() => setMessage({ message: null }), 5000)
          setPersons(persons.filter(p => p.id !== id))
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
      <h1>Phonebook</h1>
      <Notification message={message} />

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
