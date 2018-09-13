import React from "react";

import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

import ToneSignal from "./index";

it("renders a toneSignal with a given name", () => {
  const name = "joy";
  const renderedName = "Joy";
  const wrapper = shallow(<ToneSignal name={name} />);

  const toneSignalName = wrapper.find(".tone");

  expect(toneSignalName.text()).toContain(renderedName);
});

it("renders a toneSignal with a default score of zero", () => {
  const name = "joy";
  const renderedScore = "0";
  const wrapper = shallow(<ToneSignal name={name} />);

  const toneSignalName = wrapper.find(".tone");

  expect(toneSignalName.text()).toContain(renderedScore);
});

it("renders a toneSignal with a given score", () => {
  const name = "joy";
  const score = "6.0";
  const wrapper = shallow(<ToneSignal name={name} score={score} />);

  const toneSignalName = wrapper.find(".tone");

  expect(toneSignalName.text()).toContain(score);
});

it("adds specific class to dot for a given tone name when score is defined", () => {
  const name = "joy";
  const score = "6.0";
  const wrapper = shallow(<ToneSignal name={name} score={score} />);

  const toneSignaldot = wrapper.find(".dot");

  expect(toneSignaldot.hasClass("joy-dot")).toEqual(true);
});

it("does not add a specific class to dot for a given tone name when score is undefined", () => {
  const name = "joy";
  const score = undefined;
  const wrapper = shallow(<ToneSignal name={name} score={score} />);

  const toneSignaldot = wrapper.find(".dot");

  expect(toneSignaldot.hasClass("joy-dot")).toEqual(false);
});
