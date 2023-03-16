import fs from "fs";
import path from "path";
import { Request, Response, NextFunction } from "express";
import Crawler from "../crawler";
import IqiyiAnalyzer from "../iqiyiAnalyzer";
import { controller, get, use } from "../decorator/index";
import { getResponseData } from "../util/index";

const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  console.log("checkLogin middleware");
  const isLogin = req.session?.login;
  if (isLogin) {
    // 加上 return 就可以防止报错
    // Cannot set headers after they are sent to the client
    return next();
  }

  return res.json(getResponseData(null, "请先登录"));
};

const test = (req: Request, res: Response, next: NextFunction) => {
  console.log("test middleware");
  next();
};

@controller("/")
export class CrawlerController {
  @get("/getData")
  @use(checkLogin)
  getData(req: Request, res: Response) {
    const url = "https://www.iqiyi.com/";
    const analyzer = IqiyiAnalyzer.getInstance();
    new Crawler(url, analyzer);
    return res.json(getResponseData(true));
  }

  @get("/showData")
  @use(checkLogin)
  @use(test)
  showData(req: Request, res: Response) {
    try {
      const filePath = path.resolve(__dirname, "../../data/videos.json");
      const result = fs.readFileSync(filePath, "utf-8");
      return res.json(getResponseData(JSON.parse(result)));
    } catch (e) {
      return res.json(getResponseData(null, "暂无数据"));
    }
  }
}
