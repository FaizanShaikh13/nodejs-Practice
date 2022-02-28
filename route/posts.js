const express = require("express");
const Router = express.Router();
const {
  getAllPost,
  createPost,
  getPost,
  deletePost,
  updatePost,
  getByTitle,
  getPostByKeyword,
  
} = require("../controller/post");

Router.route("/").get(getAllPost).post(createPost);
Router.route("/search").get(getPostByKeyword);
Router.route("/:uuid").get(getPost).delete(deletePost).patch(updatePost);
Router.route("/search/:title?").get(getByTitle);

module.exports = Router;
