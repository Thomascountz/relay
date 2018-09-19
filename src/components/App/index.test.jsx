import React from "react";

import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

import Sentiment from "../../sentiment";
jest.mock("../../sentiment");

import App from "./index";

describe("<App />", () => {
  it("Runs without crashing", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toEqual(true);
  });
});

describe("this.getTones", () => {
  it("analyzes the given text", async () => {
    const wrapper = shallow(<App />);

    Sentiment.analyze = jest.fn(() => {
      return Promise.resolve();
    });

    await wrapper.instance().getTones("foo");

    expect(Sentiment.analyze).toBeCalledWith("foo");
  });
});

describe("this.handleAnalyzeClick", () => {
  it("updates state with the result of tone analysis", async () => {
    const wrapper = shallow(<App />);

    jest.spyOn(wrapper.instance(), "getTones").mockImplementation(() => {
      return Promise.resolve({
        document_tone: { tones: ["foo"] },
        sentences_tone: ["bar"]
      });
    });

    await wrapper.instance().handleAnalyzeClick("Hello, World");

    expect(wrapper.state("documentTones")).toEqual(["foo"]);
    expect(wrapper.state("sentencesTones")).toEqual(["bar"]);
  });
});
