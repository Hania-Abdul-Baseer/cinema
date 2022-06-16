var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// GET request that returns the seat number and room number for the user to choose from
router.get('/seats', function(req, res, next) {
  // this is a function that is going to run asynchronously and it will execute the inner function once it establishes a connection with the database
  // this way the database is not always connected and only when its needed for retrieval of data
  req.pool.getConnection(function(error, connection){
    if(error){
      console.log("error line 15");
      res.sendStatus(500);
      return;
    }


    let query = "SELECT shoe_name, price FROM shoes;";
    connection.query(query, function(error, rows, fields){
      connection.release(); // release connection
      if(error){
        console.log("error line 25 - index.js");
        res.sendStatus(500);
        return;
      }
      res.json(rows); // send response
      console.log("ok line 30 - index.js");
    });
  });
});

/*
// GET to query all the actors in the database and display them in the html table, everytime the webapp loads
router.get('/actors', function(req, res) {
  // this is a function that is going to run asynchronously and it will execute the inner function once it establishes a connection with the database
  // this way the database is not always connected and only when its needed for retrieval of data
  //
  req.pool.getConnection(function(error, connection){
    if(error){
      console.log("error line 16");
      res.sendStatus(500);
      return;
    }
    var query = "SELECT first_name, last_name FROM actor;";
    connection.query(query, function(error, rows, fields){
      connection.release(); // release connection
      if(error){
        console.log("error line 24");
        res.sendStatus(500);
        return;
      }
      res.json(rows); // send response
    });

  });
});
*/

module.exports = router;
