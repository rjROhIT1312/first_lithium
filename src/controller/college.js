const collegeModel = require("../model/collegeModel")
const checkName =  /^([A-Za-z]+)$/

const createCollege = async function(req,res){
    try{
        let collegeData = req.body
        if(Object.keys(collegeData).length===0){
        return res.status(400).send({status:false,message:"Body should not be Empty"})
        }
        let {name,fullName,logoLink} =collegeData
        
        if(!name)
        return res.status(400).send({status:false,message:"Please enter Name!"})
        if(!checkName.test(name)){
            return res.status(400).send({status:false,message:"Please Enter Valid Name!"})
        }
        const search = await collegeModel.findOne({name:name})
        if(search){
            return res.status(400).send({status:false,message:"Name is already exist!"})
        }
        if(!fullName)
        return res.status(400).send({status:false,message:"Please enter FullName!"})
        // if(!checkName.test(fullName)){
        //     return res.status(400).send({status:false,message:"Please Enter Valid FullName!"})
        // }
        if(!logoLink)
        return res.status(400).send({status:false,message:"Please provide logoLink!"})

        let createCollege = await collegeModel.create(collegeData)
        return res.status(201).send({status:true,data:createCollege})

    }
    catch(err){
        return res.status(500).send({status:false,message:err.message})
    }


}

module.exports = { createCollege }
