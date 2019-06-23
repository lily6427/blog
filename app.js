const express = require('express');
const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use("/node_modules", "views");


app.get("/", (req, res) => {
    res.render("index.ejs", {});
})
app.listen(3000, () => {
    console.log("服务器运行成功");

})