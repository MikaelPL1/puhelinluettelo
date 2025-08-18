import { useState, useEffect } from 'react';
import personsService from './services/persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null);
  const [type, setType] = useState('success');

  useEffect(() => {
    personsService.getAll().then(initialPersons => {
      setPersons(initialPersons.map(p => ({ ...p, id: String(p.id) })));
    });
  }, []);

  const personsFiltteri =
    filter.trim() === ''
      ? persons
      : persons.filter(p =>
          p.name.toLowerCase().includes(filter.toLowerCase())
        );

  const nextId = persons.length > 0
    ? String(Math.max(...persons.map(p => Number(p.id) || 0)) + 1)
    : '1';

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.some(p => p.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const newPerson = { id: nextId, name: newName, number: newNumber };
    personsService.create(newPerson)
    .then(returned => {
    setPersons(persons.concat({ ...returned, id: String(returned.id) }));
    setNewName('');
    setNewNumber('');
    setType('success');
    setMessage(`Added ${returned.name}`);
    setTimeout(() => setMessage(null), 5000);
  })
  };

  // DELETE PERSONS
  const deletePerson = (id, name) => {
    if (!window.confirm(`Delete ${name} ?`)) return;
    personsService
    .remove(id)
    .then(() => {
      setPersons(persons.filter(p => p.id !== id));
      setType('error');
      setMessage(`Removed ${name}`);
      setTimeout(() => setMessage(null), 5000);
    })
      .catch(() => {
        setPersons(persons.filter(p => p.id !== id));
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} type={type} />

      <Filter value={filter} onChange={(e) => setFilter(e.target.value)} />

      <h2>Add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        onNameChange={(e) => setNewName(e.target.value)}
        newNumber={newNumber}
        onNumberChange={(e) => setNewNumber(e.target.value)}
      />

      <h2>Numbers</h2>
      <Persons persons={personsFiltteri} onDelete={deletePerson} />
    </div>
  );
};

export default App;
