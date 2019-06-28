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
        }).catch( err => res.send('Invalid Postcode') )
        .then(twoClosestStops => Promise.all(twoClosestStops.map(stop => busAPI.getBusInfoFromStopcode(stop.naptanId, stop.commonName))))
        .then(busInfo => {
            res.send( `[ ${busInfo.join(' , ')}]`);
        });
});

app.listen(port, () => console.log(`BusBoard listening on port ${port}!`));




