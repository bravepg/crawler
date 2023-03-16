import "reflect-metadata";

import { RequestHandler } from "express";

export function use(middleware: RequestHandler) {
  return function (target: any, propKey: string) {
    const middlewares: RequestHandler[] =  Reflect.getMetadata("middlewares", target, propKey) ?? [];

    middlewares.push(middleware);
    
    Reflect.defineMetadata("middlewares", middlewares, target, propKey);
  };
}
