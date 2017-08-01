import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DigitalClockHoursMinutesSeparator from './DigitalClockHoursMinutesSeparator'
import DigitalWord from './DigitalWord'

export default class DigitalClockTime extends Component {
    static propTypes = {
        date: PropTypes.shape({
            format: PropTypes.func.isRequired,
        }).isRequired,
        displaySeconds: PropTypes.bool.isRequired,
        width: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
    }

    render() {
        const { date, displaySeconds, width, color } = this.props

        const timeHeight = width * 0.2
        const secondsHeight = timeHeight * 0.74

        const timeCharWidth = timeHeight * 0.6
        const secondsCharWidth = timeCharWidth * 0.74

        const timeSpacing = timeCharWidth * 0.22
        const secondsSpacing = timeSpacing * 0.74

        const timeStroke = timeCharWidth * 0.1
        const secondsStroke = timeStroke * 0.74

        return (
            <svg width={width} height={timeHeight}>
                <DigitalWord
                    word={date.format('hh')}
                    charWidth={timeCharWidth}
                    charHeight={timeHeight}
                    x={0}
                    stroke={timeStroke}
                    color={color}
                    spacing={timeSpacing}
                />
                <DigitalClockHoursMinutesSeparator
                    height={timeHeight}
                    stroke={timeStroke}
                    x={timeCharWidth * 2 + timeSpacing * 3}
                    color={color}
                />
                <DigitalWord
                    word={date.format('mm')}
                    charWidth={timeCharWidth}
                    charHeight={timeHeight}
                    x={timeCharWidth * 2 + timeSpacing * 5 + timeStroke}
                    stroke={timeStroke}
                    color={color}
                    spacing={timeSpacing}
                />
                {displaySeconds &&
                    <DigitalWord
                        word={date.format('ss')}
                        charWidth={secondsCharWidth}
                        charHeight={secondsHeight}
                        x={width - (secondsCharWidth * 2 + 10)}
                        y={timeHeight - secondsHeight}
                        stroke={secondsStroke}
                        color={color}
                        spacing={secondsSpacing}
                    />}
            </svg>
        )
    }
}
