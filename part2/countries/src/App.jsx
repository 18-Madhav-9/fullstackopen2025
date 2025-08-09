import { useState ,useEffect } from 'react'
import axios from 'axios'
import CountryList from './components/CountryList'

const App = () => {
  const [data,setData] = useState(null)
  const [ countryName ,setCountryName ] = useState('') 

  const getCountry = () => {
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    .then( response =>  setData(response.data) )
    .catch( (error) => console.log("error") )
  }
  useEffect( () => {
    if (countryName) {
      getCountry()
    }
  },[countryName])

  const handleCountryName = (event) => {
    setCountryName(event.target.value)
  }

  const filtered = data ? data.filter( country => country.name.common.toLowerCase().includes(countryName.toLowerCase()) ) : []

  return (
    <div>
      <p> find countries <input value={countryName} onChange={handleCountryName} ></input> </p>
      <CountryList filter= {filtered} />
    </div>
  )
}

export default App