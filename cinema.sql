DROP DATABASE IF EXISTS cinema;
CREATE DATABASE cinema;
USE cinema

CREATE TABLE users (
    u_id INT AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    password_hash VARCHAR(256),
    email VARCHAR(128) UNIQUE NOT NULL,
    PRIMARY KEY (u_id)
);

CREATE TABLE movies (
    movie_id INT AUTO_INCREMENT,
    movie_name VARCHAR(128) UNIQUE NOT NULL,
    descr LONGTEXT,  /* descr = description */
    movie_cast TEXT,
    genre VARCHAR(128),
    duration VARCHAR(20),
    PRIMARY KEY (movie_id)
);

CREATE TABLE reviews (
    review_id INT AUTO_INCREMENT,
    title TEXT,
    content LONGTEXT,
    date_posted DATETIME,
    author INT,
    movie INT,
    PRIMARY KEY (review_id),
    FOREIGN KEY (author) REFERENCES users(u_id) ON DELETE SET NULL,
    FOREIGN KEY (movie) REFERENCES movies(movie_id) ON DELETE SET NULL
);

CREATE TABLE rooms (
    room_id INT AUTO_INCREMENT,
    room_number INT,
    capacity INT,  /* number of seats that the room has in total */
    room_location VARCHAR(256),
    PRIMARY KEY (room_id)
);

CREATE TABLE seats (
    seat_id INT AUTO_INCREMENT,
    seat_number INT,
    room INT,
    FOREIGN KEY (room) REFERENCES rooms(room_id) ON DELETE CASCADE,
    PRIMARY KEY (seat_id)
);

CREATE TABLE bookings (
    booking_id INT AUTO_INCREMENT,
    booking_date DATETIME,
    booking_status VARCHAR(50) DEFAULT 'pending',
    customer INT,
    FOREIGN KEY (customer) REFERENCES users(u_id) ON DELETE SET NULL,
    PRIMARY KEY (booking_id)
);

CREATE TABLE screenings (
    screening_id INT AUTO_INCREMENT,
    start_time DATETIME,
    movie INT,
    room INT,
    FOREIGN KEY (movie) REFERENCES movies(movie_id) ON DELETE CASCADE,
    FOREIGN KEY (room) REFERENCES rooms(room_id) ON DELETE CASCADE,
    PRIMARY KEY (screening_id)
);

CREATE TABLE tickets (
    ticket_id INT AUTO_INCREMENT,
    screening INT,
    booking INT,
    seat INT,
    FOREIGN KEY (screening) REFERENCES screenings(screening_id) ON DELETE CASCADE,
    FOREIGN KEY (booking) REFERENCES bookings(booking_id) ON DELETE CASCADE,
    FOREIGN KEY (seat) REFERENCES seats(seat_id) ON DELETE CASCADE,
    PRIMARY KEY (ticket_id)
);

/* Alice and Bob's passwords are: password */
INSERT INTO users VALUES (1,'alice','Alice','Woods','$argon2i$v=19$m=16,t=2,p=1$cUprcmRXbDRWNmN6TkNWcQ$zlP8PdnyumlH9h074C6D6w','alice@example.example');
INSERT INTO users VALUES (2,'bob','Bob','Duncan','$argon2i$v=19$m=16,t=2,p=1$cUprcmRXbDRWNmN6TkNWcQ$zlP8PdnyumlH9h074C6D6w','bob@example.example');

INSERT INTO movies VALUES (1,'WDC','This is the description of the movie','Hania AB, Alice Woods, Bob Duncan','horror, thriller, suspense','32 hours');
INSERT INTO movies VALUES (2,'Run','This is the description of the movie','Bob Hi, Wayne RK, White Hood','action, comedy, thriller','3 hours');
INSERT INTO movies VALUES (3,'Titanic','This is the description of the movie','Brown JK, Jennie R, Lisa M','romance, melodrama','6 hours');
INSERT INTO movies VALUES (4,'Conjuring','This is the description of the movie','Rose J, Alen Right','horror, drama, action','2 hours');

INSERT INTO reviews VALUES (1,'review title','content of the review','2022-06-16 06:35:18',1,1);

INSERT INTO rooms VALUES (1,20,100,'main hub in left wing');
INSERT INTO rooms VALUES (2,20,100,'main hub in right wing');

INSERT INTO seats VALUES (1, 30, 1);
INSERT INTO seats VALUES (2, 31, 1);
INSERT INTO seats VALUES (3, 32, 1);
INSERT INTO seats VALUES (4, 40, 2);
INSERT INTO seats VALUES (5, 41, 2);
INSERT INTO seats VALUES (6, 42, 2);

INSERT INTO bookings VALUES (1, '2022-06-20 06:35:18', 'confirmed', 1);
INSERT INTO bookings VALUES (2, '2022-06-21 06:35:18', 'confirmed', 2);

INSERT INTO screenings VALUES (1, '2022-06-25 02:30:00', 1, 1);
INSERT INTO screenings VALUES (2, '2022-07-25 02:20:00', 2, 1);
INSERT INTO screenings VALUES (3, '2022-08-25 02:00:00', 3, 2);
INSERT INTO screenings VALUES (4, '2022-09-25 01:30:00', 4, 2);

INSERT INTO tickets VALUES (1, 1, 1, 1);
INSERT INTO tickets VALUES (2, 1, 1, 2);
INSERT INTO tickets VALUES (3, 1, 2, 3);

/* storing my answer to task1-5 as VIEW for reuse if needed later */
CREATE VIEW bookings_on_20june2022_view
AS
SELECT movies.movie_name, movies.descr, movies.movie_cast, movies.genre, movies.duration, seats.seat_number
    FROM movies INNER JOIN screenings ON screenings.movie = movies.movie_id
    INNER JOIN tickets ON tickets.screening = screenings.screening_id
    INNER JOIN bookings ON bookings.booking_id = tickets.booking
    INNER JOIN seats ON seats.seat_id = tickets.seat
    WHERE bookings.booking_date BETWEEN '2022-06-20 00:00:00' AND '2022-06-20 23:59:59';


/* Prepared used to display all movies and their starting times
`SELECT movies.movie_name, screenings.start_time
    FROM movies INNER JOIN screenings ON screenings.movie = movies.movie_id`
*/

/* Prepared statement used to display all seat and room number for the movie and time chosen by user
 `SELECT rooms.room_number, seats.seat_number
                  FROM rooms INNER JOIN seats ON seats.room = rooms.room_id
                  INNER JOIN screenings ON screenings.room = rooms.room_id
                  INNER JOIN movies ON movies.movie_id = screenings.movie
                  WHERE movies.movie_name = ? AND screenings.start_time = ?`
*/

/* Query used to test the output from the top prepared statement is correct
SELECT rooms.room_number, seats.seat_number
    FROM rooms INNER JOIN seats ON seats.room = rooms.room_id
    INNER JOIN screenings ON screenings.room = rooms.room_id
    INNER JOIN movies ON movies.movie_id = screenings.movie
    WHERE movies.movie_name = 'WDC' AND screenings.start_time = '2022-06-25 02:30:00';
*/
