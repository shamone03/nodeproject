const express = require('express')
const route = express.Router()
const renderer = require('../services/render')
const controller = require('../controller/controller')

route.get('/', renderer.rootRoute)
route.get('/add-user', renderer.addUser)
route.get('/edit-user', renderer.editUser)
route.get('/login', renderer.login)


// api endpoints

route.post('/api/users', controller.create)
route.get('/api/users', controller.find)
route.put('/api/users/:id', controller.update)
route.delete('/api/users/:id', controller.delete)
module.exports = route