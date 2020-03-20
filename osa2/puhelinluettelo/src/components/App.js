import React, { useState } from 'react';

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
      <div>
        Rajaa näytettäviä
      <input onChange={handleFilterChange} value={filter} />
      </div>
      <form onSubmit={addName}>
        <div>
          name:
          <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          Numero:
          <input
            onChange={handleNumberChange}
            value={newNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      {personsToShow.map((person) =>
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      )}
    </div>
  )
}

export default App;
