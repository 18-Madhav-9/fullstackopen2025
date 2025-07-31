import { useState } from 'react'

const ShowName = ({person}) =>{
  return (
    <div>
      {person.name}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const nameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const addperson = (event) => {
    event.preventDefault()
    const found = persons.some( person => person.name.toLowerCase() === newName.toLowerCase() );
    found ? alert(`${newName} is already added to phonebook`) : setPersons(persons.concat({name:newName}) )
    setNewName('')
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addperson} >
        <div>
          name: <input value={newName} onChange={nameChange} />
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