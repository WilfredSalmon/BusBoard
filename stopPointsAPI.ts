import {PostcodeResponse} from "./PostCodeAPI";

const request = require('request');

function getFirstTwoStops(listOfStopsObject) {
    return listOfStopsObject.stopPoints.sort((stop1, stop2) => {
        return stop1.distance - stop2.distance;
    }).splice(0, 2);
}

export class StopPointsAPI {
    getListOfStops(postCodeObject): Promise<any> {
        const lat = postCodeObject.latitude;
        const lon = postCodeObject.longitude;

        const url = this.getStopsUrl(lat, lon);

        return new Promise((resolve, reject) => {
            request(url, (error, response, body) => {
                resolve(JSON.parse(body));
                reject(error)
            })
        });
    }

    getTwoClosestStops(postCodeObject:PostcodeResponse): Promise<any> {
        return this.getListOfStops(postCodeObject)
            .then(listOfStopsObject => {
                return new Promise(resolve => resolve(getFirstTwoStops(listOfStopsObject)))
            });
    }

    getStopsUrl(lat, lon) {
        return `https://api-nile.tfl.gov.uk/StopPoint?stopTypes=NaptanBusCoachStation%2CNaptanBusWayPoint%2CNaptanOnstreetBusCoachStopCluster%2CNaptanOnstreetBusCoachStopPair%2CNaptanPrivateBusCoachTram%2CNaptanPublicBusCoachTram&radius=1000&useStopPointHierarchy=false&modes=bus&returnLines=false&lat=${lat}&lon=${lon}&app_id=a4469e0c&app_key=8747fa289b54c9ff251af0d53d7cc92f`;
    }
}
