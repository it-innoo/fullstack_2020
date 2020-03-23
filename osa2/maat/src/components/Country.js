import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Weather from './Weather'

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const params = {
      access_key: process.env.REACT_APP_API_KEY,
      //access_key: 'fa7e2b21efb65a8ec6bc513d92c51f9f',
      query: `${country.capital}`
    }

    axios
      .get('http://api.weatherstack.com/current', { params })
      .then(response => {
        const apiResponse = response.data
        //console.log(apiResponse)
        setWeather(apiResponse)
      }).catch(error => {
        console.log(error)
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
