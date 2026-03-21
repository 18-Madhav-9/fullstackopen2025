require('dotenv').config()
const path = require('path')
const express = require('express')
const morgan = require('morgan')
const PhoneBook = require("./models/note")
const app = express()

app.use(express.static('dist'))
app.use(express.json())

morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

app.use(
  morgan(':method :url :status :res[content-length] :response-time ms :body')
)

app.get('/api/persons', (request, response) => {
  PhoneBook.find({}).then( person => {
    response.json(person)
  })
})

app.get('/info', (request, response) => {
  const currentDate = new Date()
  response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${currentDate}</p>
  `)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(p => p.id == id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  PhoneBook.findByIdAndDelete(request.params.id)
    .then(result => {
      if (!result) {
        return response.status(404).json({ error: 'person not found' })
      }

      response.status(204).end()
    })
    .catch(error => {
      if (error.name === 'CastError') {
        return response.status(400).json({ error: 'malformatted id' })
      }

      response.status(500).json({ error: 'internal server error' })
    })
})


app.post('/api/persons', (request, response) => {
  const body = request.body 

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name or number missing' 
    })
  }
  const phonebook = new PhoneBook({
    name:body.name,
    number:body.number,
  })
  phonebook.save().then( person => {response.json(person)} )

})

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})


const PORT = process.env.PORT || 3001  
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
