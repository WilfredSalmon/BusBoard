function getHtmlFromBusInfo(busInfo) {
    return "<h2>Results</h2>" + busInfo.map(function(stop) {

        return "<h3>From " + stop.stationName + "</h3><ul>" + stop.buses.map( function(bus) {
            return "<li>" + bus.timeOfArrival + ", " + bus.lineNumber + " to "+ bus.destination +"</li>";
        }).join("<br>") + "<br></ul>";


    }).join("");
}

function main() {

    const InvalidPostcodeErrorMessage = 'Invalid Postcode (make sure the postcode is in London';

    var postcode = document.getElementById("postcode").value;

    var xhttp = new XMLHttpRequest();

    var departureBoardsBaseUrl = 'http://localhost:3000/departureBoards/';
    xhttp.open('GET', departureBoardsBaseUrl + postcode, true);

    xhttp.setRequestHeader('Content-Type', 'application/json');

    xhttp.onload = function() {


        if (xhttp.responseText === InvalidPostcodeErrorMessage) {
            document.getElementById('results').innerHTML = '<h2>Invalid Postcode (make sure the postcode is in London)</h2>'
        } else {
            var busInfo = JSON.parse(xhttp.responseText);
            document.getElementById('results').innerHTML = getHtmlFromBusInfo(busInfo);
        }
        console.log(xhttp.responseText);
    };

    xhttp.send();
}