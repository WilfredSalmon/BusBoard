const moment = require('moment');

export class DealWithData {

    main(rawData: string): string {

        const parsedData = JSON.parse(rawData).sort((bus1, bus2) => {
            return bus1.timeToStation - bus2.timeToStation
        }).splice(0, 5);

        const string = parsedData.map((bus) => {
            return `The ${moment().add(bus.timeToStation, 's').format('HH:mm:ss')} to ${bus.destinationName}`;
        }).join('\n');

        return string;
    }
}
