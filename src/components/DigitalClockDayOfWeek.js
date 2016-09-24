import React, { Component, PropTypes } from 'react'
import classNames                      from 'classnames'


const DAYS_OF_WEEK = [
    'sun',
    'mon',
    'tue',
    'wed',
    'thu',
    'fri',
    'sat',
]


class DigitalClockDayOfWeek extends Component {
    render() {
        const { day } = this.props

        return (
            <div className="digital-clock__day-of-week">
                {DAYS_OF_WEEK.map((dayOfWeek, i) => (
                    <span
                        key={dayOfWeek}
                        className={classNames('digital-clock__day-of-week__item', {
                            'digital-clock__day-of-week__item--current': day === i
                        })}
                    >
                        {dayOfWeek}
                    </span>
                ))}
            </div>
        )
    }
}

DigitalClockDayOfWeek.propTypes = {
    day: PropTypes.number.isRequired,
}


export default DigitalClockDayOfWeek
