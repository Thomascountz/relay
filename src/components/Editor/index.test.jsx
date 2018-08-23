import React from "react";

import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

import Editor from "./index";

describe("<Editor />", () => {
  it("renders a textarea", () => {
    const wrapper = shallow(<Editor />);
    expect(wrapper.exists(".editorTextArea")).toEqual(true);
  });

  it("updates value when textarea is changed", () => {
    const wrapper = shallow(<Editor />);
    const textArea = wrapper.find(".editorTextArea");
    const newValue = "Hello, World";

    expect(wrapper.state("value")).toEqual("");

    textArea.simulate("change", { currentTarget: { value: newValue } });

    expect(wrapper.state("value")).toEqual(newValue);
  });

  it("saves value to file when button is pressed", () => {
    const native_ui = require("../../native_ui");
    const promptUserToSaveContentToFile = jest.fn();
    native_ui.promptUserToSaveContentToFile = promptUserToSaveContentToFile;

    const wrapper = shallow(<Editor />);
    const saveButton = wrapper.find(".saveButton");

    saveButton.simulate("click");

    expect(promptUserToSaveContentToFile).toBeCalledWith("");
  });
});
