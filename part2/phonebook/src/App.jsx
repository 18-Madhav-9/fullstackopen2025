import { useEffect, useState } from 'react'
import phoneServices from './services/phoneServices'

const Notification = ({message}) => {
  if ( message === null ) {
    return null 
  }
  else {
    return (
      <div className='message'>{message}</div>
    )
  }
}

const ShowDetail = ({person,deletePerson}) =>{
  return (
    <div>
      {person.name} {person.number} <button onClick={ () => deletePerson(person)} >delete</button>
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

const Persons = ({personToShow,deletehandler}) => {
  return (
    <div>
      { personToShow.map(person => <ShowDetail key={person.id} person={person} deletePerson={deletehandler} />)}
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
  const [message,setMessage] = useState(null)

  const fetchPersons = () => {
    phoneServices.getPersons()
    .then( response => setPersons(response))
  }
  useEffect(fetchPersons,[])

  const storePerson = (personObject) => {
      phoneServices.createPerson(personObject)
        .then( (response) => {
        setPersons(persons.concat(response))
      })
      setMessage(`${personObject.name} is Successfully added to server`)
      setTimeout(() => {setMessage(null)}, 5000);
  }

  const replaceNumber = (newperson) => {
    if ( window.confirm(`${newperson.name} is already added to phonebook,replace the old number with newone`)) {
      phoneServices.replacePersonNumber(newperson.id,newperson)
        .then( (response) => {
          setPersons( persons.map( p => p.id !== response.id ? p : response ))
          setMessage(`Replaced ${response.name} Number`)
          setTimeout(() => {setMessage(null)}, 5000);
        })
        .catch( (error) => {
          alert(`${newperson.name} is already deleted`)
          setPersons( persons.filter( p => p.id !== newperson.id ) )
        })
    }
  }

  const addperson = (event) => {
    event.preventDefault()
    const newperson = { 
      name:newName.trim() , 
      number:newNumber.trim()
    }
    const existing = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    
    existing ? replaceNumber({...newperson, id: existing.id }) : storePerson(newperson)

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

  const handleDeletePerson = (person)=> {
    if ( window.confirm(`Delete ${person.name}?`) ){
      phoneServices.deletePerson(person.id)
        .then( () => { 
          setPersons(persons.filter( p => p.id !== person.id ) ) 
          setMessage(`Deleted ${person.name}`)
          setTimeout(() => {setMessage(null)}, 5000);
        })
        .catch( error => {
          alert(`${person.name} was already removed from the server`)
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
  }

  const personToShow = filter === ''? persons: persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filter={filter} filterChange={filterChange} />
      <h3>add a new</h3>
      <PersonForm  addperson={addperson} newName={newName} nameChange={nameChange} newNumber={newNumber} numberChange={numberChange}  />
      <h3>Numbers</h3>
      <Persons personToShow={personToShow} deletehandler={handleDeletePerson} />
    </div>
  )
}

export default App