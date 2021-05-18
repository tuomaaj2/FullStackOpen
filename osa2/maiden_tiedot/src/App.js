import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Filter = ({filter, setNewFilter}) => {  
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  
  return(
  <div>
    find countries <input value={filter} onChange={handleFilterChange} /> 
  </div>
  )
}

const Countries = ({ countries, filter }) => {
  console.log("Countries", countries)
  console.log("Countries", countries.length)
  const country_list = countries.filter(country => country.name.toLocaleUpperCase('fi').includes(filter.toLocaleUpperCase('fi')))
  console.log("Length", country_list)
  console.log("Length", country_list.length)
  if(country_list.length > 10){
    return <p>Too many matches, specify another filter</p>
  }
  else if(country_list.length > 1){
    return(
      <div>
        {country_list.map(country =>
          <p key={country.name}>{country.name}</p>
        )}
    </div> 
    )
  }
  return(
    <div>
      {country_list.map(country => 
        <Country country={country} key={country.name}/>
      )}
    </div>
  )
}

const Country = ({ country }) => {
  return(
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <ul>
        {country.languages.map(lang =>
          <li key={lang.name}>
            {lang.name}
          </li>
        )}
      </ul>
      <img src={country.flag} alt={country.name} style={{width: "200px", height:"200px"}}></img>
    </div>
  )
}


const App = () => {
  const [ countries, setCountries] = useState([])
  const [ filter, setNewFilter] = useState('Swi')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log(response.data)
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'persons')


  return (
    <div>
      <Filter filter={filter} setNewFilter={setNewFilter} />
      <Countries countries={countries} filter={filter} />
    </div>
  )

}

export default App