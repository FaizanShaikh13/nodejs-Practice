const express = require('express')
const routes = require('./routes/tasks')
const connectDB = require('./db/connection')
require("dotenv").config()

const app = express()

app.use(express.json())
app.use('/api/books/v1',routes)


const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(4000,()=>{
            console.log('server running...')
        })
    } catch (error) {
        
    }
}

start()


