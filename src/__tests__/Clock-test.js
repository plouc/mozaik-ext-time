jest.dontMock('./../components/Clock.jsx');
jest.dontMock('react-classset');
jest.dontMock('d3/d3');
jest.dontMock('moment');
jest.dontMock('moment-timezone');

jest.setMock('mozaik/browser', {
    Mixin: { ApiConsumer: null }
});

var React, TestUtils, Clock, clock;

describe('Time — Clock', function () {

    beforeEach(function () {
        React     = require('react/addons');
        TestUtils = React.addons.TestUtils;
        Clock     = require('./../components/Clock.jsx');
    });


    it('should not display info when none given', function () {
        clock = TestUtils.renderIntoDocument(<Clock />);
        var info = TestUtils.findRenderedDOMComponentWithClass(clock, 'time__clock__info');
        expect(info.getDOMNode().textContent).toEqual('');
    });


    it('should display given info text when provided', function () {
        clock = TestUtils.renderIntoDocument(<Clock info="mozaïk" />);
        var info = TestUtils.findRenderedDOMComponentWithClass(clock, 'time__clock__info');
        expect(info.getDOMNode().textContent).toEqual('mozaïk');
    });


    it('should display timezone when info set to `timezone`', function () {
        clock = TestUtils.renderIntoDocument(<Clock info="timezone" timezone="America/Los_Angeles" />);
        var info = TestUtils.findRenderedDOMComponentWithClass(clock, 'time__clock__info');
        expect(info.getDOMNode().textContent).toEqual('Los Angeles');
    });


    it('should display time when info set to `time`', function () {
        clock = TestUtils.renderIntoDocument(<Clock info="time" />);
        var info = TestUtils.findRenderedDOMComponentWithClass(clock, 'time__clock__info');
        expect(info.getDOMNode().textContent).toMatch(/^([01]?[0-9]|2[0-3]):[0-5][0-9] (AM|PM)$/);
    });
});