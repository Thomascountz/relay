import React from "react";

import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

import ToneSignal from "./index";

it("renders a toneSignal with a given name", () => {
  const name = "Joy";
  const wrapper = shallow(<ToneSignal name={name} />);

  const toneSignalName = wrapper.find(".name");

  expect(toneSignalName.text()).toEqual(name);
});

it("renders adds specific class to dot for a given tone name", () => {
  const name = "Joy";
  const wrapper = shallow(<ToneSignal name={name} />);

  const toneSignaldot = wrapper.find(".dot");

  expect(toneSignaldot.hasClass("joy-tone")).toEqual(true);
});
