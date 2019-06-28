var _this = this;
var request = require('request');
var postcode = 'NW51TL';
request("https://api.postcodes.io/postcodes/" + postcode, function (error, response, body) {
    console.log(error);
    console.log(body);
    _this.getListOfStops(body.result);
});
