import axios from "axios"

const baseUrl = 'http://localhost:3001/persons'

const getPersons = () => {
    const request = axios.get(baseUrl)
    return request.then( response => response.data )
}

const createPerson = (personObject) => {
    const request = axios.post(baseUrl,personObject) 
    return request.then( response => response.data )
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request
}

const replacePersonNumber = (id,personObject) => {
    const request = axios.put( `${baseUrl}/${id}`,personObject) 
    return request.then( response => response.data )
}

export default {getPersons,createPerson,deletePerson,replacePersonNumber}
