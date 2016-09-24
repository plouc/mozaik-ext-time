import test        from 'ava'
import React       from 'react'
import { shallow } from 'enzyme'
import Digit       from '../../src/components/DigitalClockDigit'


test('should be able to display 0', t => {
    const wrapper = shallow(<Digit number={0} type="minute" />)

    t.regex(wrapper.find('.digital-clock__digit__part--top').prop('className'), /digital-clock__digit__part--visible/)
    t.regex(wrapper.find('.digital-clock__digit__part--top-right').prop('className'), /digital-clock__digit__part--visible/)
    t.notRegex(wrapper.find('.digital-clock__digit__part--middle').prop('className'), /digital-clock__digit__part--visible/)
    t.regex(wrapper.find('.digital-clock__digit__part--bottom-right').prop('className'), /digital-clock__digit__part--visible/)
    t.regex(wrapper.find('.digital-clock__digit__part--bottom').prop('className'), /digital-clock__digit__part--visible/)
    t.regex(wrapper.find('.digital-clock__digit__part--bottom-left').prop('className'), /digital-clock__digit__part--visible/)
    t.regex(wrapper.find('.digital-clock__digit__part--top-left').prop('className'), /digital-clock__digit__part--visible/)
})

test('should be able to display 1', t => {
    const wrapper = shallow(<Digit number={1} type="minute" />)

    t.notRegex(wrapper.find('.digital-clock__digit__part--top').prop('className'), /digital-clock__digit__part--visible/)
    t.regex(wrapper.find('.digital-clock__digit__part--top-right').prop('className'), /digital-clock__digit__part--visible/)
    t.notRegex(wrapper.find('.digital-clock__digit__part--middle').prop('className'), /digital-clock__digit__part--visible/)
    t.regex(wrapper.find('.digital-clock__digit__part--bottom-right').prop('className'), /digital-clock__digit__part--visible/)
    t.notRegex(wrapper.find('.digital-clock__digit__part--bottom').prop('className'), /digital-clock__digit__part--visible/)
    t.notRegex(wrapper.find('.digital-clock__digit__part--bottom-left').prop('className'), /digital-clock__digit__part--visible/)
    t.notRegex(wrapper.find('.digital-clock__digit__part--top-left').prop('className'), /digital-clock__digit__part--visible/)
})

test('should be able to display 2', t => {
    const wrapper = shallow(<Digit number={2} type="minute" />)

    t.regex(wrapper.find('.digital-clock__digit__part--top').prop('className'), /digital-clock__digit__part--visible/)
    t.regex(wrapper.find('.digital-clock__digit__part--top-right').prop('className'), /digital-clock__digit__part--visible/)
    t.regex(wrapper.find('.digital-clock__digit__part--middle').prop('className'), /digital-clock__digit__part--visible/)
    t.notRegex(wrapper.find('.digital-clock__digit__part--bottom-right').prop('className'), /digital-clock__digit__part--visible/)
    t.regex(wrapper.find('.digital-clock__digit__part--bottom').prop('className'), /digital-clock__digit__part--visible/)
    t.regex(wrapper.find('.digital-clock__digit__part--bottom-left').prop('className'), /digital-clock__digit__part--visible/)
    t.notRegex(wrapper.find('.digital-clock__digit__part--top-left').prop('className'), /digital-clock__digit__part--visible/)
})

test('should be able to display 3', t => {
    const wrapper = shallow(<Digit number={3} type="minute" />)

    t.regex(wrapper.find('.digital-clock__digit__part--top').prop('className'), /digital-clock__digit__part--visible/)
    t.regex(wrapper.find('.digital-clock__digit__part--top-right').prop('className'), /digital-clock__digit__part--visible/)
    t.regex(wrapper.find('.digital-clock__digit__part--middle').prop('className'), /digital-clock__digit__part--visible/)
    t.regex(wrapper.find('.digital-clock__digit__part--bottom-right').prop('className'), /digital-clock__digit__part--visible/)
    t.regex(wrapper.find('.digital-clock__digit__part--bottom').prop('className'), /digital-clock__digit__part--visible/)
    t.notRegex(wrapper.find('.digital-clock__digit__part--bottom-left').prop('className'), /digital-clock__digit__part--visible/)
    t.notRegex(wrapper.find('.digital-clock__digit__part--top-left').prop('className'), /digital-clock__digit__part--visible/)
})

