require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')
const { response } = require('express')

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


app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            response.json(person)
        })
        .catch(error => next(error))
})


app.post('/api/persons', (request, response) => {
    const body = request.body

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
    person.save()
        .then(savedPerson => response.json(savedPerson))
        .catch(error => next(error))
})

const validate = person => {
    let errors = []
    if (!person.name) {
        errors.push("missing name")
    }
    if (!person.number) {
        errors.push("missing number")
    }
    return errors.length > 0 ? { errors: errors } : {}
}


app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
            if (updatedPerson) {
                response.json(updatedPerson)
            } else {
                response.status(404).end()
            }

        })
        .catch(error => next(error))
})


app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(result => res.status(204).end())
        .catch(error => next(error))
})


const errorHandler = (error, request, response, next) => {
    console.log(error)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(errorHandler)
