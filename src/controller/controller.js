const authorModel = require('../model/authorModel')
const blogModel = require('../model/blogModel')

const emailValidator = require("email-validator")


const authors = async function (req, res) {
    
    try {
        // // All Data From Body putting in data var.
        let data = req.body

        // // All Mandatory field taking out and checking present or not , if  not present then send an err msg. 
        let { fname, lname, title, password } = req.body

        if (!fname || !lname || !password || !title) return res.status(400).send({ Status: false, msg: "Mandatory field is not given" })
        

        // // Email extracting from body to verify given email is correct or not.
        let email = req.body.email
        
        
        if (!emailValidator.validate(email)) return res.status(400).send({ Status: false, msg: "Invalid Email id , please give valid email id." })
        
        // // Or

        //  let emailFormat = /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([a-z]{2,20})$/
        // if (!email.match(emailFormat)) return res.status(400).send("Email id is invalid.")

        // // If everyThing is right then create data in DB and send back newy formed data.
        let newData = await authorModel.create(data)   // // Making Blog

        res.status(201).send({ status: true, data: newData })

    } catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }

}




const blog = async function (req, res) {

    try {
        // // All Data From Body putting in data var.
        let data = req.body

        // // All Mandatory field taking out and checking present or not , if  not present then send an err msg. 
        let { title, body, authorId , category } = req.body

        if (!title || !body || !authorId || !category) return res.status(400).send({ Status: false, msg: "Mandatory field is not given" })

        // // Extracting two keys from body bez we need to do extra date acc. to true or false.
        let isPublished = req.body.isPublished
        let isDeleted = req.body.isDeleted
        let date = Date.now()

        // // If isPulished is true then do two thing -> attach current date to pulishedAt key and make true isPublished
        if (isPublished) {
            req.body.publishedAt = date
            isPublished = true
        }

        if (isDeleted) {
            req.body.deletedAt = date
            isDeleted = true
        }


        // // Extractin author id from body and checking , this authorId present in DB collection or not. if not present then send error.
        authorId = req.body.authorId

        let isAuthorPresent = await authorModel.findOne({_id : authorId})

        if(! isAuthorPresent ) return res.status(400).send({ Status: false, msg: "Invalid Author Id" })


        // // // If everyThing is right then created blog with this data and send back into response. 
        let newData = await blogModel.create(data)
        res.status(201).send({ ok: newData })

    } catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }

}




const allBlog = async function(req,res){

    try{

        // // All query field extractng here to search data with these field
        const {authorId , category , tags , subcategory  } = req.query

        // // Creating a findObj here all find field is present (Two field present every time)
        let findObj = {
            isDeleted : false ,
            isPublished : true 
        }

        // // If any more field is given in query params then add that field into findObj and then find data in DB (Object concept)
        if(authorId){
            findObj["authorId"] = authorId
        }else if(category){
            findObj["category"] = category
        }else if(tags){
            findObj["tags"] = tags
        }else if(subcategory){
            findObj["subcategory"] = subcategory
        }

        // // // Find data with findObj , if no data find then send 404 err No Data Found otherwise send data in response.
        let   data = await blogModel.find(findObj)

        if(data.length <= 0) return res.status(404).send({Status : false , msg : 'No Data Found'})

        res.status(200).send({Status : true ,AllDataAre : data.length , data : data})

    }catch(err){
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
    

}

// // // // Till Day 1 ------





module.exports = { authors, blog ,allBlog }