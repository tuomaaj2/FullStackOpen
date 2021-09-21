import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
  }

const deleteNumb = (id) => {
    const url = `${baseUrl}/${id}`
    const request = axios.delete(url)
    return request.then(response => response.data)
}

const modify = (number) => {
    const url = `${baseUrl}/${number.id}`
    const request = axios.put(url, number)
    return request.then(response => response.data)
}

export default { getAll, create, deleteNumb, modify }