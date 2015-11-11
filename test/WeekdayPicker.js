import testDom from "testdom";
import chai, { expect } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";

chai.use(sinonChai);

testDom("<html><body></body></html>");
const React = require("react");
const ReactDOM = require("react-dom");

const TestUtils = require("react-addons-test-utils");
const WeekdayPicker = require("../src/WeekdayPicker");

describe("WeekdayPicker", () => {

  it("renders", () => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<WeekdayPicker />);

    const weekdayPicker = shallowRenderer.getRenderOutput();
    expect(weekdayPicker.props.className).to.contain("WeekdayPicker");
  });

  it ('runs modifiers', () => {
    const cb = sinon.spy();
    const modifiers = {
      'weekend': cb
    };

    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<WeekdayPicker modifiers={modifiers}/>);
    expect(cb).to.have.been.callCount(7)
  });

});