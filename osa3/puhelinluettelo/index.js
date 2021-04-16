const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(express.json())


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

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

app.get('/info', (req, res) => {
    res.send(
        `
        <div>Phonebook has info for ${persons.length} people</div>
        <div>${new Date()}</div>
        `
    )
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    const MAX_ID = 5000000

    const validation = validate(req.body)

    if (validation.errors) {
        return res.status(404).json({
            errors: validation.errors
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * MAX_ID)
    }

    persons = persons.concat(person)
    res.json(person)
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
