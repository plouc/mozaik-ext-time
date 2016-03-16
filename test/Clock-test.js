/* global describe it */
import React       from 'react';
import moment      from 'moment';
import { shallow } from 'enzyme';
import expect      from 'expect';
import Clock       from '../src/components/Clock.jsx';


const getSampleTimeParts = (timeString) => {
    const time = moment(timeString, 'HH:mm:ss');

    return {
        moment:  time,
        hours:   time.hours() + time.minutes() / 60,
        minutes: time.minutes(),
        seconds: time.seconds()
    };
};


describe('Mozaïk | Time | Clock component', () => {
    describe('info', () => {
        it('should not be displayed if none given', () => {
            const wrapper = shallow(<Clock />);

            expect(wrapper.find('.time__clock__info').text()).toEqual('');
        });

        it('should be displayed when a text is provided', () => {
            const sampleInfo = 'mozaik';
            const wrapper = shallow(<Clock info={sampleInfo}/>);

            expect(wrapper.find('.time__clock__info').text()).toEqual(sampleInfo);
        });

        it(`should display given timezone when set to 'timezone'`, () => {
            const wrapper = shallow(<Clock info="timezone" timezone="America/Los_Angeles"/>);

            expect(wrapper.find('.time__clock__info').text()).toEqual('Los Angeles');
        });

        it(`should display time when set to 'time'`, () => {
            const wrapper = shallow(<Clock info="time"/>);

            expect(wrapper.find('.time__clock__info').text()).toMatch(/^([01]?[0-9]|2[0-3]):[0-5][0-9] (AM|PM)$/);
        });
    });

    describe('header', () => {
        it(`should not exists unless we provide a 'title' prop`, () => {
            const wrapper = shallow(<Clock info="time" />);

            expect(wrapper.find('').length).toEqual(0);
        });

        it(`should exists if we provide a 'title' prop`, () => {
            const title   = 'test title';
            const wrapper = shallow(<Clock info="time"  title={title} />);

            const header = wrapper.find('.widget__header');
            expect(header.length).toEqual(1);
            expect(header.text()).toEqual(title);
        });

        it(`should display time according to given 'title' prop when applicable`, () => {
            const wrapper = shallow(<Clock info="time" title="::HH:mm" />);
            wrapper.setState(getSampleTimeParts('20:13:00'));

            const header = wrapper.find('.widget__header');
            expect(header.length).toEqual(1);
            expect(header.text()).toEqual('20:13');
        });
    });

    describe('day/night indicator', () => {
        it('should display day icon if between 6~18', () => {
            const wrapper = shallow(<Clock info="time" />);
            wrapper.setState(getSampleTimeParts('12:00:00'));

            expect(wrapper.find('.time__clock__indicator').prop('className')).toContain('fa-sun-o');
        });

        it('should display night icon if between 18~6', () => {
            const wrapper = shallow(<Clock info="time" />);
            wrapper.setState(getSampleTimeParts('23:00:00'));

            expect(wrapper.find('.time__clock__indicator').prop('className')).toContain('fa-moon-o');
        });

        it(`should allow to customize sunrise through 'sunRise' prop`, () => {
            const wrapper = shallow(<Clock sunRise="04:00" />);
            wrapper.setState(getSampleTimeParts('05:00:00'));

            expect(wrapper.find('.time__clock__indicator').prop('className')).toContain('fa-sun-o');
        });

        it(`should allow to customize sunset through 'sunSet' prop`, () => {
            const wrapper = shallow(<Clock sunSet="15:00" />);
            wrapper.setState(getSampleTimeParts('16:00:00'));

            expect(wrapper.find('.time__clock__indicator').prop('className')).toContain('fa-moon-o');
        });
    });

    describe('hands', () => {
        it('should be rotated according to current time', () => {
            const wrapper = shallow(<Clock sunSet="15:00" />);
            wrapper.setState(getSampleTimeParts('15:30:45'));

            expect(wrapper.find('.time__clock__hand--hours').prop('style').transform).toContain('rotate(15.');
            expect(wrapper.find('.time__clock__hand--minutes').prop('style').transform).toContain('rotate(90.');
            expect(wrapper.find('.time__clock__hand--seconds').prop('style').transform).toContain('rotate(180.');
        });
    });
});

