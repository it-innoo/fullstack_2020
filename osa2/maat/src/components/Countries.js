import React from 'react'
import Country from './Country'

const Countries = ({ countries, filter }) => {
  countries = countries
    .filter(c =>
      c.name
        .toLowerCase()
        .includes(filter.toLowerCase())
    )
  if (countries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if (countries.length > 1) {
    return (
      <div>
        {countries
          .map(country =>
            <p key={country.name}>
              {country.name}
            </p>
          )
        }
      </div>
    )

  } else if (countries.length === 1) {
    return (
      <Country
        country={countries[0]}
      />
    )
  } else {
    return <p>No matches!</p>
  }

}

export default Countries
