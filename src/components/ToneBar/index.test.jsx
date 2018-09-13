import React from "react";

import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

import ToneBar from "./index";
import ToneSignal from "../ToneSignal";

it("renders seven ToneSignal's", () => {
  const wrapper = shallow(<ToneBar />);
  const toneSignals = wrapper.find(ToneSignal);
  expect(toneSignals.length).toEqual(7);
});
