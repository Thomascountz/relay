import React from "react";

import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

import Editor from "./index";

describe("<Editor />", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders a textarea", () => {
    const wrapper = shallow(<Editor />);
    expect(wrapper.exists(".editorTextArea")).toEqual(true);
  });

  it("updates value when textarea is changed", () => {
    const handleChange = jest.fn();
    const wrapper = shallow(<Editor value="" handleChange={handleChange} />);
    const newValue = "Hello, World";
    const event = { currentTarget: { value: newValue } };
    const textArea = wrapper.find(".editorTextArea");

    textArea.simulate("change", event);

    expect(handleChange).toBeCalledWith(event);
  });
});
