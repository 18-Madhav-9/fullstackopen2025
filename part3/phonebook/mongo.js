const mongoose = require("mongoose")

const password = process.argv[2] 
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://mash:${password}@cluster0.ebkfsvc.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false) 
mongoose.connect(url, { family: 4 })

const PhoneBookSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const PhoneBook = mongoose.model('PhoneBook', PhoneBookSchema) 

if (process.argv.length < 3) {
    console.log("Enter Password")
    process.exit(1)
} 
else if (process.argv.length === 3) {
    PhoneBook.find({}).then(result => {
        result.forEach(element => {
            console.log(element)
        })
        mongoose.connection.close()
    })
} 
else {
    const phonebook = new PhoneBook({
        name: name,
        number: number,
    })

    phonebook.save().then(result => {
        console.log("Contact Saved")
        mongoose.connection.close()
    })
}