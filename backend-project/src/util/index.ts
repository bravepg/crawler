export const getResponseData = <T>(data: T, errorMsg?: string): API.Result<T> => {
  if (errorMsg) {
    return {
      success: false,
      errorMsg,
      data,
    };
  }
  return {
    success: true,
    data,
  };
};
