const express = require("express");
const bodyParser= require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient;
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }))

const connectionString = 'mongodb+srv://nadmin:PHAOmiEMEOLLjX9U@cluster0.mgtfo.mongodb.net/?retryWrites=true&w=majority'

MongoClient.connect(connectionString, { useUnifiedTopology: true })
    
    .then(client => {
        console.log('Connected to Database')
        const db = client.db("nordic-gods-and-domains")
        const godCollection = db.collection("gods")

        // Middleware
        // ========================
        app.set('view engine', 'ejs')   // allow ejs
        app.use(express.static('public')) //main.js
        app.use(bodyParser.json()) // parsing returned json

        // Routes
        // ========================
        app.post("/gods", (req, res) => {
            godCollection.insertOne(req.body)
            .then(result => {
                // refresh
                res.redirect("/")
            })
            .catch(error => console.error(RangeError))
        })

        app.get("/", (req, res) => {

            db.collection("gods").find().toArray()
            .then(results => {
                // console.log(results)
                res.render("index.ejs", {gods: results})
            })
            .catch(error => console.log(error))
            
        })

        app.put("/gods", (req, res) => {
            console.log(req.body)
        })
    
    })
    .catch(console.error)

app.listen(PORT, function() {
    console.log(`\nServer is running on ${ PORT } now.\n`)
})