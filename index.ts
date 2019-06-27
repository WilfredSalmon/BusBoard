const request = require('request');
const readline = require('readline-sync');
import {DealWithData} from './dealWithData';

const dealWithData = new DealWithData();

function getValidUrl() {
    console.log('Please enter a valid bus code');
    const input = readline.prompt();
    return `https://api.tfl.gov.uk/StopPoint/${input}/Arrivals?app_id=a4469e0c&app_key=8747fa289b54c9ff251af0d53d7cc92f`;
}

request(getValidUrl(), (error, response, body) => {
    const output = dealWithData.main(body);
    console.log(output);
});
