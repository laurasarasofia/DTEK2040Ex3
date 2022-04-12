const mongoose = require('mongoose')

// Replace with the URL of your own database. Do not store the password on GitLab!
const url =  'mongodb+srv://dtek2040ex3.hhfxn.mongodb.net/myFirstDatabase'

mongoose.connect(url)

const Note = mongoose.model('Note', {
  content: String,
  date: Date,
  important: Boolean
})

const note = new Note({
  content: 'HTML on helppoa',
  date: new Date(),
  important: true
})

note
  .save()
  .then(response => {
    console.log('note saved!')
    mongoose.connection.close()
  })