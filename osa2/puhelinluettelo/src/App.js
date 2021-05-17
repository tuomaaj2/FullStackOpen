import React, { useState } from 'react'

const Numbers = ({ numbers }) => {
  return(
  <div>
    {numbers.map(number => <p key={number.name}>{number.name}</p>)}
  </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('Arto Hellas')

  const addNumber = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName
    }
    nameExists() ? alert(`${newName} is already added to phonebook`) : setPersons(persons.concat(newPerson))
    setNewName('')
  }

  const handleNoteChange = (event) => {
    setNewName(event.target.value)
  }

  const nameExists = () => {
    return(persons.some(e => e.name === newName ))
  }

  return (
    <div>
      <div>debug: {newName}</div>
      <h2>Phonebook</h2>
      <form onSubmit={addNumber}>
        <div>
          name: <input value={newName} onChange={handleNoteChange} />
        </div>
        <div>
          <button type="submit">
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers numbers={persons}/>
    </div>
  )

}

export default App