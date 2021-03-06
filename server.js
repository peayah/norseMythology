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
        let db = client.db("nordic-gods-and-domains")
        let godCollection = db.collection("gods")

        // Middleware
        // ========================
        app.set('view engine', 'ejs')   // allow ejs
        app.use(express.static('public')) //main.js
        // app.use(bodyParser.urlencoded({ extended: true }))
        app.use(bodyParser.json()) // parsing returned json
        app.use(express.json());

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

                res.render("index.ejs", {gods: results})
            })
            .catch(error => console.log(error))
            
        }) // end get

        // app.put("/addDetails", (req, res) => {
        //     // console.log("addDetails", req, res)
        // }) // end put

        app.delete("/deleteGod", (request, response) => {
            console.log(request.body.god) //   Thor
            godCollection.deleteOne(
                { god: request.body.god} // can't find it and returns deletedCount:0
                )                        // but if I hardcode it it'll delete it
            .then(result => {
                console.log(result)

                response.json('Json Deleted')
            })
            .catch(error => console.error(error))
        }) // end delete
    })

app.listen(PORT, function() {
    console.log(`\nServer is running on ${ PORT } now.\n`)
})