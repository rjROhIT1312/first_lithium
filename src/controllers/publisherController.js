const authorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel")
const publisherModel=require("../models/publisherModel")


const createpublisher= async function (req, res) {
    let publisher = req.body
    let authorCreated = await publisherModel.create(publisher)
    res.send({data: authorCreated})
}

const getPublisherData= async function (req, res) {
    let publisher = await publisherModel.find()
    res.send({data: publisher})
}

module.exports.createpublisher=createpublisher
module.exports.getPublisherData=getPublisherData