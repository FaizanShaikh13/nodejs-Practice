
const { User, Post } = require('../models')
const express = require('express')
const { append } = require('express/lib/response')

const getAllPost = async (req, res) => {
    try {
        const posts = await Post.findAll({
        include: {
            model:User,
            as:'user',
            attributes:['uuid','name','email','role']
        },
        })
        return res.status(200).json({data :posts})
    } catch (error) {
        return res.status(500).json(error)
    }

}

const createPost = async (req, res) => {
    const { title, body, userUuid } = req.body

    try {
        const user = await User.findOne({ where: { uuid: userUuid } })
        const post = await Post.create({ userId: user.id, title, body })
        return res.status(200).json(post)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

const getPost = async (req, res) => {
    const  uuid  = req.params.uuid
    
    try {
        const post = await Post.findOne({ where:{ uuid },
            include: {
                model:User,
                as:'user',
                attributes:['uuid','name','email','role']
            } 
         })
        //if condition for finding the post of a user
         res.status(200).json(post)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

const deletePost = async (req,res)=>{
    const uuid  = req.params.uuid
    
    try {
        const post = await Post.findOne({ where:{ uuid } })
        post.destroy()
         res.status(200).json(post)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

const updatePost = async (req,res)=>{
    const uuid = req.params.uuid
    const {title, body } =  req.body
    try {
        const post = await Post.findOne({where:{uuid}})
        post.title = title
        post.body = body
        res.status(200).json(post)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

module.exports = {
    getAllPost,
    createPost,
    getPost,
    deletePost,
    updatePost
}