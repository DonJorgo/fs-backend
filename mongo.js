const mongoose = require('mongoose')

// eslint-disable-next-line no-undef
const proc = process

if (proc.argv.length < 3) {
  console.log('give password as argument')
  proc.exit()
}

const password = proc.argv[2]

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
  })
  mongoose.connection.close()
})


if (proc.argv.length > 3) {
  createPerson(proc.argv[3], proc.argv[4])
} else {
  listPersons()
}
