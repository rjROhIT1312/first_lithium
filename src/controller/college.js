const collegeModel = require("../model/collegeModel")
const checkName = /^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/  //regex for fullname
const checkLink =/(http|https):\/\/.+\.(jpg|jpeg|png|gif)$/
const clgName =  /^([A-Za-z]+)$/


//<<<<<<<<---------------------- Create-College -------------------->>>>>>>>>>>>>

const createCollege = async function(req,res){
    try{
        let collegeData = req.body
        if(Object.keys(collegeData).length===0){
        return res.status(400).send({status:false,message:"Body should not be Empty"})
        }
        let {name,fullName,logoLink} =collegeData

        if(!name)
        return res.status(400).send({status:false,message:"Please enter Name!"})
        if(!clgName.test(name)){
            return res.status(400).send({status:false,message:"Please Enter Valid Name!"})
        }
        const searchName = await collegeModel.findOne({name:name})
        if(searchName){
            return res.status(400).send({status:false,message:"Name is already exist!"})
        }
        collegeData.name = name.toLowerCase()
    
        // For checking fullName-
        if(!fullName)
        return res.status(400).send({status:false,message:"Please enter FullName!"})
         if(!checkName.test(fullName)){
           return res.status(400).send({status:false,message:"Please Enter Valid FullName!"})
         }
        const searchFullName = await collegeModel.findOne({fullName:fullName})
        if(searchFullName){
            return res.status(400).send({status:false,message:"FullName is already exist!"})
        }

        // For checking Logolink -
        if(!logoLink)
        return res.status(400).send({status:false,message:"Please provide logoLink!"})
        if(!checkLink.test(logoLink)){
            return res.status(400).send({status:false,message:"Please Enter Valid Link!"})
        }

        // For creating collage Data -
        let createCollege = await collegeModel.create(collegeData)
        return res.status(201).send({status:true,data:createCollege})

    }
    catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}


module.exports = { createCollege }


//validation for url
/*
let correctLink = false
await axios.get(logoLink)
   .then((res) => { correctLink = true })
   .catch((error) => { correctLink = false })
   */