"use strict";
exports.__esModule = true;
var request = require('request');
var moment = require('moment');
var BusAPI = /** @class */ (function () {
    function BusAPI() {
    }
    BusAPI.prototype.getBusInfoFromStopcode = function (stopcode, stationName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return request("https://api.tfl.gov.uk/StopPoint/" + stopcode + "/Arrivals?app_id=a4469e0c&app_key=8747fa289b54c9ff251af0d53d7cc92f", function (error, response, body) { resolve(body); reject(error); });
        }).then(function (body) {
            var parsedBusArrivalInfo = _this.get2ClosestBusesInfoAsString(body);
            return "Buses from " + stationName + "\n " + parsedBusArrivalInfo;
        }, function (err) {
            throw err;
        });
    };
    BusAPI.prototype.get2ClosestBusesInfoAsString = function (rawData) {
        var parsedData = JSON.parse(rawData).sort(function (bus1, bus2) {
            return bus1.timeToStation - bus2.timeToStation;
        }).splice(0, 5);
        return parsedData.map(function (bus) {
            return "The " + moment().add(bus.timeToStation, 's').format('HH:mm:ss') + " to " + bus.destinationName;
        }).join('\n');
    };
    return BusAPI;
}());
exports.BusAPI = BusAPI;
