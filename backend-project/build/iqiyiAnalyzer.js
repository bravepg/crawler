"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio_1 = __importDefault(require("cheerio"));
var fs_1 = __importDefault(require("fs"));
var IqiyiAnalyzer = /** @class */ (function () {
    function IqiyiAnalyzer() {
    }
    IqiyiAnalyzer.prototype.analyze = function (html, filePath) {
        var videoResult = this.getVideoInfo(html);
        return this.generateJson(filePath, videoResult);
    };
    IqiyiAnalyzer.prototype.getVideoInfo = function (html) {
        var $ = cheerio_1.default.load(html);
        var videos = [];
        Array.from($(".qy-mod-li")).forEach(function (item, index) {
            if (index >= 5) {
                return;
            }
            var title = $(item).find(".title-wrap .main").text();
            var href = $(item).find(".qy-mod-link").attr("href");
            videos.push({
                title: title,
                href: href,
            });
        });
        return {
            time: new Date().getTime(),
            data: videos,
        };
    };
    IqiyiAnalyzer.prototype.generateJson = function (filePath, videoResult) {
        var fileContent = {};
        if (fs_1.default.existsSync(filePath)) {
            fileContent = JSON.parse(fs_1.default.readFileSync(filePath, "utf-8"));
        }
        fileContent[videoResult.time] = videoResult.data;
        return JSON.stringify(fileContent, null, 2);
    };
    IqiyiAnalyzer.getInstance = function () {
        return IqiyiAnalyzer.analyzer;
    };
    IqiyiAnalyzer.analyzer = new IqiyiAnalyzer();
    return IqiyiAnalyzer;
}());
exports.default = IqiyiAnalyzer;
