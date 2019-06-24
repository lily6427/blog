const express = require('express');
const fs = require("fs");
const path = require("path");
const session = require("express-session");

// 创建服务器
const app = express();

// 启用 session 中间件 只要注册了中间件，只要有req的地方都能拿到req.session
app.use(session({
    secret: 'keyboard cat', // 相当于是一个加密密钥，值可以是任意字符串
    resave: false, // 强制session保存到session store中
    saveUninitialized: false // 强制没有“初始化”的session保存到storage中
}));

var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// 设置 默认采用的模板引擎名称
app.set('view engine', 'ejs');
// 设置模板页面的存放路径
app.set('views', './views');

app.use('/node_modules', express.static('node_modules'));


// // index路由
// const index = require("./router/index.js");
// app.use(index);
// // 用户路由
// const user = require("./router/user.js");
// app.use(user);

// 利用循环的方式路由的自动注册
fs.readdir(path.join(__dirname, './router'), (err, filenames) => {

    if (err) return res.send("读取router目录失败");

    filenames.forEach(fname => {

        // 拼接一个完整的路径并引入
        const router = require(path.join(__dirname, './router', fname));
        // 挂载到app上
        app.use(router);
    })

})

// 开启服务器
app.listen(3000, () => {
    console.log("服务器运行成功……");
})