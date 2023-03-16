"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = void 0;
require("reflect-metadata");
function use(middleware) {
    return function (target, propKey) {
        var _a;
        var middlewares = (_a = Reflect.getMetadata("middlewares", target, propKey)) !== null && _a !== void 0 ? _a : [];
        middlewares.push(middleware);
        Reflect.defineMetadata("middlewares", middlewares, target, propKey);
    };
}
exports.use = use;
