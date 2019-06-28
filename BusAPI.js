"use strict";
exports.__esModule = true;
var request = require('request');
var moment = require('moment');
var BusAPI = /** @class */ (function () {
    function BusAPI() {
    }
    BusAPI.prototype.getBusInfoFromStopcode = function (stopcode, stationName) {
        var _this = this;
        return new Promise(function (resolve) {
            return request("https://api.tfl.gov.uk/StopPoint/" + stopcode + "/Arrivals?app_id=a4469e0c&app_key=8747fa289b54c9ff251af0d53d7cc92f", function (error, response, body) { return resolve(body); });
        }).then(function (body) {
            var parsedBusArrivalInfo = _this.get2ClosestBusesInfoAsString(body);
            return "{ \"stationName\":  \"" + stationName + "\", \"buses\":[" + parsedBusArrivalInfo + "] }";
        });
    };
    BusAPI.prototype.get2ClosestBusesInfoAsString = function (rawData) {
        var parsedData = JSON.parse(rawData).sort(function (bus1, bus2) {
            return bus1.timeToStation - bus2.timeToStation;
        }).splice(0, 5);
        return parsedData.map(function (bus) {
            return "{\"timeOfArrival\": \"" + moment().add(bus.timeToStation, 's').format('HH:mm:ss') + "\", \"destination\": \"" + bus.destinationName + "\"}";
        }).join(', ');
    };
    return BusAPI;
}());
exports.BusAPI = BusAPI;
