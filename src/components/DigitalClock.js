import React, { Component, PropTypes } from 'react'
import moment                          from 'moment'
import timezone                        from 'moment-timezone'
import DigitalClockDayOfWeek           from './DigitalClockDayOfWeek'
import DigitalClockDigit               from './DigitalClockDigit'


/**
 * @param {string|undefined} timezoneName - The timezone you wish to use
 * @returns {{ now: moment, parts: Array<number> }} The resulting object
 */
const getCurrentTimeParts = timezoneName => {
    const currentTime = timezoneName ? moment().tz(timezoneName) : moment().tz('Asia/Tokyo')

    const formatted = currentTime.format('hhmmss')

    return {
        now:   currentTime,
        parts: formatted.split('').map(part => parseInt(part, 10)),
    }
}


class DigitalClock extends Component {
    constructor(props) {
        super(props)

        this.state = getCurrentTimeParts(props.timezone)
    }

    componentDidMount() {
        setInterval(() => {
            this.setState(getCurrentTimeParts(this.props.timezone))
        }, 1000)
    }

    render() {
        const { displayWeekday, displaySeconds } = this.props
        const { now, parts }                     = this.state

        return (
            <div className="digital-clock">
                {displayWeekday && (
                    <DigitalClockDayOfWeek day={now.day()} />
                )}
                <div className="digital-clock__time">
                    <div className="digital-clock__pair">
                        <DigitalClockDigit number={parts[0]} type="hours" />
                        <DigitalClockDigit number={parts[1]} type="hours" />
                    </div>
                    <div className="digital-clock__separator" />
                    <div className="digital-clock__pair">
                        <DigitalClockDigit number={parts[2]} type="minutes" />
                        <DigitalClockDigit number={parts[3]} type="minutes" />
                    </div>
                    {displaySeconds && (
                        <div className="digital-clock__pair digital-clock__pair--seconds">
                            <DigitalClockDigit number={parts[4]} type="seconds" />
                            <DigitalClockDigit number={parts[5]} type="seconds" />
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

DigitalClock.propTypes = {
    displayWeekday: PropTypes.bool.isRequired,
    displaySeconds: PropTypes.bool.isRequired,
    timezone:       PropTypes.oneOf(moment.tz.names()),
}

DigitalClock.defaultProps = {
    displayWeekday: true,
    displaySeconds: true,
}


export default DigitalClock
