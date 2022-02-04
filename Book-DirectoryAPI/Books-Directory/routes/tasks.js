const express = require('express')
const router = express.Router()
const {
    getAllBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
} = require('../controller/tasks')

router.route('/').get(getAllBooks).post(createBook)
router.route('/:id').get(getBook).patch(updateBook).delete(deleteBook)

module.exports = router