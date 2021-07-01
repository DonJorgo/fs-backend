require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

const app = express()

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

morgan.token('body', (req, res) =>
    req.method === 'POST'
        ? JSON.stringify(req.body)
        : ""
)

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
]

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

app.get('/info', (request, response) => {
    Person.count().then(count => {
        response.send(`
            <div>Phonebook has info for ${count} people</div>
            <div>${new Date()}</div>
        `)
    })
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })

})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    }).catch(e => 
        response.status(404).end()
    )
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    const MAX_ID = 5000000

    const validation = validate(request.body)

    if (validation.errors) {
        return response.status(404).json({
            errors: validation.errors
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

const validate = person => {
    const nameExists = name =>
        persons.some(person => person.name === name)

    let errors = []
    if (!person.name) {
        errors.push("missing name")
    } else if (nameExists(person.name)) {
        errors.push("name must be unique")
    }
    if (!person.number) {
        errors.push("missing number")
    }

    return errors.length > 0
        ? { errors: errors }
        : {}
}

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})
