import React from "react";
// Components
import ToastContent from "./ToastContent";

export function displayErrorNotification(
  toastManager,
  source,
  area,
  error,
  onRetry,
  callback
) {
  if (source === "fetch") {
    return toastManager.add(
      <ToastContent
        message={`Something went wrong, could not ${source} ${area}s.`}
        error={error}
        displayRetry={true}
        onRetry={onRetry}
      />,
      {
        appearance: "error"
      },
      // Callback to assign id to variable after adding.
      callback
    );
  } else {
    return toastManager.add(
      <ToastContent
        message={`Something went wrong, could not ${source} the ${area}.`}
        error={error}
        displayRetry={false}
      />,
      {
        appearance: "error"
      }
    );
  }
}
