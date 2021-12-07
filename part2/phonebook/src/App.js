import { useEffect, useState } from "react";
import phonebook from "./phoneBookService";

const notificatonStyle = {
  border: "2px solid green",
  borderRadius: "3px",
  fontSize: 16,
  paddingLeft: "1rem",
  margin: "1rem",
};

const Persons = ({ persons, handlePersonDelete }) => {
  return (
    <>
      <h1>Numbers</h1>
      {persons?.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
          <button onClick={() => handlePersonDelete(person.id, person.name)}>
            delete
          </button>
        </p>
      ))}
    </>
  );
};

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterValue, setFitlerValue] = useState(null);
  const [notification, setNotificaton] = useState(null);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (persons.filter((person) => person.name === newName).length > 0) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const newPerson = {
      name: newName,
      number: newNumber,
      id: new Date().valueOf(),
    };
    setPersons((prevState) => [...prevState, newPerson]);
    phonebook.addPerson(newPerson).then(() => {
      setNotificaton(`${newName} added in phonebook`);
      setTimeout(() => {
        setNotificaton(null);
      }, 5000);
    });
    setNewName("");
    setNewNumber("");
  };

  const handleFilterChange = (e) => {
    e.preventDefault();
    setFitlerValue(e.target.value);
  };

  const getFilteredPersonsList = () => {
    return persons.filter(
      (person) =>
        person.name.slice(0, filterValue.length).toLowerCase() ===
        filterValue.toLowerCase()
    );
  };

  const handlePersonDelete = (id, name) => {
    const confirmDelete = window.confirm(`Delete ${name} ?`);
    if (confirmDelete) {
      phonebook.deletePerson(id).then(() => {
        phonebook.getPersons().then((data) => setPersons(data));
        setNotificaton(`${name} deleted from phonebook`);
        setTimeout(() => {
          setNotificaton(null);
        }, 5000);
      });
    }
  };

  useEffect(() => {
    phonebook.getPersons().then((data) => setPersons(data));
  }, []);

  return (
    <div className="App">
      <h1>Phonebook</h1>
      {notification ? (
        <div style={notificatonStyle}>
          <p>{notification}</p>
        </div>
      ) : null}
      <form>
        filter shown with <input onChange={handleFilterChange} />
      </form>
      <h1>add a new</h1>
      <form onSubmit={handleSubmit}>
        <div>
          name:
          <input type="text" onChange={handleNameChange} value={newName} />
        </div>
        <div>
          number:
          <input type="text" onChange={handleNumberChange} value={newNumber} />
        </div>
        <button type="submit">add</button>
      </form>
      <Persons
        handlePersonDelete={handlePersonDelete}
        persons={filterValue ? getFilteredPersonsList() : persons}
      />
    </div>
  );
}

export default App;
