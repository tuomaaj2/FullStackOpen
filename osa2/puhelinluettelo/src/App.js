import React, { useState } from 'react'

const Numbers = ({ numbers }) => {
  return(
  <>
    {numbers.map(number => 
      <p key={number.name}>
        {number.name} {number.phone}
      </p>
    )}
  </>
  )
}

const Filter = ({filter, setNewFilter}) => {
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  
  return(
  <div>
    filter shown with <input value={filter} onChange={handleFilterChange} /> 
  </div>
  )
}

const PersonForm = ({ persons, setPersons, newName, setNewName, newPhone, setNewPhone}) => {
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

  return(
    <form onSubmit={addNumber}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newPhone} onChange={handlePhoneChange} />
      </div>
      <div>
        <button type="submit">
          add
        </button>
      </div>
    </form>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456' },
    { name: 'Ada Lovelace', phone: '39-44-5323523' },
    { name: 'Dan Abramov', phone: '12-43-234345' },
    { name: 'Mary Poppendieck', phone: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ filter, setNewFilter] = useState('')

  const numbers = (filter === '') ? persons : persons.filter(person => person.name.includes(filter))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setNewFilter={setNewFilter} />
      <h3>add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newPhone={newPhone} setNewPhone={setNewPhone} />
      <h3>Numbers</h3>
      <Numbers numbers={numbers}/>
    </div>
  )

}

export default App