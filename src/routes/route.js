const express = require('express');
const router = express.Router();
const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController")
const BooksModel=require("../models/userModel") 
const booksController=require("../controllers/booksController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

// router.post("/createUser", UserController.createUser  )

// router.get("/getUsersData", UserController.getUsersData)

router.post("/createBook", booksController.createBook  )

router.get("/getBooksData", booksController.getBooksData)

module.exports = router;