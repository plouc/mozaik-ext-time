import test         from 'ava'
import React        from 'react'
import { shallow }  from 'enzyme'
import DayOfWeek    from '../../src/components/DigitalClockDayOfWeek'


test('should display current day of week', t => {
    const wrapper = shallow(<DayOfWeek day={0}/>)

    const dayItems = wrapper.find('.digital-clock__day-of-week__item')
    t.is(dayItems.length, 7)
    t.true(dayItems.at(0).hasClass('digital-clock__day-of-week__item--current'))
})
