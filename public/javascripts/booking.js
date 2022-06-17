var app = new Vue({
    el: '#vue',
    data: {
        show_filter: true,
        show_seats: false,
        movie: 'Titanic', // default movie name, if user doesnt choose a name
        movie_date: '2022-08-25 02:00:00', // default movie datetime if user doesnt choose one
        movie_cover: 'Titanic.png' // default movie title for default movie if user doesnt choose one
    }
});

// function that will send an ajax request to GET all the movies from the database and displays them
function showMovies() {
    // Create AJAX Request
    var xmlhttp = new XMLHttpRequest();

    // Define function to run on response
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            var movies_li = JSON.parse(this.responseText);
            for(let i = 0; i < movies_li.length; i++){

                var row = document.createElement('tr');

                var movie_title = document.createElement('td');
                var temp = document.createTextNode(movies_li[i].movie_name);
                movie_title.appendChild(temp);

                var movie_start = document.createElement('td');
                temp = document.createTextNode(movies_li[i].start_time);
                movie_start.appendChild(temp);

                row.appendChild(movie_title);
                row.appendChild(movie_start);

                document.getElementById("movie-data").appendChild(row);

            }
        }
    };
    // Open connection to server
    xmlhttp.open("GET", "/movies", true);

    // Send request
    xmlhttp.send();
}

// Function that will display all the available seats fro the user to choose from depending on the movie and date they choose
function getSeats() {

    // Create AJAX Request
    var xmlhttp = new XMLHttpRequest();

    // the div that allows users to choose a movie and time will disappear
    app.show_filter = false;
    // the div that displays the results of what the users chose will appear
    app.show_seats = true;

    // store the movie that is chosen by the user
    let movie_options = document.getElementsByName('movie');
    for(let movie_option of movie_options){
        if(movie_option.checked){
            app.movie = movie_option.value;
        }
        else{
            app.movie = 'Titanic';
        }
    }

    // store the title of the movie that is chosen by the user
    app.movie_cover = app.movie+'.png';

    // datetime of movie is selected if user choses something otherwise it will use default datetime
    if(!(document.getElementById("start").value.length===0)){
        // store the date and time chosen by the user
        //app.movie_date = new Date(document.getElementById("start").value);
        app.movie_date = document.getElementById("start").value;
    }

    let details = {
        movie_name: app.movie,
        movie_time: app.movie_date
    };

    // Define function to run on response
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            var options_li = JSON.parse(this.responseText);
            for(let i = 0; i < options_li.length; i++){

                var row = document.createElement('tr');

                var select_button = document.createElement('td');
                var temp = document.createElement('button');
                temp.setAttribute("id", "select-button");
                temp.innerHTML = 'Select';
                select_button.appendChild(temp);

                var room_num = document.createElement('td');
                temp = document.createTextNode(options_li[i].room_number);
                room_num.appendChild(temp);

                var seat_num = document.createElement('td');
                temp = document.createTextNode(options_li[i].seat_number);
                seat_num.appendChild(temp);

                row.appendChild(select_button);
                row.appendChild(room_num);
                row.appendChild(seat_num);

                document.getElementById("seat-data").appendChild(row);

            }
        }
    };
    // Open connection to server
    xmlhttp.open("POST", "/seats", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");

    // Send request
    xmlhttp.send(JSON.stringify(details));
}