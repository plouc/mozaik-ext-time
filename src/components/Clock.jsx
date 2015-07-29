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
        var hoursStyle   = {
            transform: `rotate(${ hoursScale(this.state.hours % 12) }deg)`
        };
        var minutesStyle = {
            transform: `rotate(${ minutesScale(this.state.minutes) }deg)`
        };
        var secondsStyle = {
            transform: `rotate(${ secondsScale(this.state.seconds) }deg)`
        };

        // Show title only when set
        var title;
        if (this.props.title) {
            title = (
                <div className="widget__header">
                    {this.props.title}
                    <i className="fa fa-clock-o" />
                </div>
            );
        }

        // Day/night indicator
        var sunRise = this.state.moment.clone().hours(6).minutes(0);
        var sunSet  = this.state.moment.clone().hours(18).minutes(0);

        // Parse custom times if given
        if (this.props.sunRise) {
            var customSunRiseTime = moment(this.props.sunRise, ['HH:mm', 'H:mm', 'H:m']);
            sunRise.hours(customSunRiseTime.hours()).minutes(customSunRiseTime.minutes());
        }
        if (this.props.sunSet) {
            var customSunSetTime = moment(this.props.sunSet, ['HH:mm', 'H:mm', 'H:m']);
            sunSet.hours(customSunSetTime.hours()).minutes(customSunSetTime.minutes());
        }

        var isDay = this.state.moment.isBetween(sunRise, sunSet);
        var timeIndicatorClasses = cs({
            'time__clock__indicator': true,
            'fa':                     true,
            'fa-sun-o':               isDay,
            'fa-moon-o':              !isDay
        });

        // Textual field, defaults to config value
        var infoFields = {
            timezone: this.props.timezone ? this.props.timezone.replace(/\w+\//, '').replace('_', ' ') : this.props.timezone,
            date:     this.state.moment.format('ll'),
            time:     this.state.moment.format('LT')
        };
        var info = infoFields[this.props.info] || this.props.info;

        return (
            <div>
                {title}
                <div className="widget__body">
                    <div className="time__clock__outer-circle" />
                    <span className={timeIndicatorClasses}></span>
                    <span className="time__clock__info">{info}</span>
                    <div className="time__clock__hand time__clock__hand--seconds" style={secondsStyle} />
                    <div className="time__clock__hand time__clock__hand--minutes" style={minutesStyle} />
                    <div className="time__clock__hand time__clock__hand--hours"   style={hoursStyle} />
                    <div className="time__clock__inner-circle" />
                </div>
            </div>
        );
    }
});

export { Clock as default };