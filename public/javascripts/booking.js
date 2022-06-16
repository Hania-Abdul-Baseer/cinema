var app = new Vue({
    el: '#vue',
    data: {
        show_filter: true,
        show_seats: false,
        movie: '',
        movie_date: '2022-06-20 06:35:18',
        movie_cover: 'wdc.png',
    }
});

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
    }

    // store the title of the movie that is chosen by the user
    app.movie_cover = app.movie+'.png';

    // store the date and time chosen by the user
    //app.movie_date = new Date(document.getElementById("start").value);
    app.movie_date = document.getElementById("start").value;

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

                //var option = document.createElement('td');
                //var temp = document.create;
                //option.appendChild(temp);

                var room_num = document.createElement('td');
                var temp = document.createTextNode(options_li[i].room_number);
                room_num.appendChild(temp);

                var seat_num = document.createElement('td');
                temp = document.createTextNode(options_li[i].seat_number);
                seat_num.appendChild(temp);

                //row.appendChild(option);
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