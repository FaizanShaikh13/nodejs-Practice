const express = require("express");
const bcrypt = require("bcrypt");
const RouterP = require("./route/posts");
const RouterU = require("./route/index");
require("./utils/bcrypt");
const { sequelize, User, Post } = require("./models");
const Bcrypt = require("./utils/bcrypt");
const file_uuid = require("uuid").v4;
const multer = require("multer");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/posts", RouterP);
app.use("/users", RouterU);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    cb(null, `${file_uuid()}-${originalname}`);
  },
});
const upload = multer({ storage });

app.put("/upload", upload.single("file"), async (req, res) => {
  const file = req.file;
  const postId = req.body.id;
  console.log(file);
  console.log(postId);
  try {
    const uploadFile = await Post.update(
      { files: file.path },
      {
        where: {
          id: postId,
        },
        returning:true,
        
      },
    );
    res.status(200).json(uploadFile);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

app.post("/users/login", async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (user == null) {
    return res.status(400).send("invalid");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("success");
    } else {
      res.send("invalid credentials");
    }
  } catch (error) {
    res.status(500).send();
  }
});

app.listen(5000, async () => {
  console.log("server up on http://localhost:5000");
  await sequelize.authenticate();
  console.log("db synced");
});
