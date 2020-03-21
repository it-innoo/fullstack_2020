import React from 'react'

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>

      <p>capital {country.capital}<br />
        population {country.population}</p>

      <h3>languages</h3>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img
        src={country.flag}
        alt="Lippu"
        width="128"
        height="128"
      />
    </div>
  )
}

export default Country
