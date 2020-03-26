import axios from 'axios'
//const baseUrl = 'http://localhost:3001/api/persons'
const baseUrl = 'https://evening-caverns-13941.herokuapp.com/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const get = id => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const deleteName = id => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const update = (person) => {
  const request = axios.put(`${baseUrl}/${person.id}`, person)
  return request.then(response => response.data)
}

export default { get, getAll, create, deleteName, update }