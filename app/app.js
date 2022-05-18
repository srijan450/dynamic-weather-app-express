const express = require("express");
const requests = require("requests");
const path = require("path");
const hbs = require("hbs")
const port = process.env.port || 5000;
const app = express()
app.listen(port, () => {
    console.log(`server started at port ${port}`)
});
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../views/view1"))

app.get("/", (req, res) => {
    const api = req.query.city === undefined ? `https://api.openweathermap.org/data/2.5/weather?q=varanasi&appid=f1213eed1fc7a1eb9dd4ab8823bf38a1` : `https://api.openweathermap.org/data/2.5/weather?q=${req.query.city}&appid=f1213eed1fc7a1eb9dd4ab8823bf38a1`;

    requests(
        api
    )
        .on("data", function (chunk) {
            const data = JSON.parse(chunk)
            console.log(data.main.temp)
            const sendData = {
                city: data.name,
                tempVal: Math.round(data.main.temp - 273.15),
                minVal: Math.round(data.main.temp_min - 273.15),
                maxVal: Math.round(data.main.temp_max - 273.15),
            }
            res.render("index", sendData);
        })
        .on("end", function (err) {
            console.log("end");
        })
})
