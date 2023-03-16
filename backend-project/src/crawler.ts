import fs from "fs";
import path from "path";
import superagent from "superagent";

export interface Analyzer {
  analyze: (html: string, filePath: string) => string;
}

class Crawler {
  private filePath = path.resolve(__dirname, "../data/videos.json");

  constructor(private url: string, private analyzer: Analyzer) {
    this.initCrawler();
  }

  private async initCrawler() {
    const html = await this.getRawHtml();
    const content = this.analyzer.analyze(html, this.filePath);
    this.writeFile(content);
  }

  private async getRawHtml() {
    const result = await superagent.get(this.url);
    return result.text;
  }

  private writeFile(content: string) {
    fs.writeFileSync(this.filePath, content);
  }
}

export default Crawler;
