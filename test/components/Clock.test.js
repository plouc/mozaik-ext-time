import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'
import { WidgetHeader } from '@mozaik/ui'
import DayIcon from 'react-icons/lib/fa/sun-o'
import NightIcon from 'react-icons/lib/fa/moon-o'
import Clock, { Info, HoursHand, MinutesHand, SecondsHand } from '../../src/components/Clock'

const getSampleTimeParts = timeString => {
    const time = moment(timeString, 'HH:mm:ss')

    return {
        moment: time,
        hours: time.hours() + time.minutes() / 60,
        minutes: time.minutes(),
        seconds: time.seconds(),
    }
}

const theme = {
    root: {
        color: '#000',
        background: '#fff',
    },
}

describe('info', () => {
    it('should not be displayed if none given', () => {
        const wrapper = shallow(<Clock theme={theme} />)

        expect(wrapper.find(Info).childAt(0).text()).toBe('')
    })

    it('should be displayed when a text is provided', () => {
        const sampleInfo = 'mozaik'
        const wrapper = shallow(<Clock theme={theme} info={sampleInfo} />)

        expect(wrapper.find(Info).childAt(0).text()).toBe(sampleInfo)
    })

    it(`should display given timezone when set to 'timezone'`, () => {
        const wrapper = shallow(
            <Clock theme={theme} info="timezone" timezone="America/Los_Angeles" />
        )

        expect(wrapper.find(Info).childAt(0).text()).toBe('Los Angeles')
    })

    it(`should display time when set to 'time'`, () => {
        const wrapper = shallow(<Clock theme={theme} info="time" />)

        expect(wrapper.find(Info).childAt(0).text()).toMatch(
            /^([01]?[0-9]|2[0-3]):[0-5][0-9] (AM|PM)$/
        )
    })

    it(`should display date when set to 'date'`, () => {
        const wrapper = shallow(<Clock theme={theme} info="date" />)

        expect(wrapper.find(Info).childAt(0).text()).toMatch(/^[a-z]{3} [0-9]{1,2}, [0-9]{4}$/i)
    })
})

describe('header', () => {
    it(`should not exists unless we provide a 'title' prop`, () => {
        const wrapper = shallow(<Clock theme={theme} info="time" />)

        expect(wrapper.find(WidgetHeader).exists()).toBeFalsy()
    })

    it(`should exists if we provide a 'title' prop`, () => {
        const title = 'test title'
        const wrapper = shallow(<Clock theme={theme} info="time" title={title} />)

        const header = wrapper.find(WidgetHeader)
        expect(header.exists()).toBeTruthy()
        expect(header.prop('title')).toBe(title)
    })

    it(`should display time according to given 'title' prop when applicable`, () => {
        const wrapper = shallow(<Clock theme={theme} info="time" title="::HH:mm" />)
        wrapper.setState(getSampleTimeParts('20:13:00'))

        const header = wrapper.find(WidgetHeader)
        expect(header.exists()).toBeTruthy()
        expect(header.prop('title')).toBe('20:13')
    })
})

describe('day/night indicator', () => {
    it('should display day icon if between 6~18', () => {
        const wrapper = shallow(<Clock theme={theme} info="time" />)
        wrapper.setState(getSampleTimeParts('12:00:00'))

        expect(wrapper.find(DayIcon).exists()).toBeTruthy()
        expect(wrapper.find(NightIcon).exists()).toBeFalsy()
    })

    it('should display night icon if between 18~6', () => {
        const wrapper = shallow(<Clock theme={theme} info="time" />)
        wrapper.setState(getSampleTimeParts('23:00:00'))

        expect(wrapper.find(NightIcon).exists()).toBeTruthy()
        expect(wrapper.find(DayIcon).exists()).toBeFalsy()
    })

    it(`should allow to customize sunrise through 'sunRise' prop`, () => {
        const wrapper = shallow(<Clock theme={theme} sunRise="04:00" />)
        wrapper.setState(getSampleTimeParts('05:00:00'))

        expect(wrapper.find(DayIcon).exists()).toBeTruthy()
        expect(wrapper.find(NightIcon).exists()).toBeFalsy()
    })

    it(`should allow to customize sunset through 'sunSet' prop`, () => {
        const wrapper = shallow(<Clock theme={theme} sunSet="15:00" />)
        wrapper.setState(getSampleTimeParts('16:00:00'))

        expect(wrapper.find(NightIcon).exists()).toBeTruthy()
        expect(wrapper.find(DayIcon).exists()).toBeFalsy()
    })
})

test('hands should be rotated according to current time', () => {
    const wrapper = shallow(<Clock theme={theme} sunSet="15:00" />)
    wrapper.setState(getSampleTimeParts('15:30:45'))

    expect(wrapper.find(HoursHand).prop('style').transform).toMatch(/rotate\(15\./)
    expect(wrapper.find(MinutesHand).prop('style').transform).toMatch(/rotate\(90\./)
    expect(wrapper.find(SecondsHand).prop('style').transform).toMatch(/rotate\(180\./)
})