test('should be able to display 5', t => {
    const wrapper = shallow(<Digit number={5} type="minute" />)

    t.regex(wrapper.find('.digital-clock__digit__part--top').prop('className'), /digital-clock__digit__part--visible/)
    t.notRegex(wrapper.find('.digital-clock__digit__part--top-right').prop('className'), /digital-clock__digit__part--visible/)
    t.regex(wrapper.find('.digital-clock__digit__part--middle').prop('className'), /digital-clock__digit__part--visible/)
    t.regex(wrapper.find('.digital-clock__digit__part--bottom-right').prop('className'), /digital-clock__digit__part--visible/)
    t.regex(wrapper.find('.digital-clock__digit__part--bottom').prop('className'), /digital-clock__digit__part--visible/)
    t.notRegex(wrapper.find('.digital-clock__digit__part--bottom-left').prop('className'), /digital-clock__digit__part--visible/)
    t.regex(wrapper.find('.digital-clock__digit__part--top-left').prop('className'), /digital-clock__digit__part--visible/)
})

test('should be able to display 6', t => {
    const wrapper = shallow(<Digit number={6} type="minute" />)

    t.regex(wrapper.find('.digital-clock__digit__part--top').prop('className'), /digital-clock__digit__part--visible/)
    t.notRegex(wrapper.find('.digital-clock__digit__part--top-right').prop('className'), /digital-clock__digit__part--visible/)
    t.regex(wrapper.find('.digital-clock__digit__part--middle').prop('className'), /digital-clock__digit__part--visible/)
    t.regex(wrapper.find('.digital-clock__digit__part--bottom-right').prop('className'), /digital-clock__digit__part--visible/)
    t.regex(wrapper.find('.digital-clock__digit__part--bottom').prop('className'), /digital-clock__digit__part--visible/)
    t.regex(wrapper.find('.digital-clock__digit__part--bottom-left').prop('className'), /digital-clock__digit__part--visible/)
    t.regex(wrapper.find('.digital-clock__digit__part--top-left').prop('className'), /digital-clock__digit__part--visible/)
})

test('should be able to display 7', t => {
    const wrapper = shallow(<Digit number={7} type="minute" />)

    t.regex(wrapper.find('.digital-clock__digit__part--top').prop('className'), /digital-clock__digit__part--visible/)
    t.regex(wrapper.find('.digital-clock__digit__part--top-right').prop('className'), /digital-clock__digit__part--visible/)
    t.notRegex(wrapper.find('.digital-clock__digit__part--middle').prop('className'), /digital-clock__digit__part--visible/)
    t.regex(wrapper.find('.digital-clock__digit__part--bottom-right').prop('className'), /digital-clock__digit__part--visible/)
    t.notRegex(wrapper.find('.digital-clock__digit__part--bottom').prop('className'), /digital-clock__digit__part--visible/)
    t.notRegex(wrapper.find('.digital-clock__digit__part--bottom-left').prop('className'), /digital-clock__digit__part--visible/)
    t.notRegex(wrapper.find('.digital-clock__digit__part--top-left').prop('className'), /digital-clock__digit__part--visible/)
})

test('should be able to display 8', t => {
    const wrapper = shallow(<Digit number={8} type="minute" />)

    t.regex(wrapper.find('.digital-clock__digit__part--top').prop('className'), /digital-clock__digit__part--visible/)
    t.regex(wrapper.find('.digital-clock__digit__part--top-right').prop('className'), /digital-clock__digit__part--visible/)
    t.regex(wrapper.find('.digital-clock__digit__part--middle').prop('className'), /digital-clock__digit__part--visible/)
    t.regex(wrapper.find('.digital-clock__digit__part--bottom-right').prop('className'), /digital-clock__digit__part--visible/)
    t.regex(wrapper.find('.digital-clock__digit__part--bottom').prop('className'), /digital-clock__digit__part--visible/)
    t.regex(wrapper.find('.digital-clock__digit__part--bottom-left').prop('className'), /digital-clock__digit__part--visible/)
    t.regex(wrapper.find('.digital-clock__digit__part--top-left').prop('className'), /digital-clock__digit__part--visible/)
})

test('should be able to display 9', t => {
    const wrapper = shallow(<Digit number={9} type="minute" />)

    t.regex(wrapper.find('.digital-clock__digit__part--top').prop('className'), /digital-clock__digit__part--visible/)
    t.regex(wrapper.find('.digital-clock__digit__part--top-right').prop('className'), /digital-clock__digit__part--visible/)
    t.regex(wrapper.find('.digital-clock__digit__part--middle').prop('className'), /digital-clock__digit__part--visible/)
    t.regex(wrapper.find('.digital-clock__digit__part--bottom-right').prop('className'), /digital-clock__digit__part--visible/)
    t.regex(wrapper.find('.digital-clock__digit__part--bottom').prop('className'), /digital-clock__digit__part--visible/)
    t.notRegex(wrapper.find('.digital-clock__digit__part--bottom-left').prop('className'), /digital-clock__digit__part--visible/)
    t.regex(wrapper.find('.digital-clock__digit__part--top-left').prop('className'), /digital-clock__digit__part--visible/)
})
