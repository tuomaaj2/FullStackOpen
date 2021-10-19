import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'


const Numbers = ({ numbers, persons, setPersons, setNotification }) => {
  const deleteNumberOf = (id, name) => {
    console.log('Deleting ' + id)
    if(window.confirm(`Delete ${name} ?`))
    {
      personService
        .deleteNumb(id)
          .then(response => {
            setPersons(persons.filter(p => p.id !== id))
            notifyWith(setNotification, `Deleted ${name} successfully`)
          })
          .catch(error => {
            setPersons(persons.filter(p => p.id !== id))
            notifyWith(
              setNotification, `${name} was already removed from server`, 'error'
            )
          })
      
      personService
        .getAll()
          .then(initialPersons => {
            setPersons(initialPersons)
          })
    }
  }

  return(
  <div>
    {numbers.map(numb => 
      <Number 
        key={numb.id} 
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

const PersonForm = ({ persons, setPersons, newName, setNewName, newPhone, setNewPhone, setNotification}) => {
  const addNumber = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newPhone
    }
    nameExists() 
      ? updateName()
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
          notifyWith(setNotification, `Added ${newPerson.name} successfully`)
        })
        .catch(error => {
          notifyWith(setNotification, error.response.data.error, 'error')
        })
  }

  const updateName = () => {
    if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
    {
      const newPerson = persons.find(n => n.name === newName)
      const changedNumb = { ...newPerson, number: newPhone }
      const id = newPerson.id
      personService
        .modify(changedNumb)
          .then(response => {
            setPersons(
              persons.map(person => 
                person.id !== id ? person : response))
                notifyWith(setNotification, `Updated ${changedNumb.name} successfully`)
          })
    }
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


const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }
  
  return (
    <div className={notification.type}>
      {notification.message}
    </div>
  )
}

const notifyWith = (setNotification, message, type='success') => {
  setNotification({ message, type })
  setTimeout(() => {
    setNotification(null)
  }, 5000)
}

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ filter, setNewFilter] = useState('')
  const [notification, setNotification] = useState(null)

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
      <Notification notification={notification} />
      <Filter filter={filter} setNewFilter={setNewFilter} />
      <h3>add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newPhone={newPhone} setNewPhone={setNewPhone} setNotification={setNotification} />
      <h3>Numbers</h3>
      <Numbers numbers={numbers} persons={persons} setPersons={setPersons} setNotification={setNotification} />
    </div>
  )

}

export default App