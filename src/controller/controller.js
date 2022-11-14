const authorModel = require('../model/authorModel')
const blogModel = require('../model/blogModel')

const emailValidator = require("email-validator")


const authors = async function (req, res) {
    try {
        let {fname , lname , title , password } = req.body


        
        if(!fname || !lname || !password) return  res.status(401).send({Status : flase , msg:"Mandatory field is not given"})
        
        let email = req.body.email
        if (!emailValidator.validate(email)) return res.status(401).send("Email id is invalid.")


        let newData = await authorModel.create(data)



        res.status(201).send({ status: true, data: newData })

    } catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }

}




const blog = async function (req, res) {

    try{
    let data = req.body

    let isPublished = req.body.isPublished
    let isDeleted = req.body.isDeleted
    let date = Date.now()
    
    if(isPublished){
        req.body.publishedAt = date
        isPublished = true
    }

    if(isDeleted){
        req.body.deletedAt = date
        isDeleted = true
    }


    let newData = await blogModel.create(data)
    res.status(201).send({ ok: newData })

    }catch(err){
        console.log(err)
        res.status(500).send({ msg: err.message })
    }

}






module.exports = {authors , blog}