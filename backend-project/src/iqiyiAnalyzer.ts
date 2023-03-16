import cheerio from "cheerio";
import fs from "fs";
import { Analyzer } from "./crawler";

interface VideoInfo {
  title: string;
  href: string;
}

interface VideoResult {
  time: number;
  data: VideoInfo[];
}

interface Content {
  [key: number]: VideoInfo[];
}

export default class IqiyiAnalyzer implements Analyzer {
  private static analyzer = new IqiyiAnalyzer();

  private constructor() {}

  public analyze(html: string, filePath: string) {
    const videoResult = this.getVideoInfo(html);
    return this.generateJson(filePath, videoResult);
  }

  private getVideoInfo(html: string) {
    const $ = cheerio.load(html);
    const videos: VideoInfo[] = [];
    Array.from($(".qy-mod-li")).forEach((item, index) => {
      if (index >= 5) {
        return;
      }
      const title = $(item).find(".title-wrap .main").text();
      const href = $(item).find(".qy-mod-link").attr("href")!;
      videos.push({
        title,
        href,
      });
    });

    return {
      time: new Date().getTime(),
      data: videos,
    };
  }

  private generateJson(filePath: string, videoResult: VideoResult) {
    let fileContent: Content = {};

    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }

    fileContent[videoResult.time] = videoResult.data;

    return JSON.stringify(fileContent, null, 2);
  }

  public static getInstance() {
    return IqiyiAnalyzer.analyzer;
  }
}
