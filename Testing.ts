const request = require('request');

const postcode = 'NW51TL';
request(`https://api.postcodes.io/postcodes/${postcode}`, (error, response, body) => {
    console.log(error);
    console.log(body);
    this.getListOfStops(body.result);
});