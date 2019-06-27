"use strict";
exports.__esModule = true;
var request = require('request');
var readline = require('readline-sync');
var dealWithData_1 = require("./dealWithData");
var dealWithData = new dealWithData_1.DealWithData();
function getValidUrl() {
    console.log('Please enter a valid bus code');
    var input = readline.prompt();
    return "https://api.tfl.gov.uk/StopPoint/" + input + "/Arrivals?app_id=a4469e0c&app_key=8747fa289b54c9ff251af0d53d7cc92f";
}
request(getValidUrl(), function (error, response, body) {
    var output = dealWithData.main(body);
    console.log(output);
});
