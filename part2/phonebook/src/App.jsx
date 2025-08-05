import { useEffect, useState } from 'react'
import axios from 'axios'

const ShowDetail = ({person}) =>{
  return (
    <div>
      {person.name} {person.number}
    </div>
  )
}

const Filter = ({filter , filterChange}) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={filterChange} />
    </div>
  )
}

const Persons = ({personToShow}) => {
  return (
    <div>
      { personToShow.map(person => <ShowDetail key={person.id} person={person} />)}
    </div>
  )
}

const PersonForm = ({addperson,newName,nameChange,newNumber,numberChange}) => {
  return (
    <div>
      <form onSubmit={addperson} >
        <div>
          name: <input value={newName} onChange={nameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={numberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>  
  )
}

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [filter ,setfilter] = useState('')


  const getPersons = () => {
    axios.get('http://localhost:3001/persons').then( (respone) => {
      const data = respone.data 
      setPersons(data)
    })
  }

  useEffect(getPersons,[])

  const addperson = (event) => {
    event.preventDefault()
    const storePerson = (personObject) => {
      axios.post('http://localhost:3001/persons',personObject)
      .then( (response) => {
        console.log("stored",response.data)
        setPersons(persons.concat(response.data))
      })
    }
     
    const newperson = { 
      name:newName , 
      number:newNumber ,
      id:(persons.length >0 ? Math.max(...persons.map( current => current.id ))+1:1 ).toString()
    }
    const found = persons.some( person => person.name.toLowerCase() === newName.toLowerCase() );
    found ? alert(`${newName} is already added to phonebook`) : storePerson(newperson)
    setNewName('')
    setNumber('')
  }

  const nameChange = (event) => {
    setNewName(event.target.value)
  }

  const numberChange = (event) => {
    setNumber(event.target.value)
  }

  const filterChange = (event) => {
    setfilter(event.target.value)
  }

  const personToShow = filter === ''? persons: persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} filterChange={filterChange} />
      <h3>add a new</h3>
      <PersonForm  addperson={addperson} newName={newName} nameChange={nameChange} newNumber={newNumber} numberChange={numberChange}  />
      <h3>Numbers</h3>
      <Persons personToShow={personToShow} />
    </div>
  )
}

export default App