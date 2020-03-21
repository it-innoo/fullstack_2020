import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './Countries'
import Filter from './Filter'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const endpoint = 'https://restcountries.eu/rest/v2/all'

  useEffect(() => {
    console.log('effect')
    axios
      .get(endpoint)
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) =>
    setFilter(event.target.value)

  return (
    <div>
      <Filter
        onChange={handleFilterChange}
        value={filter}
      />

      <Countries
        countries={countries}
        filter={filter}
        onClick={f => setFilter(f)}
      />
    </div>
  )
}

export default App
