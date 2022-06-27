const express = require("express");
const bodyParser= require('body-parser')
const app = express();
const PORT = 3000

app.use(bodyParser.urlencoded({ extended: true }))

// Handlers
app.get("/", (req,res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post("/gods", (req, res) => {
    console.log(req.body)
})


app.listen(PORT, function() {
    console.log(`\nServer is running on ${ PORT } now.\n`)
})