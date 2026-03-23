const mongoose = require('mongoose')

const url = process.env.URL
mongoose.set("strictQuery", false)
mongoose.connect(url, { family: 4 })

const PhoneBookSchema = new mongoose.Schema({
  name: {
    type:String,
    minLength:3,
    required:true,
  },
  number: {
    type : String,
    required:true,
    validate : {
      validator:function(v) {
        return /^\d{2,3}-\d{6,}$/.test(v)
      },
      message:props => `${props} is not a valid number` 
    },
  }
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