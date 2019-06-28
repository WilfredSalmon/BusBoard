function main() {

    var postcode = document.getElementById("postcode").value;
    console.log('http://localhost:3000/departureBoards/'+postcode);

    var xhttp = new XMLHttpRequest();

    xhttp.open('GET', 'http://localhost:3000/departureBoards/'+postcode, true);

    xhttp.setRequestHeader('Content-Type', 'application/json');

    xhttp.onload = function() {
        var busInfo = JSON.parse(xhttp.responseText);

        document.getElementById('results').innterHTML =
            '<h2>Results</h2>' +
            '<h3>Examples stop 1</h3>'+
            '<ul>'+
            '<li>2 minutes: 123 to Example Street</li>'+
            '<li>3 minutes: 456 to Fantasy Land</li>'+
            '</ul>'+
            '<h3>Examples stop 2</h3>'+
            '<ul>'+
            '<li>1 minute: 123 to Example Street</li>'+
            '<li>4 minutes: 456 to Fantasy Land</li>'+
            '</ul>'
        console.log(xhttp.responseText)
    };

    xhttp.send();
}