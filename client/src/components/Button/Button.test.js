import React from "react";
import { shallow } from "enzyme";
import Button from "./index";

test("renders without crashing", () => {
  shallow(
    <Button onClick={jest.fn()} category="primary">
      Submit
    </Button>
  );
});

test("gets correct text from children", () => {
  const button = shallow(
    <Button onClick={jest.fn()} category="primary">
      Submit
    </Button>
  );

  expect(button.find("button").text()).toBe("Submit");
});

describe("Button categories", () => {
  const classCategories = {
    primary: "primaryBtn",
    success: "successBtn",
    danger: "dangerBtn"
  };
  const categories = Object.keys(classCategories);

  categories.forEach(category => {
    test(`setting category prop as ${category} selects corresponding class`, () => {
      const button = shallow(
        <Button onClick={jest.fn()} category={category}>
          Submit
        </Button>
      );

      expect(button.hasClass(classCategories[category])).toBeTruthy();
    });
  });
});

describe("Button types", () => {
  test("default button type is 'button'", () => {
    const button = shallow(<Button>Submit</Button>);
    expect(button.type()).toBe("button");
  });

  test("button type prop works for type of 'submit'", () => {
    const button = shallow(<Button type="submit">Submit</Button>);
    expect(button.find('button[type="submit"]')).toHaveLength(1);
  });
});

test("prop of additionalClass adds that class", () => {
  const button = shallow(<Button additionalClass="githubBtn">Submit</Button>);
  expect(button.hasClass("githubBtn"));
});

test("prop of style adds that style", () => {
  const button = shallow(<Button style={{ width: "125px" }}>Submit</Button>);
  expect(button.find("button").prop("style")).toHaveProperty("width", "125px");
});
