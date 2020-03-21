import React from 'react'

const Filter = ({ onChange, filter }) => {

  return (
    <div>
      Find countries
      <input onChange={onChange} value={filter} />
    </div>
  )

}

export default Filter