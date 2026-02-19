import axios from "axios"

const baseUrl = 'https://phonebook-backend-4q7t.onrender.com/api/persons/'

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
