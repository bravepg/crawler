declare namespace API {
  interface Result<T> {
    success: boolean;
    errorMsg?: string;
    data: T;
  }

  type IsLogin = boolean;
}