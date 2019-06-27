"use strict";
exports.__esModule = true;
var request = require('request');
var dealWithData_1 = require("./dealWithData");
//const DealWData =  require('./dealWithData.ts')
var dealWithData = new dealWithData_1.DealWithData();
request('https://api.tfl.gov.uk/StopPoint/490008660N/Arrivals?app_id=a4469e0c&app_key=8747fa289b54c9ff251af0d53d7cc92f', function (error, response, body) {
    var output = dealWithData.main(body);
    console.log(output);
});
