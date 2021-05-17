import React, { useState } from 'react'

const Numbers = ({ numbers }) => {
  return(
  <div>
    {console.log(numbers)}
    {numbers.map(number => <p key={number.name}>{number.name}</p>)}
  </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('TEST')

  const addNumber = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target.value)
    const newPerson = {
      name: newName
    }
    setPersons(persons.concat(newPerson))
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
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