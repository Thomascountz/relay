import React from "react";

import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

jest.mock("../../nativeUI");
import { promptUserToSaveContentToFile } from "../../nativeUI";

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

  it("saves value to file when save button is pressed", () => {
    const wrapper = shallow(<Editor />);
    const textareaContent = "Hello World!";
    wrapper.setState({ value: textareaContent });
    const saveButton = wrapper.find(".saveButton");

    saveButton.simulate("click");

    expect(promptUserToSaveContentToFile).toBeCalledWith(textareaContent);
  });
});
