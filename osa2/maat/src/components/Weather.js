import React from 'react'

const Weather = ({ weather }) => {
  if (weather === null) {
    return null
  }

  return (
    <div>
      <div>
        <strong>temperature:&nbsp;</strong> {weather.current.temperature} &#8451;
      </div>
      <div>
        <img
          src={weather.current.weather_icons}
          alt={weather.current.weather_desciptions}
        />
      </div>
      <div>
        <strong>wind:&nbsp;</strong> {weather.current.wind_speed} km/h
        direction {weather.current.wind_dir}
      </div>
    </div>
  )
}

export default Weather
