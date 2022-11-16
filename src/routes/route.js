const express = require('express');
const router = express.Router();

const controller = require("../controller/controller")

const {authorisation , authentication} = require('../middleware/middleware')


router.get("/test-me", (req, res)=> { res.status(200).send("All Done")})


router.post("/authors", controller.authors)


router.post("/blogs" , authentication, controller.blogs)


router.get("/blogs", authentication , controller.allBlogs)


router.put("/blogs/:blogId", authentication , authorisation , controller.updateBlog);


router.delete("/blogs/:blogId", authentication , authorisation , controller.deleteBlog)


router.delete("/blogs" , authentication , controller.deletBlogByQuery )


router.post("/login" , controller.loginAuthor)



module.exports = router