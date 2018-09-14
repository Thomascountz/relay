import React from "react";

import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

import ToneBar from "./index";
import ToneSignal from "../ToneSignal";

it("renders seven ToneSignal's", () => {
  const wrapper = shallow(<ToneBar tones={[]} />);
  const toneSignals = wrapper.find(ToneSignal);
  expect(toneSignals.length).toEqual(7);
});

it("passes scores into ToneSignals via props", () => {
  const tones = [
    {
      score: 0.929634,
      tone_id: "analytical",
      tone_name: "Analytical"
    },
    {
      score: 0.601046,
      tone_id: "tentative",
      tone_name: "Tentative"
    }
  ];

  const wrapper = shallow(<ToneBar tones={tones} />);

  const analyticalToneSignal = wrapper.findWhere(
    node => node.prop("name") == "analytical"
  );

  const tentativeToneSignal = wrapper.findWhere(
    node => node.prop("name") == "tentative"
  );

  expect(analyticalToneSignal.prop("score")).toEqual("9.3");
  expect(tentativeToneSignal.prop("score")).toEqual("6.0");
});
