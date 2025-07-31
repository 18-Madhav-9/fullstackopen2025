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
    setPersons(persons.concat({name:newName}) )
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
      { persons.map( (object) => <ShowName key={object.name} person={object} /> ) }
    </div>
  )
}

export default App