import test        from 'ava'
import React       from 'react'
import { shallow } from 'enzyme'
import moment      from 'moment'
import Clock       from '../src/components/Clock'


const getSampleTimeParts = (timeString) => {
    const time = moment(timeString, 'HH:mm:ss')

    return {
        moment:  time,
        hours:   time.hours() + time.minutes() / 60,
        minutes: time.minutes(),
        seconds: time.seconds()
    }
}


test('info should not be displayed if none given', t => {
    const wrapper = shallow(<Clock />)

    t.is(wrapper.find('.time__clock__info').text(), '')
})


test('info should be displayed when a text is provided', t => {
    const sampleInfo = 'mozaik'
    const wrapper    = shallow(<Clock info={sampleInfo}/>)

    t.is(wrapper.find('.time__clock__info').text(), sampleInfo)
})


test(`info should display given timezone when set to 'timezone'`, t => {
    const wrapper = shallow(<Clock info="timezone" timezone="America/Los_Angeles"/>)

    t.is(wrapper.find('.time__clock__info').text(), 'Los Angeles')
})


test(`info should display time when set to 'time'`, t => {
    const wrapper = shallow(<Clock info="time"/>)

    t.regex(wrapper.find('.time__clock__info').text(), /^([01]?[0-9]|2[0-3]):[0-5][0-9] (AM|PM)$/)
})


test(`header should not exists unless we provide a 'title' prop`, t => {
    const wrapper = shallow(<Clock info="time" />)

    t.is(wrapper.find('').length, 0)
})


test(`header should exists if we provide a 'title' prop`, t => {
    const title   = 'test title'
    const wrapper = shallow(<Clock info="time"  title={title} />)

    const header = wrapper.find('.widget__header')
    t.is(header.length, 1)
    t.is(header.text(), title)
})


test(`header should display time according to given 'title' prop when applicable`, t => {
    const wrapper = shallow(<Clock info="time" title="::HH:mm" />)
    wrapper.setState(getSampleTimeParts('20:13:00'))

    const header = wrapper.find('.widget__header')
    t.is(header.length, 1)
    t.is(header.text(), '20:13')
})


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


test('hands should be rotated according to current time', t => {
    const wrapper = shallow(<Clock sunSet="15:00" />)
    wrapper.setState(getSampleTimeParts('15:30:45'))

    t.regex(wrapper.find('.time__clock__hand--hours').prop('style').transform,   /rotate\(15\./)
    t.regex(wrapper.find('.time__clock__hand--minutes').prop('style').transform, /rotate\(90\./)
    t.regex(wrapper.find('.time__clock__hand--seconds').prop('style').transform, /rotate\(180\./)
})
