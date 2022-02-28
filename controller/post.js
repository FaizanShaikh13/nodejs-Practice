const { User, Post, keywords, KeywordPost, fileurl,sequelize } = require("../models");
const { Op } = require("sequelize");
const express = require("express");




const getAllPost = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        as: "user",
        attributes: ["uuid", "name", "email", "role"],
      },
    });
    return res.status(200).json({ data: posts });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const createPost = async (req, res) => {
  const { title, body, userUuid } = req.body;
  const keyword = req.body.keyword;


  let keysArr = [];

  try {
    const user = await User.findOne({ where: { uuid: userUuid } });
    const post = await Post.create({ userId: user.id, title, body, keyword });
    console.log(user.id);
    for (element of keyword) {
      var getKeyword = await keywords.findOne({ where: { values: element } });
      console.log(element);
      if (!getKeyword) {
        let createKeyword = await keywords.create({ values: element });

        keysArr.push({ keyId: createKeyword.id, post_id: post.id });
      } else {
        keysArr.push({ keyId: getKeyword.id, post_id: post.id });
      }
      console.log(keysArr);
    }
    const createKeyPost = await KeywordPost.bulkCreate(keysArr);
    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getPost = async (req, res) => {
  const uuid = req.params.uuid;

  try {
    const post = await Post.findOne({
      where: {
        uuid,
      },
      include: {
        model: User,
        as: "user",
        attributes: ["uuid", "name", "email", "role"],
      },
      include:{
        model : fileurl,
        as:"fileurls",
        attributes:["url"]
      }
    });
    //if condition for finding the post of a user
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const deletePost = async (req, res) => {
  const uuid = req.params.uuid;

  try {
    const post = await Post.findOne({ where: { uuid } });
    console.log(post.id);
    // const keypost = await KeywordPost.findAll({where : {post_id : post.id}})
    // console.log(keypost);
    // const keyword = await keywords.findAll({
    //   where:{
    //      id : keypost.keyId
    // }})
    // console.log(keyword);
    await post.destroy();
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const updatePost = async (req, res) => {
  const uuid = req.params.uuid;
  const { title, body } = req.body;
  try {
    const post = await Post.findOne({ where: { uuid } });
    post.title = title;
    post.body = body;
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// get by title

const getByTitle = async (req, res) => {
  const title = req.query.title;
  console.log(title, "one");
  try {
    const users = await Post.findAll({
      where: {
        title: {
          [Op.iLike]: `%${title}%`,
        },
      },
    });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//get by keyword

const getPostByKeyword = async (req, res) => {
  console.log(req.query, "idhar aaya");
  const keyword = req.query.keyword;
  
  try {
    const getPost = await Post.findAll({
      where: {
        "$keywords.values$": {
          [Op.like]: `%${keyword}%`,
        },
      },
      include: {
        model: keywords,
      },
    });
    res.status(200).json({ getPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

module.exports = {
  getAllPost,
  createPost,
  getPost,
  deletePost,
  updatePost,
  getByTitle,
  getPostByKeyword,
  
};
