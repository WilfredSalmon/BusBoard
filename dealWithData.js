"use strict";
exports.__esModule = true;
var DealWithData = /** @class */ (function () {
    function DealWithData() {
    }
    DealWithData.prototype.main = function (rawData) {
        var parsedData = JSON.parse(rawData);
        return parsedData;
    };
    return DealWithData;
}());
exports.DealWithData = DealWithData;
