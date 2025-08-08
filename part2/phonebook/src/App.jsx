import { useEffect, useState } from 'react'
import phoneServices from './services/phoneServices'
import Notification from './components/Notification'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [filter ,setfilter] = useState('')
  const [message,setMessage] = useState(null)
  const [error , setError] = useState(false) 

  const fetchPersons = () => {
    phoneServices.getPersons()
    .then( response => setPersons(response))
  }
  useEffect(fetchPersons,[])

  const storePerson = (personObject) => {
      phoneServices.createPerson(personObject)
        .then( (response) => {
        setPersons(persons.concat(response))
        setError(false)
        setMessage(`${personObject.name} is Successfully added to server`)
        setTimeout(() => {setMessage(null)}, 5000);
      }) 
  }

  const replaceNumber = (newperson) => {
    if ( window.confirm(`${newperson.name} is already added to phonebook,replace the old number with newone`)) {
      phoneServices.replacePersonNumber(newperson.id,newperson)
        .then( (response) => {
          setPersons( persons.map( p => p.id !== response.id ? p : response ))
          setError(false)
          setMessage(`Replaced ${response.name} Number`)
          setTimeout(() => {setMessage(null)}, 5000);
        })
        .catch( (error) => {
          setError(true)
          setMessage(`Information of ${newperson.name} has already been deleted from the server`)
          setTimeout( () => {setMessage(null)} ,5000)
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
          setError(false)
          setMessage(`Deleted ${person.name}`)
          setTimeout(() => {setMessage(null)}, 5000);
        })
        .catch( error => {
          setError(true)
          setMessage(`Information of ${person.name} has already been deleted from the server`)
          setTimeout( () => {setMessage(null)} ,5000)
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
  }

  const personToShow = filter === ''? persons: persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={error} />
      <Filter filter={filter} filterChange={filterChange} />
      <h3>add a new</h3>
      <PersonForm  addperson={addperson} newName={newName} nameChange={nameChange} newNumber={newNumber} numberChange={numberChange}  />
      <h3>Numbers</h3>
      <Persons personToShow={personToShow} deletehandler={handleDeletePerson} />
    </div>
  )
}

export default App