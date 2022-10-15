const express = require('express');
const router = express.Router();///test-you
//importing a custom module
const xyz = require('../logger')
const xxx = require('../util/helper')
const abc = require('../validater/formatter.js')
const def = require('../lodash/lodash')
//importing external package
//const underscore = require('underscore')

router.get('/test-me', function (req, res) {
    //Calling the components of a different custom module
    //console.log("Calling my function ",xyz.myFunction())
    //console.log("The value of the constant is ",xyz.myUrl)
    //Trying to use an external package called underscore
    //let myArray = ['Akash', 'Pritesh', 'Sabiha']
   // let result = underscore.first(myArray)
    //console.log("The result of underscores examples api is : ", result)
    console.log(xyz.welcome())
    console.log(xxx.info())
    console.log(abc.format())
    console.log(def.months())
    
    
    res.send('My first ever api!')

    //To be tried what happens if we send multiple response
    //res.send('My second api!')
});

module.exports = router;

