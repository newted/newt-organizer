export const requestFailure = (type, message, requestType, source) => {
  return {
    type,
    payload: {
      message,
      requestType,
      source
    }
  };
};
