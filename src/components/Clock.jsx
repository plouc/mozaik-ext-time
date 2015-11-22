import React, { Component } from 'react';
import classSet             from 'react-classset';
import d3                   from 'd3/d3';
import moment               from 'moment';
import timezone             from 'moment-timezone';


const getCurrentTimeParts = function (timezoneName) {
    let currentTime = timezoneName ? moment().tz(timezoneName) : moment();

    return {
        moment:  currentTime,
        hours:   currentTime.hours() + currentTime.minutes() / 60,
        minutes: currentTime.minutes(),
        seconds: currentTime.seconds()
    };
};


const secondsScale = d3.scale.linear().domain([0, 59 + 999/1000]).range([-90, 270]);
const minutesScale = d3.scale.linear().domain([0, 59 + 59/60]).range([-90, 270]);
const hoursScale   = d3.scale.linear().domain([0, 11 + 59/60]).range([-90, 270]);


var Clock = React.createClass({
    getInitialState() {
        return getCurrentTimeParts(this.props.timezone);
    },

    componentDidMount() {
        setInterval(() => {
            this.setState(getCurrentTimeParts(this.props.timezone));
        }, 1000);
    },

    render() {
        var cs = classSet;
        let hoursStyle   = {
            transform: `rotate(${ hoursScale(this.state.hours % 12) }deg)`
        };
        let minutesStyle = {
            transform: `rotate(${ minutesScale(this.state.minutes) }deg)`
        };
        let secondsStyle = {
            transform: `rotate(${ secondsScale(this.state.seconds) }deg)`
        };

        let { title } = this.props;

        // Day/night indicator
        let sunRise = this.state.moment.clone().hours(6).minutes(0);
        let sunSet  = this.state.moment.clone().hours(18).minutes(0);

        // Parse custom times if given
        if (this.props.sunRise) {
            var customSunRiseTime = moment(this.props.sunRise, ['HH:mm', 'H:mm', 'H:m']);
            sunRise.hours(customSunRiseTime.hours()).minutes(customSunRiseTime.minutes());
        }
        if (this.props.sunSet) {
            var customSunSetTime = moment(this.props.sunSet, ['HH:mm', 'H:mm', 'H:m']);
            sunSet.hours(customSunSetTime.hours()).minutes(customSunSetTime.minutes());
        }

        const isDay = this.state.moment.isBetween(sunRise, sunSet);
        const timeIndicatorClasses = cs({
            'time__clock__indicator': true,
            'fa':                     true,
            'fa-sun-o':               isDay,
            'fa-moon-o':              !isDay
        });

        // Textual field, defaults to config value
        const infoFields = {
            timezone: this.props.timezone ? this.props.timezone.replace(/\w+\//, '').replace('_', ' ') : this.props.timezone,
            date:     this.state.moment.format('ll'),
            time:     this.state.moment.format('LT')
        };
        const info = infoFields[this.props.info] || this.props.info;

        const bodyClasses = title ? 'widget__body' : '';
        const body = (
            <div className={bodyClasses}>
                <div className="time__clock__outer-circle" />
                <span className={timeIndicatorClasses}></span>
                <span className="time__clock__info">{info}</span>
                <div className="time__clock__hand time__clock__hand--seconds" style={secondsStyle} />
                <div className="time__clock__hand time__clock__hand--minutes" style={minutesStyle} />
                <div className="time__clock__hand time__clock__hand--hours"   style={hoursStyle} />
                <div className="time__clock__inner-circle" />
            </div>
        );

        if (title) {
            if (title.indexOf('::') === 0) {
                title = this.state.moment.format(title.substring(2));
            }

            return (
                <div>
                    <div className="widget__header">
                        {title}
                        <i className="fa fa-clock-o" />
                    </div>
                    {body}
                </div>
            );
        } else {
            return body;
        }
    }
});

export default Clock;
