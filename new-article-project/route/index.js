const express = require('express')
const Router = express.Router()
const {
    createUser
}= require('../controller/index')


Router.route('/').post(createUser)

module.exports = Router