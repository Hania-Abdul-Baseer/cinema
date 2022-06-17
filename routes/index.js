var express = require('express');
var router = express.Router();

// GET home page.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// GET request to get the list of all current movies and their times
router.post('/movies', function(req, res, next) {
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
                  WHERE movies.movie_name = ? AND screenings.start_time = ?`;

    connection.query(query,[req.body.movie_name, req.body.movie_time], function(error, rows, fields){
      connection.release(); // release connection
      if(error){
        console.log("error line 25 - index.js");
        res.sendStatus(500);
        return;
      }
      res.json(rows); // send response
    });
  });
});

// POST request that returns the seat number and room number for the user to choose from
// This can be tested by selecting the movie as 'WDC' and the datetime as '2022-06-25 02:30:00' which is 6th of June 2022 and 2:30 am
// This should return 3 seats with numbers: 30, 31, 32 all from room 20
router.post('/seats', function(req, res, next) {
  // this is a function that is going to run asynchronously and it will execute the inner function once it establishes a connection with the database
  // this way the database is not always connected and only when its needed for retrieval of data
  req.pool.getConnection(function(error, connection){
    if(error){
      console.log("error line 46");
      res.sendStatus(500);
      return;
    }

    let query = `SELECT rooms.room_number, seats.seat_number
                  FROM rooms INNER JOIN seats ON seats.room = rooms.room_id
                  INNER JOIN screenings ON screenings.room = rooms.room_id
                  INNER JOIN movies ON movies.movie_id = screenings.movie
                  WHERE movies.movie_name = ? AND screenings.start_time = ?`;

    connection.query(query,[req.body.movie_name, req.body.movie_time], function(error, rows, fields){
      connection.release(); // release connection
      if(error){
        console.log("error line 60 - index.js");
        res.sendStatus(500);
        return;
      }
      res.json(rows); // send response
    });
  });
});

module.exports = router;
