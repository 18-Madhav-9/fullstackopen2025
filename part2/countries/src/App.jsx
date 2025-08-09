import { useState ,useEffect } from 'react'
import axios from 'axios'

const Show = ({object}) => {
  return (
    <div>
      <h1>{object.name.common}</h1>
      <p>{object.capital}</p>
      <p>{object.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(object.languages).map( lan => <li key={lan}>{lan}</li> ) }
      </ul>
      <img src={object.flags.png} alt={`Flag of ${object.name.common}`} width="150" />
    </div>
  )
} 

const List = ({filter}) => {
  const [ show ,setShow ] = useState({})

  const handleShow = (country) => {
    setShow({...show,[country.cca3] : !show[country.cca3]})
  }
  
  if ( filter.length === 0 ) return null
  else if ( filter.length > 10 ) {
    return (
      <div>Too many matches,specify other filter</div>
    )
  }
  else if ( filter.length === 1 ) {
    return <Show object={filter[0]} />
  }
  else if ( filter.length < 10 ) { 
    return (
      <div>
        {filter.map( object => (
          <div key = {object.cca3} >
            <p>
              {object.name.common}
              <button onClick={() => {handleShow(object) } } >
                {show[object.cca3] ? 'Hide':'Show' } 
              </button>
            </p>
            {show[object.cca3] && <Show object={object} />}
          </div> 
        ))}
      </div>
    )
  }
}

const App = () => {
  const [data,setData] = useState(null)
  const [ countryName ,setCountryName ] = useState('') 

  const getCountry = () => {
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    .then( response =>  setData(response.data) )
    .catch( error => console.log("not") )
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
      <List filter= {filtered} />
    </div>
  )
}

export default App