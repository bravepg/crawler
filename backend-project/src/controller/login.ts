import { Request, Response } from "express";
import { controller, get, post } from "../decorator/index";
import { getResponseData } from "../util/index";

@controller("/api")
export class LoginController {
  @get("/")
  home(req: Request, res: Response) {
    const isLogin = req.session?.login;
    if (isLogin) {
      return res.send(`
      <html>
        <body>
          <a href="/getData">爬取内容</a>
          <a href="/showData">显示内容</a>
          <a href="/logout">退出</a>
        </body>
      </html>
    `);
    }
    return res.send(`
    <html>
      <body>
        <form method="post" action="/login">
          <input type="password" name="password" />
          <button>提交</button>
        </form>
      </body>
    </html>
  `);
  }

  @get("/isLogin")
  isLogin(req: Request, res: Response) {
    const isLogin: boolean = req.session?.login;
    return res.json(getResponseData<API.IsLogin>(isLogin));
  }

  @post("/login")
  login(req: Request, res: Response) {
    const password = req.body?.password;
    const session = req.session ?? {};

    if (session.login) {
      return res.json(getResponseData(null, "已经登陆"));
    }

    if (password === "123") {
      session.login = true;
      return res.json(getResponseData(true));
    }

    return res.json(getResponseData(null, "登陆失败"));
  }

  @get("/logout")
  logout(req: Request, res: Response) {
    const session = req.session ?? {};

    if (session.login) {
      session.login = undefined;
    }

    return res.json(getResponseData(true));
  }
}
