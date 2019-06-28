const readline = require('readline-sync');
const request = require('request');

export class PostCodeAPI {
    getPostcodeObjectFromAPI(postcode:string) : Promise<any>{
        // const postcode = this.getPostcode();
        return new Promise ( (resolve, reject) => {
            request(`https://api.postcodes.io/postcodes/${postcode}`, (error, response, body) => {resolve(JSON.parse(body).result);reject(error)} )
        });
    }

    getPostcode(): string {
        console.log('Please enter a valid postcode: ');
        return readline.prompt();
    }0
}

