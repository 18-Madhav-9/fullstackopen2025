const mongoose = require('mongoose')

const url = process.env.URL
mongoose.set("strictQuery", false)
mongoose.connect(url, { family: 4 })

const PhoneBookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

PhoneBookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const PhoneBook = mongoose.model('PhoneBook', PhoneBookSchema)

module.exports = PhoneBook