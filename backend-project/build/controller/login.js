"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
var index_1 = require("../decorator/index");
var index_2 = require("../util/index");
var LoginController = /** @class */ (function () {
    function LoginController() {
    }
    LoginController.prototype.home = function (req, res) {
        var _a;
        var isLogin = (_a = req.session) === null || _a === void 0 ? void 0 : _a.login;
        if (isLogin) {
            return res.send("\n      <html>\n        <body>\n          <a href=\"/getData\">\u722C\u53D6\u5185\u5BB9</a>\n          <a href=\"/showData\">\u663E\u793A\u5185\u5BB9</a>\n          <a href=\"/logout\">\u9000\u51FA</a>\n        </body>\n      </html>\n    ");
        }
        return res.send("\n    <html>\n      <body>\n        <form method=\"post\" action=\"/login\">\n          <input type=\"password\" name=\"password\" />\n          <button>\u63D0\u4EA4</button>\n        </form>\n      </body>\n    </html>\n  ");
    };
    LoginController.prototype.isLogin = function (req, res) {
        var _a;
        var isLogin = (_a = req.session) === null || _a === void 0 ? void 0 : _a.login;
        return res.json((0, index_2.getResponseData)(isLogin));
    };
    LoginController.prototype.login = function (req, res) {
        var _a, _b;
        var password = (_a = req.body) === null || _a === void 0 ? void 0 : _a.password;
        var session = (_b = req.session) !== null && _b !== void 0 ? _b : {};
        if (session.login) {
            return res.json((0, index_2.getResponseData)(null, "已经登陆"));
        }
        if (password === "123") {
            session.login = true;
            return res.json((0, index_2.getResponseData)(true));
        }
        return res.json((0, index_2.getResponseData)(null, "登陆失败"));
    };
    LoginController.prototype.logout = function (req, res) {
        var _a;
        var session = (_a = req.session) !== null && _a !== void 0 ? _a : {};
        if (session.login) {
            session.login = undefined;
        }
        return res.json((0, index_2.getResponseData)(true));
    };
    __decorate([
        (0, index_1.get)("/"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "home", null);
    __decorate([
        (0, index_1.get)("/isLogin"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "isLogin", null);
    __decorate([
        (0, index_1.post)("/login"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "login", null);
    __decorate([
        (0, index_1.get)("/logout"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "logout", null);
    LoginController = __decorate([
        (0, index_1.controller)("/api")
    ], LoginController);
    return LoginController;
}());
exports.LoginController = LoginController;
