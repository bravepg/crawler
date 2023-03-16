"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResponseData = void 0;
var getResponseData = function (data, errorMsg) {
    if (errorMsg) {
        return {
            success: false,
            errorMsg: errorMsg,
            data: data,
        };
    }
    return {
        success: true,
        data: data,
    };
};
exports.getResponseData = getResponseData;
