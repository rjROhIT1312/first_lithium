const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();
const moment = require('moment')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://rjrohit13:Rohit817@cluster0.0zq8uvw.mongodb.net/rohit-db", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use((req, res, next) => {
    let ip=req.ip;
    let path=req.originalUrl;
    let timeStamp=moment().format("YYYY-MM-DD HH:mm:ss");

    console.log(timeStamp, ip,path)
    next();
  })

app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
