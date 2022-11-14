const authorModel = require('../model/authorModel')
const blogModel = require('../model/blogModel')

const emailValidator = require("email-validator")


const authors = async function (req, res) {
    try {
        let { fname, lname, title, password } = req.body



        if (!fname || !lname || !password) return res.status(400).send({ Status: flase, msg: "Mandatory field is not given" })

        let email = req.body.email
        if (!emailValidator.validate(email)) return res.status(400).send("Email id is invalid.")


        let newData = await authorModel.create(data)



        res.status(201).send({ status: true, data: newData })

    } catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }

}




const blog = async function (req, res) {

    try {
        let { title, body, authorId , category } = req.body



        if (!title || !body || !authorId || !category) return res.status(401).send({ Status: flase, msg: "Mandatory field is not given" })

        let isPublished = req.body.isPublished
        let isDeleted = req.body.isDeleted
        let date = Date.now()

        if (isPublished) {
            req.body.publishedAt = date
            isPublished = true
        }

        if (isDeleted) {
            req.body.deletedAt = date
            isDeleted = true
        }


        let newData = await blogModel.create(data)
        res.status(201).send({ ok: newData })

    } catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }

}

const allBlog = async function(req,res){

    try{

        const authorId = req.query.authorId



        if(!authorId){
            data = await blogModel.find({ isDeleted : false ,isPublished : true })
        }else{
            
            data = await blogModel.find({ authorId : authorId , isDeleted : false ,isPublished : true})
        }




        if(data.length <= 0) return res.status(404).send({Status : false , msg : 'No Data Found'})

        res.send({Status : true ,AllDataAre : data.length , data : data})



    }catch(err){
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
    

}




module.exports = { authors, blog,allBlog }