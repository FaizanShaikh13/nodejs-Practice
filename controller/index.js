const express = require("express");
require("../utils/bcrypt");

const Bcrypt = require("../utils/bcrypt");
const { sequelize, User, Post } = require("../models");
const { user } = require("pg/lib/defaults");
const { Op } = require("sequelize");

const app = express();

const createUser = async (req, res) => {
  const { name, email, role } = req.body;
  const password = req.body.password;
  try {
    //const salt = await bcrypt.genSalt()
    // const hashedpassword = await bcrypt.hash(req.body.password, salt)
    console.log(password);
    const hashedpassword = await Bcrypt.bcrypt_pass(password);
    console.log(hashedpassword);

    console.log(hashedpassword);
    const user = await User.create({
      name,
      email,
      password: hashedpassword,
      role,
    });
    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({});
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getUser = async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const users = await User.findOne({
      where: { uuid },
      include: "posts",
    });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const deleteUser = async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const user = await User.findOne({ where: { uuid } });
    const name = user.name;
    await user.destroy();
    res.status(200).json(`${name} deleted`);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const updateUser = async (req, res) => {
  const uuid = req.params.uuid;
  const { name, email, role } = req.body;
  const password = req.body.password;
  console.log(password);
  try {
    const user = await User.findOne({ where: { uuid } });
    const hashedpassword = await Bcrypt.bcrypt_pass(password);
    console.log(hashedpassword);
    user.name = name;
    user.email = email;
    user.password = hashedpassword;
    user.role = role;
    console.log(user.password);
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getByName = async (req, res) => {
  const name = req.query.name;
  console.log(name);
  try {
    const users = await User.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  createUser,
  getUser,
  getUsers,
  deleteUser,
  updateUser,
  getByName,
};
