const request = require('request');
const moment = require('moment');

export class BusAPI {
    getBusInfoFromStopcode(stopcode: string, stationName: string): Promise<string> {
        return new Promise(resolve => {
                return request(`https://api.tfl.gov.uk/StopPoint/${stopcode}/Arrivals?app_id=a4469e0c&app_key=8747fa289b54c9ff251af0d53d7cc92f`, (error, response, body) => resolve(body))
            }
        ).then(body => {
                const parsedBusArrivalInfo = this.get2ClosestBusesInfoAsString(body as string);
                return `{ "stationName":  "${stationName}", "buses":[${parsedBusArrivalInfo}] }`;

            }
        )
    }

    get2ClosestBusesInfoAsString(rawData: string): string {
        const parsedData = JSON.parse(rawData).sort((bus1, bus2) => {
            return bus1.timeToStation - bus2.timeToStation
        }).splice(0, 5);

        return parsedData.map((bus) => {
            return `{"timeOfArrival": "${moment().add(bus.timeToStation, 's').format('HH:mm:ss')}", "destination": "${bus.destinationName}"}`;
        }).join(', ');
    }
}
