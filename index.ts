const  moment = require('moment');
const request = require('request');
import { DealWithData } from './dealWithData';
//const DealWData =  require('./dealWithData.ts')

const dealWithData = new DealWithData();

request('https://api.tfl.gov.uk/StopPoint/490008660N/Arrivals?app_id=a4469e0c&app_key=8747fa289b54c9ff251af0d53d7cc92f', function(error,response,body) {
    const output = dealWithData.main(body);
    console.log(output);
});
