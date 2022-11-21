const express = require('express');
const router = express.Router();
const collegeController = require ("../controller/college")
const internController = require ("../controller/intern")
 

router.post("/functionup/colleges",collegeController.createCollege)




module.exports = router;