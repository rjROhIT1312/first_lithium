const express = require('express');
const router = express.Router();

const controller = require("../controller/controller")


router.get("/test-me", function (req, res) {

    res.status(200).send("All Done")
})


router.post("/authors", controller.authors)



router.post("/blog", controller.blog)


module.exports = router