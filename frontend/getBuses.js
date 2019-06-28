function getHtmlFromBusInfo(busInfo) {
    return busInfo.map(function(stop) {

        return "<h1>" + stop.stationName + "</h1><ul>" + stop.buses.map( function(bus) {
            return "<li>" + bus.timeOfArrival + ", " + bus.lineNumber + " to "+ bus.destination +"</li>";
        }).join("<br>") + "<br></ul>";


    }).join("");
}


const urlParams = new URLSearchParams(window.location.search);
const stopCode = urlParams.get('stopPoint');
const stopName = urlParams.get('stopName');

var xhttp = new XMLHttpRequest();

var departureBoardsBaseUrl = 'http://localhost:3000/next10buses/';
xhttp.open('GET', departureBoardsBaseUrl + stopCode +'&' + stopName, true);

xhttp.setRequestHeader('Content-Type', 'application/json');

xhttp.onload = function() {
    var busInfo = JSON.parse(xhttp.responseText);
    document.getElementById('results').innerHTML = getHtmlFromBusInfo(busInfo);
    //console.log(getHtmlFromBusInfo(busInfo));
    console.log(xhttp.responseText);
};

xhttp.send();
