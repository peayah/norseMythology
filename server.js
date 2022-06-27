const express = require("express");
const bodyParser= require('body-parser')
const app = express();
const PORT = 3000

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post("/gods", (req, res) => {
    console.log("hellloooo")
})


app.listen(PORT, function() {
    console.log(`Server is running on ${ PORT } now.`)
})