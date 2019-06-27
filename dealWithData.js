"use strict";
exports.__esModule = true;
var moment = require('moment');
var DealWithData = /** @class */ (function () {
    function DealWithData() {
    }
    DealWithData.prototype.main = function (rawData) {
        var parsedData = JSON.parse(rawData).sort(function (bus1, bus2) {
            return bus1.timeToStation - bus2.timeToStation;
        }).splice(0, 5);
        var string = parsedData.map(function (bus) {
            return "The " + moment().add(bus.timeToStation, 's').format('HH:mm:ss') + " to " + bus.destinationName;
        }).join('\n');
        return string;
    };
    return DealWithData;
}());
exports.DealWithData = DealWithData;
