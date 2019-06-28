"use strict";
exports.__esModule = true;
var readline = require('readline-sync');
var request = require('request');
var PostCodeAPI = /** @class */ (function () {
    function PostCodeAPI() {
    }
    PostCodeAPI.prototype.getPostcodeObjectFromAPI = function (postcode) {
        // const postcode = this.getPostcode();
        return new Promise(function (resolve, reject) {
            request("https://api.postcodes.io/postcodes/" + postcode, function (error, response, body) {
                resolve(JSON.parse(body).result);
                reject(error);
            });
        });
    };
    PostCodeAPI.prototype.getPostcode = function () {
        console.log('Please enter a valid postcode: ');
        return readline.prompt();
    };
    return PostCodeAPI;
}());
exports.PostCodeAPI = PostCodeAPI;
