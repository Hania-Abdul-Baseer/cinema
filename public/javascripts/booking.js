var app = new Vue({
    el: '#vue',
    data: {
        show_search: true,
        show_search_results: false,
        item: 'shoes',
        chosen_price: 50
    }
});

function showPrice(){
    app.chosen_price = document.getElementById("shoe-price").value;
}

function getResults() {

    // Create AJAX Request
    var xmlhttp = new XMLHttpRequest();

    app.show_search=false;
    app.show_search_results = true;
    app.item = document.getElementById("shoe-search").value+":";

    // Define function to run on response
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var shoes_li = JSON.parse(this.responseText);
            for(let i = 0; i < shoes_li.length; i++){
                var row = document.createElement('tr');

                var name = document.createElement('td');
                var temp = document.createTextNode(shoes_li[i].shoe_name);
                name.appendChild(temp);

                var price = document.createElement('td');
                temp = document.createTextNode(shoes_li[i].price);
                price.appendChild(temp);

                row.appendChild(name);
                row.appendChild(price);

                document.getElementById("shoe-data").appendChild(row);
            }
        }
    };

    // Open connection to server
    xmlhttp.open("GET", "/shoes", true);

    // Send request
    xmlhttp.send();
}

/*
function getResults(){
    app.show_search=false;
    app.show_search_results = true;
    app.item = document.getElementById("shoe-search").value+":";
    var table = document.getElementById("shoe-data");
    table.innerText = '';

    // Create AJAX Request
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var shoes_li = JSON.parse(this.responseText);
            for(let i = 0; i < shoes_li.length; i++){
                var row = document.createElement('tr');

                var name = document.createElement('td');
                var temp = document.createTextNode(shoes_li[i].shoe_name);
                name.appendChild(temp);

                var price = document.createElement('td');
                temp = document.createTextNode(shoes_li[i].price);
                price.appendChild(temp);

                row.appendChild(name);
                row.appendChild(price);

                document.getElementById("shoe-data").appendChild(row);
            }
        }
    };

    xhttp.open("GET", "/shoes", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}
*/

// Function the
function showResults(){
    let items = document.getElementById("results-list");
    let items_list = document.createElement("ul");

    let item = document.createElement("li");
    item.innerText = "Shoe1";
    items_list.appendChild(item);
    items.appendChild(items_list);
}

/*
var vueinst = new Vue({
    el: '#app',
    data: {
        choose: 'Choose ...',
        special: SPECIALS[0],
        show_ad: true,
        dark_mode: false,
        top_menu: [{ title:'Home',         url:'/' },
        { title:'About',        url:'/about' },
        { title:'Contact Us',   url:'/contact' }],
        c_text: 'type your comment here',
        c_arr: []
    }
});
*/