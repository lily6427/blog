const moment = require("moment");


// 导入数据库模块
const connection = require("../db/index.js");

// 注册页面
const showRegisterPage = (req, res) => {
    res.render('./user/register.ejs', {});
};

// 登录页面
const showLoginPage = (req, res) => {
    res.render('./user/login.ejs', {});
};

// 注册接口
const regist = (req, res) => {

    let body = req.body;

    // 判断表单的数据是否合法
    if (body.username.trim().length <= 0 || body.password.trim().length <= 0 ||
        body.nickname.trim().length <= 0) {

        return res.send({ msg: "请填写完整的表单数据进行注册", status: 501 });

    }

    // 校验数据有没有重复
    const sql = 'select count(*) as count from blog_users where username=?';

    connection.query(sql, body.username, (err, result) => {

        if (err) return res.send({ msg: "用户名查重失败", status: 502 });

        // 说明用户名已经存在
        if (result[0].count != 0) return res.send({ msg: "用户名重复注册", status: 503 });


        body.ctime = moment().format("YYYY-MM-DD HH:mm:ss");

        // 添加到数据库
        const sql2 = 'insert into blog_users set?';

        connection.query(sql2, body, (err, result) => {

            if (err) return res.send({ msg: "注册失败", msg: 504 });

            // 数据库受影响的条数
            if (result.affectedRows != 1) return res.send({ msg: "注册失败", msg: 505 });

            res.send({ msg: "注册成功", status: 200 });
        });

    });
};

// 登录接口
const login = (req, res) => {

    const body = req.body;
    console.log(body);
    const sql = 'select * from blog_users where username = ? and password = ?';

    connection.query(sql, [body.username, body.password], (err, result) => {

        if (err) return res.send({ msg: "登录失败", status: 501 });

        if (result.length != 1) return res.send({ msg: "用户名不存在", status: 502 });

        // 将私有数据保存到当前请求的session会话中：
        req.session.user = body;
        req.session.isLogin = true;

        res.send({ msg: "ok", status: 200 });

    });
};

// 登出接口
const logout = (req, res) => {

    req.session.destroy(function(err) {
        if (err) throw err;
        console.log('用户退出成功！');
        // 实现服务器端的跳转，这个对比于 客户端跳转 重定向首页
        res.redirect('/');
    });
}

// 暴露模块
module.exports = {
    showRegisterPage,
    showLoginPage,
    regist,
    login,
    logout
}