var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongo = require('mongodb')

var MongoClient = mongo.MongoClient
ObjectID = mongo.ObjectID

MongoClient.connect('mongodb://localhost:27017/mongo-todo', function(err, db){


    app.use(express.static('./public'))
    app.use(bodyParser.urlencoded({ extended: true }))//WHAT DOES THIS DO FOR MY CODE?
    app.use(bodyParser.json())

    app.get('/', function(req, res){
        res.sendFile('./index.html', {root: './public'})
    })

    app.post('/to-do-list', function(req, res){
        db.collection('to-do-list').insert(req.body, function(err){
            console.log(err)
            res.send({success:'success!'})
        })
    })

    // // use different HTTP verbs for different actions we want to take on our database
    // app.get('/animal', function(req, res){
    //     db.collection('animals').find({}).toArray(function(err, docs){
    //         console.log(err)
    //         res.send(docs)
    //     })
    // })

   

    app.listen(8080)

})

    