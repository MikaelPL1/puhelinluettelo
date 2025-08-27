require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
app.use(express.static('dist'))
app.use(express.json())
const Person = require('./models/person')

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res, next) => {
  Person.find({}).then(persons => {
    res.json(persons)
    console.log(persons)
  })
  .catch(error => next(error))
})


app.get('/info', (req, res) => {
  Person.countDocuments({})
    .then(count => {
      const date = new Date()
      res.send(
        `<p>Phonebook has info for ${count} people</p>
         <p>${date}</p>`
      )
    })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id).then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})


app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id).then(person => {
      if (person) {
        res.status(204).end()
      } else {
        res.status(404).end()
      }
  })
  .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'name or number missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
      res.json(savedPerson)
      console.log(savedPerson)
    })
    .catch(error => next(error))
})


app.put('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, number: req.body.number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      if (updatedPerson) {
        res.json(updatedPerson)
        console.log(updatedPerson)
      } else {
        res.status(404).end()
      }

    })
    .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

// olemattomien osoitteiden käsittely
app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

// tämä tulee kaikkien muiden middlewarejen ja routejen rekisteröinnin jälkeen!
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
