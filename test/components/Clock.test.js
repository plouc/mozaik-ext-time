import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'
import { WidgetHeader } from '@mozaik/ui'
import { shallowWithTheme } from './utils'
import Clock, {
    Info,
    HoursHand,
    MinutesHand,
    SecondsHand,
} from '../../src/components/Clock'

const getSampleTimeParts = timeString => {
    const time = moment(timeString, 'HH:mm:ss')

    return {
        moment: time,
        hours: time.hours() + time.minutes() / 60,
        minutes: time.minutes(),
        seconds: time.seconds(),
    }
}

test('info should not be displayed if none given', () => {
    const wrapper = shallow(<Clock />)

    expect(wrapper.find(Info).childAt(0).text()).toBe('')
})

test('info should be displayed when a text is provided', () => {
    const sampleInfo = 'mozaik'
    const wrapper = shallow(<Clock info={sampleInfo} />)

    expect(wrapper.find(Info).childAt(0).text()).toBe(sampleInfo)
})

test(`info should display given timezone when set to 'timezone'`, () => {
    const wrapper = shallow(
        <Clock info="timezone" timezone="America/Los_Angeles" />
    )

    expect(wrapper.find(Info).childAt(0).text()).toBe('Los Angeles')
})

test(`info should display time when set to 'time'`, () => {
    const wrapper = shallow(<Clock info="time" />)

    expect(wrapper.find(Info).childAt(0).text()).toMatch(
        /^([01]?[0-9]|2[0-3]):[0-5][0-9] (AM|PM)$/
    )
})

test(`header should not exists unless we provide a 'title' prop`, () => {
    const wrapper = shallow(<Clock info="time" />)

    expect(wrapper.find(WidgetHeader).exists()).toBeFalsy()
})

test(`header should exists if we provide a 'title' prop`, () => {
    const title = 'test title'
    const wrapper = shallowWithTheme(<Clock info="time" title={title} />)

    const header = wrapper.find(WidgetHeader)
    expect(header.exists()).toBeTruthy()
    expect(header.prop('title')).toBe(title)
})

test(`header should display time according to given 'title' prop when applicable`, () => {
    const wrapper = shallow(<Clock info="time" title="::HH:mm" />)
    wrapper.setState(getSampleTimeParts('20:13:00'))

    const header = wrapper.find(WidgetHeader)
    expect(header.exists()).toBeTruthy()
    expect(header.prop('title')).toBe('20:13')
})

/*
test('day/night indicator should display day icon if between 6~18', t => {
    const wrapper = shallow(<Clock info="time" />)
    wrapper.setState(getSampleTimeParts('12:00:00'))

    t.regex(wrapper.find('.time__clock__indicator').prop('className'), new RegExp('fa-sun-o'))
})


test('day/night indicator should display night icon if between 18~6', t => {
    const wrapper = shallow(<Clock info="time" />)
    wrapper.setState(getSampleTimeParts('23:00:00'))

    t.regex(wrapper.find('.time__clock__indicator').prop('className'), new RegExp('fa-moon-o'))
})


test(`day/night indicator should allow to customize sunrise through 'sunRise' prop`, t => {
    const wrapper = shallow(<Clock sunRise="04:00" />)
    wrapper.setState(getSampleTimeParts('05:00:00'))

    t.regex(wrapper.find('.time__clock__indicator').prop('className'), new RegExp('fa-sun-o'))
})


test(`day/night indicator should allow to customize sunset through 'sunSet' prop`, t => {
    const wrapper = shallow(<Clock sunSet="15:00" />)
    wrapper.setState(getSampleTimeParts('16:00:00'))

    t.regex(wrapper.find('.time__clock__indicator').prop('className'), new RegExp('fa-moon-o'))
})
*/

test('hands should be rotated according to current time', () => {
    const wrapper = shallow(<Clock sunSet="15:00" />)
    wrapper.setState(getSampleTimeParts('15:30:45'))

    expect(wrapper.find(HoursHand).prop('style').transform).toMatch(
        /rotate\(15\./
    )
    expect(wrapper.find(MinutesHand).prop('style').transform).toMatch(
        /rotate\(90\./
    )
    expect(wrapper.find(SecondsHand).prop('style').transform).toMatch(
        /rotate\(180\./
    )
})
