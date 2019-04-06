import React from "react";
import { shallow } from "enzyme";
import App from "./App";

test("App component renders without crashing", () => {
  shallow(<App />);
});
