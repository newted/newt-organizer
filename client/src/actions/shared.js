export const REQUEST_FAILURE = "REQUEST_FAILURE";

export const requestFailure = (message, source) => {
  return {
    type: REQUEST_FAILURE,
    payload: {
      message,
      source
    }
  };
};
