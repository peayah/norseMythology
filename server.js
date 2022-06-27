const express = require("express");
const bodyParser= require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient;
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }))

const connectionString = 'mongodb+srv://nadmin:PHAOmiEMEOLLjX9U@cluster0.mgtfo.mongodb.net/?retryWrites=true&w=majority'

MongoClient.connect(connectionString, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')
})

// Handlers
app.get("/", (req,res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post("/gods", (req, res) => {
    // console.log(req.body)
})


app.listen(PORT, function() {
    console.log(`\nServer is running on ${ PORT } now.\n`)
})