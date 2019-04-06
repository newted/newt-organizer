import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./reducers";
import middleware from "./middleware";

test("renders without crashing", () => {
  const div = document.createElement("div");
  const store = createStore(reducers, {}, middleware);
  
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div
  );
});
