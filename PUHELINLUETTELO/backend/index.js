require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
app.use(express.json())
app.use(express.static('dist'))
const Person = require('./models/person')

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
    console.log(persons)
  })
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

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
})


app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndDelete(req.params.id).then(person => {
      if (person) {
        res.status(204).end()
      } else {
        res.status(404).end()
      }
  })
})

app.post('/api/persons', (req, res) => {
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
})


app.put('/api/persons/:id', (req, res) => {
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
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
