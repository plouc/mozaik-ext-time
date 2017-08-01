import React, { Component } from 'react'
import PropTypes from 'prop-types'
import d3 from 'd3/d3'
import moment from 'moment'
import 'moment-timezone/builds/moment-timezone-with-data'
import styled from 'styled-components'
import ClockIcon from 'react-icons/lib/fa/clock-o'
import DayIcon from 'react-icons/lib/fa/sun-o'
import NightIcon from 'react-icons/lib/fa/moon-o'
import { Widget, WidgetHeader, WidgetBody } from '@mozaik/ui'

const OuterCircle = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    background: ${props => props.colors.background};
    border: .5vmin solid ${props => props.colors.outline};
    width: ${props => props.radius * 2}px;
    height: ${props => props.radius * 2}px;
    border-radius: ${props => props.radius}px;
    margin-top: ${props => props.radius * -1}px;
    margin-left: ${props => props.radius * -1}px;
`

const InnerCircle = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    background-color: ${props => props.colors.center};
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
    position: absolute;
    top: 50%;
    left: 50%;
    transform-origin: left center;
`

export const HoursHand = Hand.extend`
    width: ${props => props.radius * 0.55}px;
    background-color: ${props => props.colors.hoursHand};
`

export const MinutesHand = Hand.extend`background-color: ${props => props.colors.minutesHand};`

export const SecondsHand = Hand.extend`
    height: 1px;
    background-color: ${props => props.colors.secondsHand};
`

export const Info = styled.span`
    display: block;
    position: absolute;
    top: 60%;
    left: 0;
    width: 100%;
    text-align: center;
    font-size: 1.6vmin;
    color: ${props => props.colors.info};
`

export const DayNightIndicator = styled.div`
    display: flex;
    position: absolute;
    top: 20%;
    left: 0;
    width: 100%;
    justify-content: center;
    font-size: 3vmin;
    opacity: 0.4;
    color: ${props => props.colors.dayNightIcon};
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

const secondsScale = d3.scale.linear().domain([0, 59 + 999 / 1000]).range([-90, 270])
const minutesScale = d3.scale.linear().domain([0, 59 + 59 / 60]).range([-90, 270])
const hoursScale = d3.scale.linear().domain([0, 11 + 59 / 60]).range([-90, 270])

const sunFormats = ['HH:mm', 'H:mm', 'H:m']

export default class Clock extends Component {
    static propTypes = {
        title: PropTypes.string,
        info: PropTypes.string,
        timezone: PropTypes.oneOf(moment.tz.names()),
        sunRise: PropTypes.string.isRequired,
        sunSet: PropTypes.string.isRequired,
        colors: PropTypes.object,
        theme: PropTypes.shape({
            root: PropTypes.shape({
                background: PropTypes.string.isRequired,
                color: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,
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

        const { sunRise, sunSet, colors: _colors, theme } = this.props

        const colors = Object.assign(
            {},
            {
                background: theme.root.background,
                outline: theme.root.color,
                center: theme.root.color,
                hoursHand: theme.root.color,
                minutesHand: theme.root.color,
                secondsHand: theme.root.color,
                dayNightIcon: theme.root.color,
                info: theme.root.color,
            },
            _colors
        )

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
        const dayNightIcon = isDay ? <DayIcon /> : <NightIcon />

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
                <OuterCircle radius={100} colors={colors} />
                <DayNightIndicator colors={colors}>
                    {dayNightIcon}
                </DayNightIndicator>
                <Info colors={colors}>
                    {info}
                </Info>
                <SecondsHand
                    radius={100}
                    colors={colors}
                    style={{
                        transform: `rotate(${secondsScale(seconds)}deg)`,
                    }}
                />
                <MinutesHand
                    radius={100}
                    colors={colors}
                    style={{
                        transform: `rotate(${minutesScale(minutes)}deg)`,
                    }}
                />
                <HoursHand
                    radius={100}
                    colors={colors}
                    style={{
                        transform: `rotate(${hoursScale(hours % 12)}deg)`,
                    }}
                />
                <InnerCircle radius={5} colors={colors} />
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
                <WidgetHeader title={title} icon={ClockIcon} />
                <WidgetBody>
                    {body}
                </WidgetBody>
            </Widget>
        )
    }
}
