import { Methods } from "./request";
import { router } from "../router";

export function controller(root: string) {
  return function (target: { new (...args: any[]): any }) {
    for (const propKey in target.prototype) {
      const path = Reflect.getMetadata("path", target.prototype, propKey);
      const method: Methods = Reflect.getMetadata(
        "method",
        target.prototype,
        propKey
      );
      const middlewares = Reflect.getMetadata(
        "middlewares",
        target.prototype,
        propKey
      );

      const handler = target.prototype[propKey];
      if (path && method) {
        const fullPath = root === "/" ? path : `${root}${path}`;
        if (middlewares) {
          router[method](fullPath, ...middlewares, handler);
        } else {
          router[method](fullPath, handler);
        }
      }
    }
  };
}
