"use strict";
exports.__esModule = true;
var PostCodeAPI_1 = require("./PostCodeAPI");
var BusAPI_1 = require("./BusAPI");
var stopPointsAPI_1 = require("./stopPointsAPI");
var express = require('express');
var app = express();
var port = 3000;
var postCodeAPI = new PostCodeAPI_1.PostCodeAPI;
var busAPI = new BusAPI_1.BusAPI;
var stopPointsAPI = new stopPointsAPI_1.StopPointsAPI;
// We disable this because intellij is confused
// noinspection TypeScriptValidateJSTypes
app.use(express.static('frontend'));
app.use('/stopInfo', express.static('frontend/stopInfo.html'));
app.get('/departureBoards/:input', function (request, response) {
    var inputs = request.params.input.split("&");
    postCodeAPI.getPostcodeObjectFromAPI(inputs[0])
        .then(function (postCodeObject) { return stopPointsAPI.getTwoClosestStops(postCodeObject); }, function (err) {
        throw err;
    })["catch"](function () { return response.send('Invalid Postcode (make sure the postcode is in London'); })
        .then(function (twoClosestStops) { return Promise.all(twoClosestStops.map(function (stop) { return busAPI.getBusInfoFromStopcode(stop.naptanId, stop.commonName, inputs[1]); })); })
        .then(function (busInfo) {
        response.send("[ " + busInfo.toString() + "]");
    });
});
app.get('/next10buses/:input', function (request, response) {
    var inputs = request.params.input.split("&");
    busAPI.getBusInfoFromStopcode(inputs[0], inputs[1], 10)
        .then(function (busInfo) {
        response.send("[ " + busInfo.toString() + "]");
    });
});
app.listen(port, function () { return console.log("BusBoard listening on port " + port + "!"); });
