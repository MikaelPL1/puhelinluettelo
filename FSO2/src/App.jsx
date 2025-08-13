import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1231-1244' },
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


  const addPerson = (event) => {
    event.preventDefault() // estää sivun uudelleenlatauksen
    const newPerson = { name: newName, number: newNumber }
    const nameExists = persons.some(person => person.name === newName)
    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons(persons.concat(newPerson)) // lisätään uusi henkilö taulukkoon
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: 
          <input 
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />
          <div>
            number: 
            <input 
              value={newNumber}
              onChange={(event) => setNewNumber(event.target.value)}
            />
            </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {persons.map((person, index) => (
        <div key={index}>{person.name} {person.number} </div>
      ))}
    </div>
  )
}

export default App
