import React, { useState } from 'react'

const Numbers = ({ numbers }) => {
  return(
  <div>
    {numbers.map(number => 
      <p key={number.name}>
        {number.name} {number.phone}
      </p>
    )}
  </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '044-1234567' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')

  const addNumber = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      phone: newPhone
    }
    nameExists() ? alert(`${newName} is already added to phonebook`) : setPersons(persons.concat(newPerson))
    setNewName('')
    setNewPhone('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const nameExists = () => {
    return(persons.some(e => e.name === newName ))
  }

  return (
    <div>
      <div>debug: {newName}</div>
      <h2>Phonebook</h2>
      <form onSubmit={addNumber}>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newPhone} onChange={handlePhoneChange} /></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <Numbers numbers={persons}/>
    </div>
  )

}

export default App