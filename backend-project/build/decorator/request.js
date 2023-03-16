"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = exports.get = exports.Methods = void 0;
require("reflect-metadata");
var Methods;
(function (Methods) {
    Methods["GET"] = "get";
    Methods["POST"] = "post";
})(Methods = exports.Methods || (exports.Methods = {}));
function requestFactory(type) {
    return function (path) {
        return function (target, propKey) {
            Reflect.defineMetadata("path", path, target, propKey);
            Reflect.defineMetadata("method", type, target, propKey);
        };
    };
}
exports.get = requestFactory(Methods.GET);
exports.post = requestFactory(Methods.POST);
