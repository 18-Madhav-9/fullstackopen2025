import { useState } from 'react'
import ShowCountry from './ShowCountry'

const CountryList = ({ filter }) => {
  const [show, setShow] = useState({})

  const handleShow = (country) => {
    setShow(prevShow => ({
      ...prevShow,
      [country.cca3]: !prevShow[country.cca3],
    }))
  }

  if (filter.length === 0) return null;

  else if (filter.length > 10) return <div>Too many matches, specify other filter</div>

  else if (filter.length === 1) return <ShowCountry object={filter[0]} />

  else {
    return (
        <div>
        {filter.map((object) => (
            <div key={object.cca3}>
            <p>
                {object.name.common}{' '}
                <button onClick={() => handleShow(object)}>
                {show[object.cca3] ? 'Hide' : 'Show'}
                </button>
            </p>
            {show[object.cca3] && <ShowCountry object={object} />}
            </div>
        ))}
        </div>
        )
    }
}

export default CountryList
