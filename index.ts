import {PostCodeAPI} from './PostCodeAPI';
import {BusAPI} from './BusAPI';
import {StopPointsAPI} from './stopPointsAPI';

const express = require('express');
const app = express();
const port = 3000;

const postCodeAPI = new PostCodeAPI;
const busAPI = new BusAPI;
const stopPointsAPI = new StopPointsAPI;

// We disable this because intellij is confused
// noinspection TypeScriptValidateJSTypes
app.use(express.static('frontend'));
app.use('/stopInfo', express.static('frontend/stopInfo.html'));


app.get('/departureBoards/:input', (request, response) => {

    const inputs = request.params.input.split("&");

    postCodeAPI.getPostcodeObjectFromAPI(inputs[0])
        .then(postCodeObject => stopPointsAPI.getTwoClosestStops(postCodeObject), (err) => {
            throw err;
        })
        .catch(() => response.send('Invalid Postcode (make sure the postcode is in London'))
        .then(twoClosestStops => Promise.all(twoClosestStops.map(stop => busAPI.getBusInfoFromStopcode(stop.naptanId, stop.commonName,inputs[1]))))
        .then(busInfo => {
            response.send(`[ ${busInfo.toString()}]`);
        });
});

app.get('/next10buses/:input', (request, response) => {

    const inputs = request.params.input.split("&");

    busAPI.getBusInfoFromStopcode(inputs[0],inputs[1],10)
        .then(busInfo => {
            response.send(`[ ${busInfo.toString()}]`);
        })
});

app.listen(port, () => console.log(`BusBoard listening on port ${port}!`));




