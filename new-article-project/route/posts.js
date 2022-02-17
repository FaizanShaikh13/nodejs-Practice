const express = require('express')
const Router = express.Router()
const {
    getAllPost,
    createPost,
    getPost,
    deletePost,
    updatePost
}= require('../controller/post')

Router.route('/').get(getAllPost).post(createPost)
Router.route('/:uuid').get(getPost).delete(deletePost).patch(updatePost)

module.exports = Router