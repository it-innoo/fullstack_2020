import React from 'react'

const Filter = ({ handleChange, filter }) => {

  return (
    <div>
      Filter shown with
      <input onChange={handleChange} value={filter} />
    </div>
  )

}

export default Filter