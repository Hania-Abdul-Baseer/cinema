var express = require('express');
var router = express.Router();

// GET request that returns the seat number and room number for the user to choose from
router.post('/seats', function(req, res, next) {
  // this is a function that is going to run asynchronously and it will execute the inner function once it establishes a connection with the database
  // this way the database is not always connected and only when its needed for retrieval of data
  req.pool.getConnection(function(error, connection){
    if(error){
      console.log("error line 15");
      res.sendStatus(500);
      return;
    }

    let query = `SELECT rooms.room_number, seats.seat_number
                  FROM rooms INNER JOIN seats ON seats.room = rooms.room_id
                  INNER JOIN screenings ON screenings.room = rooms.room_id
                  INNER JOIN movies ON movies.movie_id = screenings.movie
                  WHERE movies.movie_name = ?`;
    console.log("line 20" +req.body.movie_name);
    connection.query(query,[req.body.movie_name], function(error, rows, fields){
      connection.release(); // release connection
      if(error){
        console.log("error line 25 - index.js");
        res.sendStatus(500);
        return;
      }
      res.json(rows); // send response
      console.log("line 29" + rows);
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
