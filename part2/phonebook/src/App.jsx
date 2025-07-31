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
    { name: 'Arto Hellas' , number: '040-1234567'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')

  const nameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const addperson = (event) => {
    event.preventDefault()
    const newperson = { name:newName , number:newNumber }
    const found = persons.some( person => person.name.toLowerCase() === newName.toLowerCase() );
    found ? alert(`${newName} is already added to phonebook`) : setPersons(persons.concat(newperson) )
    setNewName('')
    setNumber('')
  }

  const numberChange = (event) => {
    setNumber(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
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
      { persons.map( (current) => <ShowName key={current.name} person={current} /> ) }
    </div>
  )
}

export default App