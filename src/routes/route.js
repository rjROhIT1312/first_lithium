const express = require("express");
const router = express.Router();
const bookController = require("../controller/bookcontroller");

router.post("/createmybook", bookController.createmybook);
router.post("/createauthor", bookController.createauthor);
router.get("/getbookbychetan", bookController.getbookbychetan);
router.get("/TwoStUpdate", bookController.TwoStUpdate);
router.get("/middle", bookController.middle);

module.exports = router;
