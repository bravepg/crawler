import "reflect-metadata";

export enum Methods {
  GET = "get",
  POST = "post",
}

function requestFactory(type: Methods) {
  return function (path: string) {
    return function (target: any, propKey: string) {
      Reflect.defineMetadata("path", path, target, propKey);
      Reflect.defineMetadata("method", type, target, propKey);
    };
  };
}

export const get = requestFactory(Methods.GET);
export const post = requestFactory(Methods.POST);
