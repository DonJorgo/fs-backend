const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit()
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.yjlf0.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

const createPerson = (name, number) =>
    new Person({
        name: name,
        number: number
    }).save().then(response => {
        console.log(`added ${response.name} number ${response.number} to phonebook`)
        mongoose.connection.close()
    })


const listPersons = () => Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
        console.log(`${person.name} ${person.number}`)
    });
    mongoose.connection.close()
})


if (process.argv.length > 3) {
    createPerson(process.argv[3], process.argv[4])
} else {
    listPersons()
}
