const express = require("express");
const router = express.Router();

const contrl = require("../controller/index.js");


// url输入/显示index首页
router.get('/', contrl.showIndexPage);

module.exports = router;