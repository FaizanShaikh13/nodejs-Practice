// const express = require('express')
// const bcrypt = require('bcrypt')

// const { sequelize, User } = require('./models')

// const app = express()

// const createUser = async (req, res) => {
//     const { name, email, password, role } = req.body
//     console.log();
//     console.log();
//     console.log(req.body);
//     console.log();
//     console.log();
//     try {
//         const hashedpassword = await bcrypt.hash(req.body.password,10)
//         const user = await User.create({ name, email, password: hashedpassword, role })
//         return res.status(201).json(user)
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json(error)

//     }
// }

// // const getUser = async (req,res)=>{
// //     const user = User.findall({
// //         where
// //     })
// // }


// module.exports = {
//     createUser
// }