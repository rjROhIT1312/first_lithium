const authorModel = require('../model/authorModel')
const blogModel = require('../model/blogModel')

const emailValidator = require("email-validator")


const authors = async function (req, res) {
    try {
        let data = req.body

        let newData = await authorModel.create(data)

        let email = req.body.email

        if (!emailValidator.validate(email)) return res.send("Email id is invalid.")

        res.status(201).send({ status: true, data: newData })

    } catch (err) {
        console.log(err)
        res.send({ msg: err.message })
    }

}
const blog = async function (req, res) {
    let data = req.body

    let newData = await blogModel.create(data)

    res.send({ ok: newData })


}






module.exports = {authors , blog}