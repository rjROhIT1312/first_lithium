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

router.get("/bookList", booksController.bookList)

router.post("/getBooksInYear", booksController.getBooksInYear)

router.post("/getParticularBooks", booksController.getParticularBooks)

router.get("/getXINRBooks", booksController.getXINRBooks)

router.get("/getRandomBooks", booksController.getRandomBooks)

module.exports = router;