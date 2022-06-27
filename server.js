const express = require("express");
const bodyParser= require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient;
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }))

MongoClient.connect('mongodb-connection-string', (err, client) => {
  // 
})

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