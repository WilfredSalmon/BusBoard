"use strict";
exports.__esModule = true;
var request = require('request');
function getFirstTwoStops(listOfStopsObject) {
    return listOfStopsObject.stopPoints.sort(function (stop1, stop2) {
        return stop1.distance - stop2.distance;
    }).splice(0, 2);
}
var StopPointsAPI = /** @class */ (function () {
    function StopPointsAPI() {
    }
    StopPointsAPI.prototype.getListOfStops = function (postCodeObject) {
        var lat = postCodeObject.latitude;
        var lon = postCodeObject.longitude;
        var url = this.getStopsUrl(lat, lon);
        return new Promise(function (resolve, reject) {
            request(url, function (error, response, body) {
                resolve(JSON.parse(body));
                reject(error);
            });
        });
    };
    StopPointsAPI.prototype.getTwoClosestStops = function (postCodeObject) {
        return this.getListOfStops(postCodeObject)
            .then(function (listOfStopsObject) {
            return new Promise(function (resolve) { return resolve(getFirstTwoStops(listOfStopsObject)); });
        });
    };
    StopPointsAPI.prototype.getStopsUrl = function (lat, lon) {
        return "https://api-nile.tfl.gov.uk/StopPoint?stopTypes=NaptanBusCoachStation%2CNaptanBusWayPoint%2CNaptanOnstreetBusCoachStopCluster%2CNaptanOnstreetBusCoachStopPair%2CNaptanPrivateBusCoachTram%2CNaptanPublicBusCoachTram&radius=1000&useStopPointHierarchy=false&modes=bus&returnLines=false&lat=" + lat + "&lon=" + lon + "&app_id=a4469e0c&app_key=8747fa289b54c9ff251af0d53d7cc92f";
    };
    return StopPointsAPI;
}());
exports.StopPointsAPI = StopPointsAPI;
