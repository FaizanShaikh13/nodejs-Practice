const express =  require('express')
const Book = require('../models/model')
const  app = express()

const getAllBooks = async (req,res)=>{
    try {
        const allbooks = await Book.find({})
        res.status(201).json({allbooks})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const getBook = async (req,res)=>{
   
    try {
        const {id : bookID } = req.params
        const book = await Book.findOne({_id:bookID})
        if(!book){
            return res.status(404).json({msg:`No Books With ID ${book}`})
        }
        res.json({book}).status(201)
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const createBook = async (req,res)=>{
    try {
        const book = await Book.create(req.body)
        res.status(201).json({book})
    } catch (error) {
        res.status(500).json({msg:error})
    }

}

const updateBook = async (req,res)=>{
    try {
        const {id: bookID} =  req.params
        const book =  await Book.findOneAndUpdate({_id:bookID},req.body,{
            new:true,runValidators:true
        })
        if(!book){
            return res.status(404).json({msg:`No Books With ID ${book}`})
        }
        res.status(201).json({book})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const deleteBook = async (req,res)=>{
    try {
        const {id: bookID} =  req.params
        const book =  await Book.findOneAndDelete({_id:bookID})
        if(!book){
            return res.status(404).json({msg:`No Books With ID ${book}`})
        }
        res.status(201).json({book})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}


module.exports = {
    getAllBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
}