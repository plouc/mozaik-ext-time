var React               = require('react');
var classSet            = require('react-classset');
var Reflux              = require('reflux');
var ApiConsumerMixin    = require('mozaik/browser').Mixin.ApiConsumer;
var d3                  = require('d3/d3');
var moment              = require('moment');
var timezone            = require('moment-timezone');
var format              = require('string-template');


function getCurrentTimeParts(timezoneName) {
    var currentTime = timezoneName ? moment().tz(timezoneName) : moment();

    return {
        moment:  currentTime,
        hours:   currentTime.hours() + currentTime.minutes() / 60,
        minutes: currentTime.minutes(),
        seconds: currentTime.seconds()
    };
}

function getLocalUnixMoment(timestamp, timezone) {
     var time = moment.unix(timestamp);
     if (timezone) {
        time = time.tz(timezone);
     }
     return time;

}

var secondsScale = d3.scale.linear().domain([0, 59 + 999/1000]).range([-90, 270]);
var minutesScale = d3.scale.linear().domain([0, 59 + 59/60]).range([-90, 270]);
var hoursScale   = d3.scale.linear().domain([0, 11 + 59/60]).range([-90, 270]);


var Clock = React.createClass({
    mixins: [
        Reflux.ListenerMixin,
        ApiConsumerMixin
    ],

    getInitialState() {
        var initialState;

        initialState = getCurrentTimeParts(this.props.timezone);
        initialState.sunRise = initialState.moment.clone().hours(6).minutes(0).seconds(0);
        initialState.sunSet  = initialState.moment.clone().hours(18).minutes(0).seconds(0);

        return initialState;
    },

    propTypes: {
        timezone: React.PropTypes.string,
        city:     React.PropTypes.string
    },

    getApiRequest() {
        var params = {
            // Pick the city from timezone if not defined and available
            city:     this.props.city || (this.props.timezone || '').replace(/\w+\//, ''),
            timezone: this.props.timezone
        };

        return {
            id: format('time.info.{timezone}.{city}', params),
            params: params
        };
    },

    componentDidMount() {
        setInterval(() => {
            this.setState(getCurrentTimeParts(this.props.timezone));
        }, 1000);
    },

    onApiData(info) {
        if (info && info.sys) {
            this.setState({ sunRise: getLocalUnixMoment(info.sys.sunrise, this.props.timezone) });
            this.setState({ sunSet: getLocalUnixMoment(info.sys.sunset, this.props.timezone) });
        }
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

        // Day/night indicator
        var isDay = this.state.moment.isBetween(this.state.sunRise, this.state.sunSet);
        var timeIndicatorClasses = cs({
            'time__clock__indicator': true,
            'fa':                     true,
            'fa-sun-o':               isDay,
            'fa-moon-o':              !isDay
        });

        // Textual field, defaults to config value
        var infoFields = {
            timezone: this.props.timezone ? this.props.timezone.replace(/\w+\//, '').replace('_', ' ') : this.props.timezone,
            sun:  this.state.sunRise.format('LT') + ' - ' + this.state.sunSet.format('LT'),
            date: this.state.moment.format('ll'),
            time: this.state.moment.format('LT')
        };
        var info = infoFields[this.props.info] || this.props.info;

        return (
            <div>
                <div className="time__clock__outer-circle" />
                <span className={timeIndicatorClasses}></span>
                <span className="time__clock__info">{info}</span>
                <div className="time__clock__hand time__clock__hand--seconds" style={secondsStyle} />
                <div className="time__clock__hand time__clock__hand--minutes" style={minutesStyle} />
                <div className="time__clock__hand time__clock__hand--hours"   style={hoursStyle} />
                <div className="time__clock__inner-circle" />
            </div>
        );
    }
});

module.exports = Clock;