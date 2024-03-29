const request = require('request');
const moment = require('moment');

export class BusAPI {
    private static readonly timeOfArrivalFormat = 'HH:mm:ss';

    getBusInfoFromStopcode(stopcode: string, stationName: string,numberOfBuses: number): Promise<string> {
        return new Promise(resolve => {
                return request(`https://api.tfl.gov.uk/StopPoint/${stopcode}/Arrivals?app_id=a4469e0c&app_key=8747fa289b54c9ff251af0d53d7cc92f`, (error, response, body) => resolve(body))
            }
        ).then(body => {
                const parsedBusArrivalInfo = this.get2ClosestBusesInfoAsString(body as string, numberOfBuses);
                return `{ "stationName":  "${stationName}", "stopCode": "${stopcode}", "buses":[${parsedBusArrivalInfo}] }`;
            }
        )
    }

    get2ClosestBusesInfoAsString(rawData: string, numberOfBuses: number): string {

        const parsedData = JSON.parse(rawData).sort((bus1, bus2) => {
            return bus1.timeToStation - bus2.timeToStation
        }).splice(0, numberOfBuses);

        return parsedData.map((bus) => {
            return this.getBusResponse(bus);
        }).join(', ');
    }

    private getBusResponse(bus) {

        let timeOfArrival = moment().add(bus.timeToStation, 's').format(BusAPI.timeOfArrivalFormat);
        return `{"timeOfArrival": "${timeOfArrival}", "destination": "${bus.destinationName}", "lineNumber": "${bus.lineName}"}`;
    }
}
