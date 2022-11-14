const authorModel = require('../model/authorModel')
const blogModel = require('../model/blogModel')

const emailValidator = require("email-validator")


const authors = async function (req, res) {
    
    try {

        let data = req.body

        let { fname, lname, title, password } = req.body

        if (!fname || !lname || !password || !title) return res.status(400).send({ Status: false, msg: "Mandatory field is not given" })
        

        
        let email = req.body.email
        
        
        if (!emailValidator.validate(email)) return res.status(400).send({ Status: false, msg: "Invalid Email id , please give valid email id." })
        
        // // Or
        
        // let emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
        // if (!email.match(emailFormat)) return res.status(400).send("Email id is invalid.")


        let newData = await authorModel.create(data)   // // Making Blog

        res.status(201).send({ status: true, data: newData })

    } catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }

}




const blog = async function (req, res) {

    try {
        let { title, body, authorId , category } = req.body

        let data = req.body

        if (!title || !body || !authorId || !category) return res.status(400).send({ Status: false, msg: "Mandatory field is not given" })

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


        authorId = req.body.authorId

        let isAuthorPresent = await authorModel.findOne({_id : authorId})

        if(! isAuthorPresent) return res.status(400).send({ Status: false, msg: "Invalid Author Id" })




        let newData = await blogModel.create(data)
        res.status(201).send({ ok: newData })

    } catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }

}




const allBlog = async function(req,res){

    try{

        const {authorId , category , tags , subcategory  } = req.query

        let findObj = {
            isDeleted : false ,
            isPublished : true 
        }

        if(authorId){
            findObj["authorId"] = authorId
        }else if(category){
            findObj["category"] = category
        }else if(tags){
            findObj["tags"] = tags
        }else if(subcategory){
            findObj["subcategory"] = subcategory
        }

        
        let   data = await blogModel.find(findObj)

        if(data.length <= 0) return res.status(404).send({Status : false , msg : 'No Data Found'})

        res.status(200).send({Status : true ,AllDataAre : data.length , data : data})

    }catch(err){
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
    

}







module.exports = { authors, blog ,allBlog }