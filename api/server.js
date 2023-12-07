const express = require('express')
const User = require('./users/model')
const server = express()
server.use(express.json())

server.get('/api/users', (req, res) => {
  User.find()
    .then(users =>{
      res.json(users)
    })
    .catch(err => {
      res.status(500).json({
        message: "The users information could not be retrieved",
        err: err.message,
        stack: err.stack,
      })
    })
})

server.post('/api/register', (req, res) => {
  if (!req.body.name || !req.body.password) {
    res.status(400).json({
      message: "Please provide name and password for the user",
    })
  } 
  else {
    User.insert(req.body)
      .then(user =>{
        res.status(201).json(user)
      })
      .catch(err => {
        res.status(500).json({
          message: "There was an error while saving the user to the database",
          err: err.message,
          stack: err.stack,
        })
      })
  }
})

server.post('/api/login', (req, res) => {
  if (!req.body.name || !req.body.password) {
    res.status(400).json({
      message: "Please provide name and password for the user",
    })
  } 
  else {
    User.insert(req.body)
      .then(user =>{
        res.status(201).json(`Welcome ${user.name}!`)
      })
      .catch(err => {
        res.status(500).json({
          message: "There was an error while saving the user to the database",
          err: err.message,
          stack: err.stack,
        })
      })
  }
})

server.use('*', (req, res) => {
  res.status(404).json({
    message: 'request not found',
  })
})

module.exports = server