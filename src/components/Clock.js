import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import d3 from 'd3/d3'
import moment from 'moment'
import 'moment-timezone'
import styled, { withTheme } from 'styled-components'
import { Widget, WidgetHeader, WidgetBody } from '@mozaik/ui'

const OuterCircle = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    background: ${props => props.theme.root.background};
    border: .5vmin solid ${props => props.theme.root.color};
    width: ${props => props.radius * 2}px;
    height: ${props => props.radius * 2}px;
    border-radius: ${props => props.radius}px;
    margin-top: ${props => props.radius * -1}px;
    margin-left: ${props => props.radius * -1}px;
    box-shadow: 0 3px 5px rgba(0, 0, 0, .2), 0 3px 5px rgba(0, 0, 0, .2) inset;
`

const InnerCircle = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    background-color: ${props => props.theme.root.color};
    width: ${props => props.radius * 2}px;
    height: ${props => props.radius * 2}px;
    border-radius: ${props => props.radius}px;
    margin-top: ${props => props.radius * -1}px;
    margin-left: ${props => props.radius * -1}px;
`

const Hand = styled.div`
    width: ${props => props.radius * 0.87}px;
    height: 2px;
    margin-top: -1px;
    background-color: ${props => props.theme.root.color};
    position: absolute;
    top: 50%;
    left: 50%;
    transform-origin: left center;
`

const HoursHand = Hand.extend`width: ${props => props.radius * 0.55}px;`

const MinutesHand = Hand.extend``

const SecondsHand = Hand.extend`height: 1px;`

const Info = styled.span`
    display: block;
    position: relative;
    top: 55%;
    left: 0;
    width: 100%;
    text-align: center;
    font-size: 2vmin;
`

const getCurrentTimeParts = timezoneName => {
    let currentTime = timezoneName ? moment().tz(timezoneName) : moment()

    return {
        moment: currentTime,
        hours: currentTime.hours() + currentTime.minutes() / 60,
        minutes: currentTime.minutes(),
        seconds: currentTime.seconds(),
    }
}

const secondsScale = d3.scale
    .linear()
    .domain([0, 59 + 999 / 1000])
    .range([-90, 270])
const minutesScale = d3.scale
    .linear()
    .domain([0, 59 + 59 / 60])
    .range([-90, 270])
const hoursScale = d3.scale.linear().domain([0, 11 + 59 / 60]).range([-90, 270])

const sunFormats = ['HH:mm', 'H:mm', 'H:m']

class Clock extends Component {
    static propTypes = {
        title: PropTypes.string,
        info: PropTypes.string,
        timezone: PropTypes.oneOf(moment.tz.names()),
        sunRise: PropTypes.string.isRequired,
        sunSet: PropTypes.string.isRequired,
    }

    static defaultProps = {
        sunRise: '06:00',
        sunSet: '18:00',
    }

    constructor(props) {
        super(props)

        this.state = getCurrentTimeParts(this.props.timezone)
    }

    componentDidMount() {
        setInterval(() => {
            this.setState(getCurrentTimeParts(this.props.timezone))
        }, 1000)
    }

    render() {
        const { hours, minutes, seconds } = this.state

        // Day/night indicator
        const { sunRise, sunSet } = this.props

        const sunRiseTime = moment(sunRise, sunFormats)
        const sunSetTime = moment(sunSet, sunFormats)

        const sunRiseDate = this.state.moment
            .clone()
            .hours(sunRiseTime.hours())
            .minutes(sunRiseTime.minutes())
        const sunSetDate = this.state.moment
            .clone()
            .hours(sunSetTime.hours())
            .minutes(sunSetTime.minutes())

        const isDay = this.state.moment.isBetween(sunRiseDate, sunSetDate)
        const timeIndicatorClasses = classNames('time__clock__indicator fa', {
            'fa-sun-o': isDay,
            'fa-moon-o': !isDay,
        })

        // Textual field, defaults to config value
        const infoFields = {
            timezone: this.props.timezone
                ? this.props.timezone.replace(/\w+\//, '').replace('_', ' ')
                : this.props.timezone,
            date: this.state.moment.format('ll'),
            time: this.state.moment.format('LT'),
        }
        const info = infoFields[this.props.info] || this.props.info

        let { title } = this.props

        const body = (
            <div>
                <OuterCircle radius={100} />
                <span className={timeIndicatorClasses} />
                <Info>
                    {info}
                </Info>
                <SecondsHand
                    radius={100}
                    style={{
                        transform: `rotate(${secondsScale(seconds)}deg)`,
                    }}
                />
                <MinutesHand
                    radius={100}
                    style={{
                        transform: `rotate(${minutesScale(minutes)}deg)`,
                    }}
                />
                <HoursHand
                    radius={100}
                    style={{
                        transform: `rotate(${hoursScale(hours % 12)}deg)`,
                    }}
                />
                <InnerCircle radius={5} />
            </div>
        )

        if (!title) {
            return (
                <Widget>
                    {body}
                </Widget>
            )
        }

        if (title.indexOf('::') === 0) {
            title = this.state.moment.format(title.substring(2))
        }

        return (
            <Widget>
                <WidgetHeader title={title} />
                <WidgetBody>
                    {body}
                </WidgetBody>
            </Widget>
        )
    }
}

export default withTheme(Clock)
