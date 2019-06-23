const express = require("express");
const router = express.Router();


const control = require("../controller/user.js");

// 注册
router.get('/register', control.showRegisterPage);

// 登录
router.get('/login', control.showLoginPage);


// 注册页面
router.post('/register', control.regist);

// 登录界面
router.post('/login', control.login);

module.exports = router;