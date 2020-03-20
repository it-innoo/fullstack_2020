import React from 'react'

const PersonForm = (
  {
    onNameChange,
    onNumberChange,
    onSubmit,
    newName,
    newNumber,

  }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name:
        <input
          value={newName}
          onChange={onNameChange}
        />
      </div>
      <div>
        Numero:
          <input
          onChange={onNumberChange}
          value={newNumber}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form >
  )
}

export default PersonForm
