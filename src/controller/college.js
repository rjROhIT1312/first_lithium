const collegeModel = require("../model/collegeModel")
const checkName = /^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/  //regex for fullname
const checkLink =/(http|https):\/\/.+\.(jpg|jpeg|png|gif)$/
const clgName =  /^([A-Za-z]+)$/



const createCollege = async function(req,res){
    try{
        let collegeData = req.body
        if(Object.keys(collegeData).length===0){
        return res.status(400).send({status:false,message:"Body should not be Empty"})
        }
        let {name,fullName,logoLink} =collegeData
        const search = await collegeModel.findOne({name:name})
        if(search){
            return res.status(400).send({status:false,message:"Name is already exist!"})
        }
        if(!name)
        return res.status(400).send({status:false,message:"Please enter Name!"})
        if(!clgName.test(name)){
            return res.status(400).send({status:false,message:"Please Enter Valid Name!"})
        }
        collegeData.name = name.toLowerCase()
        const search3 = await collegeModel.findOne({fullName:fullName})
        if(search3){
            return res.status(400).send({status:false,message:"FullName is already exist!"})
        }
        if(!fullName)
        return res.status(400).send({status:false,message:"Please enter FullName!"})
         if(!checkName.test(fullName)){
           return res.status(400).send({status:false,message:"Please Enter Valid FullName!"})
         }
        if(!logoLink)
        return res.status(400).send({status:false,message:"Please provide logoLink!"})
        if(!checkLink.test(logoLink)){
            return res.status(400).send({status:false,message:"Please Enter Valid Link!"})
        }

        let createCollege = await collegeModel.create(collegeData)
        return res.status(201).send({status:true,data:createCollege})

    }
    catch(err){
        return res.status(500).send({status:false,message:err.message})
    }


}


module.exports = { createCollege }
