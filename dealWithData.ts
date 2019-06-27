export  class DealWithData {

    main(rawData: string) : string {
        const parsedData = JSON.parse(rawData);
        return parsedData;
    }
}
