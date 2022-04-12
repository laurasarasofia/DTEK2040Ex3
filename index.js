console.log('hello world')

const { response } = require('express')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

let notes = [
    {
        id: 1,
        content: 'HTML on helppoa',
        date: '2017-12-10T17:30:31.098Z',
        important: true
    },
    {
        id: 2,
        content: 'Selain pystyy suorittamaan vain javascriptiä',
        date: '2017-12-10T18:39:34.091Z',
        important: false
    },
    {
        id: 3,
        content: 'HTTP-protokollan tärkeimmät metodit ovat GET ja POST',
        date: '2017-12-10T19:20:14.298Z',
        important: true
    }
]

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Martti Tienari",
        "number": "040-123456",
        "id": 2
    },
    {
        "name": "Arto Järvinen",
        "number": "040-123456",
        "id": 3
    },
    {
        "name": "Lea Kutvonen",
        "number": "040-123456",
        "id": 4
    }
]


app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
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

app.use(bodyParser.json())

const generateId = () =>{
    const maxId =  Math.floor(Math.random()*9000000000)
    return maxId +1
}


app.post('/api/persons', (req, res) => {
    const body = req.body
    
    if(body.name === undefined){
        return response.status(400).json({error: 'nimi puuttuu'})
    }
    if(persons.find(person=> person.name=== body.name)){
        return response.status(400).json({error: 'name must be unique'})
    }
    if(body.number === undefined){
        return response.status(400).json({error: 'numero puuttuu'})
    }

    const person ={
        name: body.name,
        number: body.number,
        id: generateId(),
    }
  
    persons = persons.concat(person)
  
    res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})





app.get('/notes', (req, res) => {
    res.json(notes)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

const cors = require('cors')

app.use(cors())

