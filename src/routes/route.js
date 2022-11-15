const express = require('express');
const router = express.Router();

const controller = require("../controller/controller")


router.get("/test-me", function (req, res) {

    res.status(200).send("All Done")
})


router.post("/authors", controller.authors)



router.post("/blogs", controller.blogs)


router.get("/blogs", controller.allBlogs)


router.put("/blogs/:blogId", controller.updateBlog);


router.delete("/blogs/:blogId", controller.deleteBlog)


router.delete("/blogs" ,controller.deletBlogByQuery )



module.exports = router