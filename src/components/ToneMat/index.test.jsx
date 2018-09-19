import React from "react";

import Enzyme, { render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

import ToneMat from "./index";

describe("ToneMat", () => {
  it("renders the documentText", () => {
    const text = "Hello, World";
    const wrapper = render(<ToneMat value={text} sentencesTones={[]} />);
    expect(wrapper.text()).toEqual(text);
  });

  it("renders documentText that is not present in sentencesTones", () => {
    const text = "I love being here!I hate everything about this day!";
    const sentencesTones = [
      {
        sentence_id: 0,
        text: "I love being here!",
        tones: []
      }
    ];

    const wrapper = render(
      <ToneMat value={text} sentencesTones={sentencesTones} />
    );

    expect(wrapper.text()).toContain(text);
  });

  it("annotates sentences with the class of most prominent tone", () => {
    const text = "I hate everything about this day!";
    const sentencesTones = [
      {
        sentence_id: 0,
        text: "I hate everything about this day!",
        tones: [
          { score: 0.819448, tone_id: "anger", tone_name: "Anger" },
          { score: 0.75152, tone_id: "tentative", tone_name: "Tentative" }
        ]
      }
    ];

    const wrapper = render(
      <ToneMat value={text} sentencesTones={sentencesTones} />
    );

    expect(wrapper.find(".anger").length).toEqual(1);
    expect(wrapper.find(".tenative").length).toEqual(0);
  });

  it("does not annotate sentences that do not have tones", () => {
    const text = "I love being here!I hate everything about this day!";
    const sentencesTones = [
      {
        sentence_id: 0,
        text: "I love being here!",
        tones: []
      },
      {
        sentence_id: 1,
        text: "I hate everything about this day!",
        tones: [{ score: 0.819448, tone_id: "anger", tone_name: "Anger" }]
      }
    ];

    const wrapper = render(
      <ToneMat value={text} sentencesTones={sentencesTones} />
    );

    expect(wrapper.find("span").length).toEqual(1);
    expect(wrapper.text()).toContain(text);
  });
});

it("maintains formatting", () => {
  const text = "I love being here!/n/n  I hate everything about this day!";
  const sentencesTones = [
    {
      sentence_id: 0,
      text: "I love being here!",
      tones: []
    },
    {
      sentence_id: 1,
      text: "I hate everything about this day!",
      tones: [{ score: 0.819448, tone_id: "anger", tone_name: "Anger" }]
    }
  ];

  const wrapper = render(
    <ToneMat value={text} sentencesTones={sentencesTones} />
  );

  expect(wrapper.text()).toContain(text);
});
