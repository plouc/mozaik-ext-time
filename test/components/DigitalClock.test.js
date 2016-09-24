import test         from 'ava'
import React        from 'react'
import { shallow }  from 'enzyme'
import moment       from 'moment'
import DigitalClock from '../../src/components/DigitalClock'
import DayOfWeek    from '../../src/components/DigitalClockDayOfWeek'
import Digit        from '../../src/components/DigitalClockDigit'


test('should display time', t => {
    const wrapper = shallow(<DigitalClock />)
    wrapper.setState({
        now:   moment(),
        parts: [1, 2, 3, 4, 5, 6],
    })

    const digits = wrapper.find(Digit)

    t.is(digits.length, 6)
    t.is(digits.at(0).prop('number'), 1)
    t.is(digits.at(0).prop('type'), 'hours')
    t.is(digits.at(1).prop('number'), 2)
    t.is(digits.at(1).prop('type'), 'hours')
    t.is(digits.at(2).prop('number'), 3)
    t.is(digits.at(2).prop('type'), 'minutes')
    t.is(digits.at(3).prop('number'), 4)
    t.is(digits.at(3).prop('type'), 'minutes')
    t.is(digits.at(4).prop('number'), 5)
    t.is(digits.at(4).prop('type'), 'seconds')
    t.is(digits.at(5).prop('number'), 6)
    t.is(digits.at(5).prop('type'), 'seconds')
})

test('should display week day by default', t => {
    const wrapper = shallow(<DigitalClock />)

    t.truthy(wrapper.find(DayOfWeek).length)
})

test('should allow to disable week day', t => {
    const wrapper = shallow(<DigitalClock displayWeekday={false}/>)

    t.falsy(wrapper.find(DayOfWeek).length)
})

test('should display seconds by default', t => {
    const wrapper = shallow(<DigitalClock />)

    t.truthy(wrapper.find('.digital-clock__pair--seconds').length)
})

test('should allow to disable seconds', t => {
    const wrapper = shallow(<DigitalClock displaySeconds={false}/>)

    t.falsy(wrapper.find('.digital-clock__pair--seconds').length)
})
