const express = require('express')
const bcrypt = require('bcrypt')
const Router = require('./route/posts')
require('./utils/bcrypt')

const { sequelize, User } = require('./models')
const { password } = require('pg/lib/defaults')
const Bcrypt = require('./utils/bcrypt')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/posts', Router)

//create users

app.post('/users', async (req, res) => {
    const { name, email,  role } = req.body
    const password =  req.body.password
    try {
        //const salt = await bcrypt.genSalt()
       // const hashedpassword = await bcrypt.hash(req.body.password, salt)
       console.log(password);
        const hashedpassword = await Bcrypt.bcrypt_pass(password)
        console.log(hashedpassword);
       
        console.log(hashedpassword);
        const user = await User.create({ name, email, password: hashedpassword, role })
        return res.status(201).json(user)
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
})

//get users

app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll({})
        res.status(200).json(users)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

//get user

app.get('/users/:uuid', async (req, res) => {
    const uuid = req.params.uuid
    try {
        const users = await User.findOne({
            where:{uuid},
            include:'posts'
        })
        res.status(200).json(users)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

//login user

app.post('/users/login', async (req, res) => {
    const user = await User.findOne({
        where: {
            email: req.body.email,
        }
    })
    if (user == null) {
        return res.status(400).send('invalid')
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send('success')
        } else {
            res.send('not allowed')
        }
    } catch (error) {
        res.status(500).send()
    }
})

//delete user

app.delete('/users/:uuid', async (req, res) => {
    const uuid = req.params.uuid
    try {
        const user = await User.findOne({where:{uuid}})
        const name = user.name
        await user.destroy()
        res.status(200).json(`${name} deleted`)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

//update user

app.patch('/users/:uuid', async (req, res) => {
    const uuid = req.params.uuid
    const {name,email,role} = req.body
    const password = req.body.password
    console.log(password);
    try {
        const user = await User.findOne({where:{uuid} })
        const hashedpassword = await Bcrypt.bcrypt_pass(password)
        console.log(hashedpassword);
        user.name = name
        user.email = email
        user.password = hashedpassword
        user.role = role
        console.log(user.password);
        await user.save()
        res.status(200).json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

app.listen(5000, async () => {
    console.log('server up on http://localhost:5000');
    await sequelize.authenticate()
    console.log('db synced');
})

