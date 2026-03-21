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

app.get('/info', (request, response, next) => {
  const currentDate = new Date()
  PhoneBook.countDocuments({})
    .then(count => {
      response.send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${currentDate}</p>
      `)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response,next) => {
  PhoneBook.findById(request.params.id)
    .then(person =>{
      if (!person) {
        return response.status(404).json({error:'person not found'})
      }
      response.json(person)
    }).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response,next) => {
  PhoneBook.findByIdAndDelete(request.params.id)
    .then(result => {
      if (!result) {
        return response.status(404).json({ error: 'person not found' })
      }
      response.status(204).end()
    })
    .catch(error => next(error))
})


app.post('/api/persons', (request, response,next) => {
  const body = request.body 

  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'name or number missing' })
  }
  const phonebook = new PhoneBook({
    name:body.name,
    number:body.number,
  })
  phonebook.save().then( person => {response.json(person)} )
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  PhoneBook.findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).json({ error: "person not found" });
      }
      person.number = request.body.number;
      return person.save().then(updated =>
        response.json(updated)
      );
    })
    .catch(error => next(error));
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})


const errorHandler = (error,request,response,next) =>{
  console.error(error.message)
  if  (error.name == "CastError" ) {
    return response.status(404).send({error:'malformated id'})
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001  
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
