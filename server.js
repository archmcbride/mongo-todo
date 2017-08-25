var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongo = require('mongodb')

var MongoClient = mongo.MongoClient
var ObjectID = mongo.ObjectID

MongoClient.connect('mongodb://localhost:27017/mongo-todo', function(err, db){


    app.use(express.static('./public'))
    app.use(bodyParser.urlencoded({ extended: true }))//WHAT DOES THIS DO FOR MY CODE?
    app.use(bodyParser.json())

    app.get('/', function(req, res){
        res.send('./index.html', {root: './public'})
    })
    //Create the list items in the db
    app.post('/to-do-list', function(req, res){
        db.collection('to-do-list').insert(req.body, function(err){
            console.log(err)
            res.send({success:'success!'})
        })
    })

    //Send data to front end, i.e. the list to the client side
    // use different HTTP verbs for different actions we want to take on our database
    app.get('/to-do-list', function(req, res){
        db.collection('to-do-list').find({}).toArray(function(err, docs){
            console.log(err)
            res.send(docs)
        })
    })

    //Update list items with strikethroughs(Update database after any changes)
    app.post('/todo/completed', function(req, res){
        db.collection('to-do-list').update(req.body, function(err){
            console.log(err)
            res.send({success: 'successful update'})
        })
    })
    app.post('/todo/delete', function(req, res){
        console.log(req.body)
        db.collection('to-do-list').remove({_id: ObjectID(req.body.todoId)}, function(err){
        console.log(err)
        res.send({success: 'successful delete'})
        })
    })

   //TURN ON DB & SERVER THROUGH LOCAL HOST 8080

    app.listen(8080)

})

    