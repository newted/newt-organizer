export const requestFailure = (type, message, source) => {
  return {
    type,
    payload: {
      message,
      source
    }
  };
};
