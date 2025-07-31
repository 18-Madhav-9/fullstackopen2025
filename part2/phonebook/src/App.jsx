import { useState } from 'react'

const ShowName = ({person}) =>{
  return (
    <div>
      {person.name} {person.number}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])


  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [filter ,setfilter] = useState('')
 
  const nameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const addperson = (event) => {
    event.preventDefault()
    const newperson = { 
      name:newName , 
      number:newNumber ,
      id:persons.length >0 ? Math.max(...persons.map( current => current.id ))+1:1
    }
    const found = persons.some( person => person.name.toLowerCase() === newName.toLowerCase() );
    found ? alert(`${newName} is already added to phonebook`) : setPersons(persons.concat(newperson) )
    setNewName('')
    setNumber('')
  }

  const numberChange = (event) => {
    setNumber(event.target.value)
  }

  const filterName = (event) => {
    setfilter(event.target.value)
  }

  const personToShow = filter === ''? persons: persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={filter} onChange={filterName} />
      </div>
      <h2>add a new</h2>
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
      <h2>Numbers</h2>
      { personToShow.map(person => <ShowName key={person.id} person={person} />)}
    </div>
  )
}

export default App