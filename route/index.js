const express = require('express')
const Router = express.Router()
const {
    createUser,getUser,getUsers,deleteUser,updateUser,getByName
}= require('../controller/index')


Router.route('/').post(createUser).get(getUsers)
Router.route('/:uuid').get(getUser).delete(deleteUser).patch(updateUser)
Router.route('/search/:name?').get(getByName)
module.exports = Router