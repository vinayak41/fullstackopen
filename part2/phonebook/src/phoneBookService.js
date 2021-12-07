import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getPersons = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const addPerson = (person) => {
  return axios.post(baseUrl, person).then((response) => response.statusText);
};

const deletePerson = (id) => {
  return axios
    .delete(`${baseUrl}/${id}`)
    .then((response) => response.statusText);
};

export default { getPersons, addPerson, deletePerson };
