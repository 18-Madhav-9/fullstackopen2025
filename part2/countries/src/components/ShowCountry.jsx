import { useState, useEffect } from 'react'
import axios from 'axios'
import ShowWeather from './ShowWeather'

const ShowCountry = ({ object }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (object.capitalInfo && object.capitalInfo.latlng) {
      const [lat, lng] = object.capitalInfo.latlng
      axios
        .get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`)
        .then(response => setWeather(response.data.current_weather))
        .catch(() => setWeather(null));
    }
  }, [object])

  return (
    <div>
      <h1>{object.name.common}</h1>
      <p>Capital: {object.capital}</p>
      <p>Area: {object.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(object.languages).map(lan => (
          <li key={lan}>{lan}</li>
        ))}
      </ul>
      <img src={object.flags.png} alt={`Flag of ${object.name.common}`} />
      {weather && <ShowWeather capital={object.capital} weather={weather} />}
    </div>
  )
}

export default ShowCountry;