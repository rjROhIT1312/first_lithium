const collegeModel =require('../model/collegeModel')
const internModel = require('../model/interModel')
const mongoose = require('mongoose')

const checkEmail = /^[a-z0-9+_.-]+@[a-z0-9.-]+$/  //regex for email
const checkName =  /^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/     //regex for name
const checkMobile = /^[0-9]{10,10}$/   //regex for mobile


//<<<<<<<<------------------- Create-Intern -------------------->>>>>>>>>>>>>

const createIntern = async function(req,res){
    try{
        let data = req.body
        let {name,email,mobile} = data
        if(Object.keys(data).length ==0){
            return res.status(400).send({status:false,message:"Body should not be empty!"})
        }
        //for name
        if(!name)
        return res.status(400).send({status:false,message:"Please enter Name!"})
        if(!checkName.test(name)){
            return res.status(403).send({status:false,message:"Please Enter Valid Name!"})
        }
        //mobile 
        if(!mobile)
        return res.status(400).send({status:false,message:"Please enter mobile!"})
        if(!checkMobile.test(mobile)){
            return res.status(403).send({status:false,message:"Please Enter Valid Mobile Number!"})
        }
        
        const searchMobile = await internModel.findOne({mobile:mobile})
        if(searchMobile){
            return res.status(400).send({status:false,message:"Mobile is already exist!"})
        }
       

       //email
       if(!email)
        return res.status(400).send({status:false,message:"Please enter Email!"})
        if(!checkEmail.test(email)){
            return res.status(403).send({status:false,message:"Not a valid Email"})
        }
        const searchEmail = await internModel.findOne({email:email})
        if(searchEmail){
            return res.status(400).send({status:false,message:"Email-Id is already exist!"})
        }
      

      //create intern
        let collegeName = data.collegeName

        let findCllg = await collegeModel.findOne({name:collegeName})
        if(!findCllg) 
        {
            return res .status(400).send({status:false,message:"college dose not exist"})
        }

        let collegeId=findCllg["_id"]
        let toCreateIntern = {name,mobile,email,collegeId}

        let saveData = await internModel.create(toCreateIntern)
       return res.status(201).send({ status:true,data:saveData })
    }
    catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}


//<<<<<<<<------------------- Getting-College -------------------->>>>>>>>>>>>>

const getCollege = async function(req,res){
    try{
        let collegeName = req.query.collegeName
        if(!collegeName){
        return res.status(400).send({status:false,message:"Please provide College name !"})
        }

       
        let findCllg = await collegeModel.findOne({name:collegeName})
        if(!findCllg){
            return res.status(404).send({status:false,message:"College Not found !"})
            }
        let id =findCllg["_id"]

        let result = await internModel.find({collegeId:id}).select({_id:1,name:1,email:1,mobile:1})
        if(result.length === 0){
            return res.status(404).send({status:false,message:"No intern Found from this College !"})
            }
        let finalData ={name:collegeName,fullName:findCllg.fullName,logoLink:findCllg.logoLink,
            interns:[result]}
            
        res.status(200).send({status:true,data:finalData})
    }
    catch(err){
        return res.status(500).send({status:false,message:err.message})
    }

}
module.exports ={createIntern,getCollege}