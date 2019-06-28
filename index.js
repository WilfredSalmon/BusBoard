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
app.get('/departureBoards/:postcode', function (req, res) {
    postCodeAPI.getPostcodeObjectFromAPI(req.params.postcode)
        .then(function (postCodeObject) { return stopPointsAPI.getTwoClosestStops(postCodeObject); }, function (err) {
        throw err;
    })["catch"](function (err) { return res.send('Invalid Postcode'); })
        .then(function (twoClosestStops) { return Promise.all(twoClosestStops.map(function (stop) { return busAPI.getBusInfoFromStopcode(stop.naptanId, stop.commonName); })); })
        .then(function (busInfo) {
        res.send("[ " + busInfo.join(' , ') + "]");
    });
});
app.listen(port, function () { return console.log("BusBoard listening on port " + port + "!"); });
