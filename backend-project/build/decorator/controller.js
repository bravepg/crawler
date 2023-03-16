"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
var router_1 = require("../router");
function controller(root) {
    return function (target) {
        for (var propKey in target.prototype) {
            var path = Reflect.getMetadata("path", target.prototype, propKey);
            var method = Reflect.getMetadata("method", target.prototype, propKey);
            var middlewares = Reflect.getMetadata("middlewares", target.prototype, propKey);
            var handler = target.prototype[propKey];
            if (path && method) {
                var fullPath = root === "/" ? path : "".concat(root).concat(path);
                if (middlewares) {
                    router_1.router[method].apply(router_1.router, __spreadArray(__spreadArray([fullPath], middlewares, false), [handler], false));
                }
                else {
                    router_1.router[method](fullPath, handler);
                }
            }
        }
    };
}
exports.controller = controller;
