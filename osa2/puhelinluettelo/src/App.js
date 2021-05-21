import React, { useState, useEffect } from 'react'
import personService from './services/persons'


const Numbers = ({ numbers, setPersons }) => {
  const deleteNumberOf = (id, name) => {
    console.log('Deleting ' + id)
    if(window.confirm(`Delete ${name} ?`))
    {
      personService
        .deleteNumb(id)
          .then(() => {
            personService
              .getAll()
                .then(initialPersons => {
                  setPersons(initialPersons)
                })
          })
    }
  }

  return(
  <div>
    {numbers.map(numb => 
      <Number 
        key={numb.name} 
        number={numb}
        deleteNumber={() => deleteNumberOf(numb.id, numb.name)}
      />
    )}
  </div>
  )
}

const Number = ({ number, deleteNumber }) => {
  return(
  <>
    <p key={number.name}>
      {number.name} {number.number} <button onClick={deleteNumber}>delete</button>
    </p>
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
      number: newPhone
    }
    nameExists() 
      ? alert(`${newName} is already added to phonebook`) 
      : sendName(persons, setPersons, newPerson)
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

  const sendName = (persons, setPersons, newPerson) => {
    personService
      .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
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
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ filter, setNewFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
        })
  }, [])
  console.log('render', persons.length, 'persons')
 
  const numbers = (filter === '') ? persons : persons.filter(person => person.name.includes(filter))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setNewFilter={setNewFilter} />
      <h3>add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newPhone={newPhone} setNewPhone={setNewPhone} />
      <h3>Numbers</h3>
      <Numbers numbers={numbers} setPersons={setPersons} />
    </div>
  )

}

export default App