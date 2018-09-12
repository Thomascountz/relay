import React from "react";

import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

import ToneSignal from "./index";

it("renders a toneSignal with a given name", () => {
  const name = "Joy";
  const wrapper = shallow(<ToneSignal name={name} />);

  const toneSignalName = wrapper.find(".tone");

  expect(toneSignalName.text()).toContain(name);
});

it("renders a toneSignal with a given score", () => {
  const name = "Joy";
  const score = "0.601046";
  const renderedScore = "6.0";
  const wrapper = shallow(<ToneSignal name={name} score={score} />);

  const toneSignalName = wrapper.find(".tone");

  expect(toneSignalName.text()).toContain(renderedScore);
});

it("adds specific class to dot for a given tone name", () => {
  const name = "Joy";
  const wrapper = shallow(<ToneSignal name={name} />);

  const toneSignaldot = wrapper.find(".dot");

  expect(toneSignaldot.hasClass("joy-dot")).toEqual(true);
});
