const getOpenWeatherIconCode = (openMeteoCode) => {
  switch(openMeteoCode) {
    case 0: return '01d'
    case 1: return '02d'
    case 2: return '03d'
    case 3: return '04d'
    case 45:
    case 48: return '50d'
    case 51:
    case 53:
    case 55: return '09d'
    case 61:
    case 63:
    case 65: return '10d'
    case 66:
    case 67:
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86: return '13d'
    case 80:
    case 81:
    case 82: return '09d'
    case 95:
    case 96:
    case 99: return '11d'
    default: return '01d'
  }
}

const ShowWeather = ({ capital, weather }) => {
  const iconCode = getOpenWeatherIconCode(weather.weathercode)
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`
  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>Temperature: {weather.temperature} °C</p>
      <img src={iconUrl} alt="weather icon" />
      <p>Wind: {weather.windspeed} m/s</p>
    </div>
  )
}

export default ShowWeather
