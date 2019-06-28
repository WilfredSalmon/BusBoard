const request = require('request');
const moment = require('moment');

export class BusAPI {
    getBusInfoFromStopcode(stopcode: string, stationName: string): Promise<string> {
        return new Promise((resolve,reject) => {
                return request(`https://api.tfl.gov.uk/StopPoint/${stopcode}/Arrivals?app_id=a4469e0c&app_key=8747fa289b54c9ff251af0d53d7cc92f`, (error, response, body) => {resolve(body);reject(error);})
            }
        ).then(body => {
            const parsedBusArrivalInfo = this.get2ClosestBusesInfoAsString(body as string);
            return `Buses from ${stationName}\n${parsedBusArrivalInfo}`;
        }, err => {
            throw err;
        });
    }

    get2ClosestBusesInfoAsString(rawData: string): string {
        const parsedData = JSON.parse(rawData).sort((bus1, bus2) => {
            return bus1.timeToStation - bus2.timeToStation
        }).splice(0, 5);

        return parsedData.map((bus) => {
            return `The ${moment().add(bus.timeToStation, 's').format('HH:mm:ss')} to ${bus.destinationName}`;
        }).join('\n');
    }
}
