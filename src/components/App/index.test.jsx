import React from "react";

import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

import nativeUI from "../../nativeUI";
jest.mock("../../nativeUI");

import Sentiment from "../../sentiment";
jest.mock("../../sentiment");

import App from "./index";

describe("<App />", () => {
  it("Runs without crashing", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toEqual(true);
  });
});

describe("handleChange", () => {
  it("updates state with the value of the Editor", () => {
    const newValue = "foo";
    const event = { currentTarget: { value: newValue } };
    const wrapper = shallow(<App />);

    wrapper.instance().handleChange(event);

    expect(wrapper.state("documentText")).toEqual(newValue);
  });
});

describe("handleSaveClick", () => {
  it("prompts user to save value to file", () => {
    const wrapper = shallow(<App />);
    const documentText = "Hello, World";
    wrapper.setState({ documentText: documentText });

    wrapper.instance().handleSaveClick();

    expect(nativeUI.promptUserToSaveContentToFile).toBeCalledWith(documentText);
  });
});

describe("handleOpenClick", () => {
  it("updates the documentText with a text file's contents", async () => {
    const wrapper = shallow(<App />);
    const fileContents = "Hello, World!";

    nativeUI.promptUserToOpenFileContents = jest.fn(() => {
      return Promise.resolve(fileContents);
    });

    await wrapper.instance().handleOpenClick();

    expect(nativeUI.promptUserToOpenFileContents).toBeCalled();
    expect(wrapper.state("documentText")).toEqual(fileContents);
  });
});

describe("handleAnalyzeClick", () => {
  it("updates state with the result of tone analysis of documentText", async () => {
    const wrapper = shallow(<App />);
    const documentText = "Hello, World";
    wrapper.setState({ documentText: documentText });

    Sentiment.analyze = jest.fn(() => {
      return Promise.resolve({
        document_tone: { tones: ["foo"] },
        sentences_tone: ["bar"]
      });
    });

    await wrapper.instance().handleAnalyzeClick();

    expect(Sentiment.analyze).toBeCalledWith(documentText);
    expect(wrapper.state("documentTones")).toEqual(["foo"]);
    expect(wrapper.state("sentencesTones")).toEqual(["bar"]);
  });
});
