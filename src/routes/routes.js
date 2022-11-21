const express = require('express');
const router = express.Router();
const collegeController = require ("../controller/college")
const internController = require ("../controller/intern")
 
//create college
router.post("/functionup/colleges",collegeController.createCollege)
//create intern
router.post("/functionup/interns",internController.createIntern)
//get
router.get('/functionup/collegeDetails',internController.getCollege)


module.exports = router;