// 首页
const showIndexPage = (req, res) => {

    // 进入首页说明登录成功，就把登录的信息加载到session中
    res.render('index.ejs', { user: req.session.user, isLogin: req.session.isLogin });
}

module.exports = {
    showIndexPage
};