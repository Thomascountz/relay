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

  it("saves value to file when save button is pressed", () => {
    const handleSaveClick = jest.fn();
    const wrapper = shallow(<Editor handleSaveClick={handleSaveClick} />);
    const saveButton = wrapper.find(".saveButton");

    saveButton.simulate("click");

    expect(handleSaveClick).toBeCalled();
  });

  it("opens a file when the button is pressed", () => {
    const handleOpenClick = jest.fn();
    const wrapper = shallow(<Editor handleOpenClick={handleOpenClick} />);
    const openButton = wrapper.find(".openButton");

    openButton.simulate("click");

    expect(handleOpenClick).toBeCalled();
  });

  it("analyzes the document inside the textarea", () => {
    const handleAnalyzeClick = jest.fn();
    const wrapper = shallow(<Editor handleAnalyzeClick={handleAnalyzeClick} />);

    const analyzeButton = wrapper.find(".analyzeButton");

    analyzeButton.simulate("click");

    expect(handleAnalyzeClick).toBeCalled();
  });
});
