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
  it("prompts user to save the app's state to file", () => {
    const wrapper = shallow(<App />);
    const saveButton = wrapper.find(".saveButton");
    const documentText = "Hello, World";
    const documentTones = ["foo"];
    const sentencesTones = ["bar"];
    wrapper.setState({ documentText, documentTones, sentencesTones });

    saveButton.simulate("click");

    const json =
      '{"documentText":"Hello, World","documentTones":["foo"],"sentencesTones":["bar"]}';

    expect(nativeUI.promptUserToSaveContentToFile).toBeCalledWith(json);
  });
});

describe("handleOpenClick", () => {
  it("updates the app's state with a relay file's contents", async () => {
    const wrapper = shallow(<App />);
    const openButton = wrapper.find(".openButton");
    const fileContents =
      '{"documentText":"Hello, World","documentTones":["foo"],"sentencesTones":["bar"]}';

    nativeUI.promptUserToOpenFileContents = jest.fn(() => {
      return Promise.resolve(fileContents);
    });

    await openButton.simulate("click");

    expect(wrapper.state("documentText")).toEqual("Hello, World");
    expect(wrapper.state("documentTones")).toEqual(["foo"]);
    expect(wrapper.state("sentencesTones")).toEqual(["bar"]);
  });

  it("updates the app's documentText with a text file's contents", async () => {
    const wrapper = shallow(<App />);
    const openButton = wrapper.find(".openButton");
    const fileContents = "Hello, World";

    nativeUI.promptUserToOpenFileContents = jest.fn(() => {
      return Promise.resolve(fileContents);
    });

    await openButton.simulate("click");

    expect(wrapper.state("documentText")).toEqual("Hello, World");
  });
});

describe("handleAnalyzeClick", () => {
  it("updates state with the result of tone analysis of documentText", async () => {
    const wrapper = shallow(<App />);
    const analyzeButton = wrapper.find(".analyzeButton");
    const documentText = "Hello, World";
    wrapper.setState({ documentText: documentText });

    Sentiment.analyze = jest.fn(() => {
      return Promise.resolve({
        document_tone: { tones: ["foo"] },
        sentences_tone: ["bar"]
      });
    });

    await analyzeButton.simulate("click");

    expect(Sentiment.analyze).toBeCalledWith(documentText);
    expect(wrapper.state("documentTones")).toEqual(["foo"]);
    expect(wrapper.state("sentencesTones")).toEqual(["bar"]);
  });

  describe("toJSON", () => {
    it("turns the app state into a JSON string", () => {
      const documentText = "Hello, World";
      const documentTones = [
        { score: 0.855276, tone_id: "joy", tone_name: "Joy" }
      ];
      const sentencesTones = [
        {
          sentence_id: 0,
          text: "Hello, World",
          tones: [{ score: 0.819448, tone_id: "joy", tone_name: "Joy" }]
        }
      ];

      const wrapper = shallow(<App />);
      wrapper.setState({ documentText, documentTones, sentencesTones });

      const result = wrapper.instance().toJSON();
      const expected =
        '{"documentText":"Hello, World","documentTones":[{"score":0.855276,"tone_id":"joy","tone_name":"Joy"}],"sentencesTones":[{"sentence_id":0,"text":"Hello, World","tones":[{"score":0.819448,"tone_id":"joy","tone_name":"Joy"}]}]}';

      expect(result).toEqual(expected);
    });
  });
});
