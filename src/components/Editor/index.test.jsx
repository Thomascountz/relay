import React from "react";

import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

import nativeUI from "../../nativeUI";
jest.mock("../../nativeUI");

import Editor from "./index";

describe("<Editor />", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders a textarea", () => {
    const wrapper = shallow(<Editor />);
    expect(wrapper.exists(".editorTextArea")).toEqual(true);
  });

  it("updates html when textarea is changed", () => {
    const wrapper = shallow(<Editor sentencesTones={[]} />);
    const textArea = wrapper.find(".editorTextArea");
    const newValue = "Hello, World";

    expect(wrapper.state("html")).toEqual("");

    textArea.simulate("change", { target: { html: newValue } });

    expect(wrapper.state("html")).toEqual(newValue);
  });

  it("saves html to file when save button is pressed", () => {
    const wrapper = shallow(<Editor />);
    const textareaContent = "Hello World!";
    wrapper.setState({ html: textareaContent });
    const saveButton = wrapper.find(".saveButton");

    saveButton.simulate("click");

    expect(nativeUI.promptUserToSaveContentToFile).toBeCalledWith(
      textareaContent
    );
  });

  it("updates the html to a text file's contents when open button is pressed", async () => {
    const wrapper = shallow(<Editor />);
    const openButton = wrapper.find(".openButton");
    const fileContents = "Hello, World!";

    nativeUI.promptUserToOpenFileContents = jest.fn(() => {
      return Promise.resolve(fileContents);
    });

    await openButton.simulate("click");

    expect(nativeUI.promptUserToOpenFileContents).toBeCalled();
    expect(wrapper.state("html")).toEqual(fileContents);
  });

  it("analyzes the document inside the textarea", () => {
    const handleAnalyzeClick = jest.fn();
    const wrapper = shallow(<Editor handleAnalyzeClick={handleAnalyzeClick} />);

    const analyzeButton = wrapper.find(".analyzeButton");

    const textareaContent = "Hello World!";
    wrapper.setState({ html: textareaContent });

    analyzeButton.simulate("click");

    expect(handleAnalyzeClick).toBeCalledWith(textareaContent);
  });
});
