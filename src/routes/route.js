const express = require('express');
const router = express.Router();

const aModel = require('../model/authorModel')
const bModel = require('../model/blogModel')


router.get("/test-me" , function(req , res){

    res.status(200).send("All Done")
})


router.post("/authors" ,async function(req , res){
    let data = req.body

    let newData = await aModel.create(data)

    res.send({ok : newData})


})



router.post("/blog" ,async function(req , res){
    let data = req.body

    let newData = await bModel.create(data)

    res.send({ok : newData})


})


module.exports = router