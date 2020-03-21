import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Weather from './Weather'

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const url = `https://api.apixu.com/v1/current.json?key=d68ee55761624662b8870114191305&q=${country.capital}`

    axios
      .get(url)
      .then(response => {
        setWeather(response.data.current)
      })
  }, [country.capital])
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
      <h3>Weather in {country.capital}</h3>
      <Weather weather={weather} />
    </div>
  )
}

export default Country
