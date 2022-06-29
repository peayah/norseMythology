const express = require("express");
const bodyParser= require('body-parser');
const { response } = require("express");
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
        app.post("/addGod", (req, res) => {
            godCollection.insertOne(req.body)
            .then(result => {
                // refresh
                res.redirect("/")
            })
            .catch(error => console.error(error))
        }) // end post

        app.get("/", (req, res) => {

            godCollection.find().toArray()
            .then(results => {
                // console.log(results)
                res.render("index.ejs", {gods: results})
            })
            .catch(error => console.log(error))
            
        }) // end get

        app.put("/gods", (req, res) => {
            console.log(req.body)
        }) // end put

        app.delete('/deleteGod', (req, res) => {
            console.log(`req ${ req[0] } and res ${ res[0] }`)
            godCollection.deleteOne({god: req.body.godS}) //, domain: req.body.domainS, desc: req.body.descS})
            .then(result => {
                // refresh
                console.log('Entry Deleted')
                response.json('Entry Deleted')
                // res.redirect("/")
            })
            .catch(error => console.error(error))
        }) // end delete

        })

app.listen(PORT, function() {
    console.log(`\nServer is running on ${ PORT } now.\n`)
})