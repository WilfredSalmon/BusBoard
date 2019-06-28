import { PostCodeAPI } from './PostCodeAPI';
import { BusAPI } from './BusAPI';
import { StopPointsAPI } from './stopPointsAPI';

const express = require('express');
const app = express();
const port = 3000;

const postCodeAPI = new PostCodeAPI;
const busAPI = new BusAPI;
const stopPointsAPI = new StopPointsAPI;


app.get('/departureBoards/:postcode', (req,res) => {
    postCodeAPI.getPostcodeObjectFromAPI(req.params.postcode)
        .then(postCodeObject => stopPointsAPI.getTwoClosestStops(postCodeObject), (err) => {
            throw err;
        })
        .then(twoClosestStops => Promise.all(twoClosestStops.map(stop => busAPI.getBusInfoFromStopcode(stop.naptanId, stop.commonName))))
        .then(busInfo => {
            console.log(busInfo.join('\n =============================== \n'));
            res.send( busInfo.join('\n =============================== \n'));
        });
});

app.listen(port, () => console.log(`BusBoard listening on port ${port}!`));




