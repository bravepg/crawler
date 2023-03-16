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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrawlerController = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var crawler_1 = __importDefault(require("../crawler"));
var iqiyiAnalyzer_1 = __importDefault(require("../iqiyiAnalyzer"));
var index_1 = require("../decorator/index");
var index_2 = require("../util/index");
var checkLogin = function (req, res, next) {
    var _a;
    console.log("checkLogin middleware");
    var isLogin = (_a = req.session) === null || _a === void 0 ? void 0 : _a.login;
    if (isLogin) {
        // 加上 return 就可以防止报错
        // Cannot set headers after they are sent to the client
        return next();
    }
    return res.json((0, index_2.getResponseData)(null, "请先登录"));
};
var test = function (req, res, next) {
    console.log("test middleware");
    next();
};
var CrawlerController = /** @class */ (function () {
    function CrawlerController() {
    }
    CrawlerController.prototype.getData = function (req, res) {
        var url = "https://www.iqiyi.com/";
        var analyzer = iqiyiAnalyzer_1.default.getInstance();
        new crawler_1.default(url, analyzer);
        return res.json((0, index_2.getResponseData)(true));
    };
    CrawlerController.prototype.showData = function (req, res) {
        try {
            var filePath = path_1.default.resolve(__dirname, "../../data/videos.json");
            var result = fs_1.default.readFileSync(filePath, "utf-8");
            return res.json((0, index_2.getResponseData)(JSON.parse(result)));
        }
        catch (e) {
            return res.json((0, index_2.getResponseData)(null, "暂无数据"));
        }
    };
    __decorate([
        (0, index_1.get)("/getData"),
        (0, index_1.use)(checkLogin),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CrawlerController.prototype, "getData", null);
    __decorate([
        (0, index_1.get)("/showData"),
        (0, index_1.use)(checkLogin),
        (0, index_1.use)(test),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CrawlerController.prototype, "showData", null);
    CrawlerController = __decorate([
        (0, index_1.controller)("/")
    ], CrawlerController);
    return CrawlerController;
}());
exports.CrawlerController = CrawlerController;
