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
app.get('/departureBoards/:postcode', (request, response) => {
    postCodeAPI.getPostcodeObjectFromAPI(request.params.postcode)
        .then(postCodeObject => stopPointsAPI.getTwoClosestStops(postCodeObject), (err) => {
            throw err;
        })
        .catch(() => response.send('Invalid Postcode (make sure the postcode is in London'))
        .then(twoClosestStops => Promise.all(twoClosestStops.map(stop => busAPI.getBusInfoFromStopcode(stop.naptanId, stop.commonName))))
        .then(busInfo => {
            response.send(`[ ${busInfo.toString()}]`);
        });
});

app.listen(port, () => console.log(`BusBoard listening on port ${port}!`));




