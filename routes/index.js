
var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});


module.exports = router;


var url = "mongodb://test:test2020@ds157248.mlab.com:57248/heroku_4x21xrcx";

// create a client to mongodb
var MongoClient = require('mongodb').MongoClient;

router.get('/mongodb', function (request, response) {
    // make client connect to mongo service
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        // db pointing to newdb
        console.log("Switched to " + db.databaseName + " database");

        var Routes = db.collection('Routes');

        //get all Routes with frequency >=1

        Routes.find({ frequency: { $gt: 0 } }).sort({ name: 1 }).toArray(function (err, docs) {
            if (err) throw err;

            response.render('mongodb', {results: docs});

        });

        //close connection when your app is terminating.

        // db.close(function (err) {

        db.close(function (err) {

            if (err) throw err;

        });


    });//end app.get
});


