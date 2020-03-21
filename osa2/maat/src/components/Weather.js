import React from 'react'

const Weather = ({ weather }) => {
  if (weather === null) {
    return null
  }

  return (
    <div>
      <div>
        <strong>temperature:</strong> {weather.temp_c} &#8451;
      </div>
      <div>
        <img
          src={weather.condition.icon}
          alt={weather.condition.text} />
      </div>
      <div>
        <strong>wind:</strong> {weather.wind_kph} kph direction {weather.wind_dir}
      </div>
    </div>
  )
}

export default Weather
