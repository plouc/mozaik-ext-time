import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import 'moment-timezone'
import styled, { withTheme } from 'styled-components'
import Measure from 'react-measure'
import { Widget } from '@mozaik/ui'
import DigitalClockDayOfWeek from './DigitalClockDayOfWeek'
import DigitalClockDigit from './DigitalClockDigit'
import DigitalClockHoursMinutesSeparator from './DigitalClockHoursMinutesSeparator'

const RATIO = 0.22

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    height: 100%;
    width: 100%;
    padding: 4vmin;
`

/**
 * @param {string|undefined} timezoneName - The timezone you wish to use
 * @returns {{ now: moment, parts: Array<number> }} The resulting object
 */
const getCurrentTimeParts = timezoneName => {
    const currentTime = timezoneName
        ? moment().tz(timezoneName)
        : moment().tz('Asia/Tokyo')

    const formatted = currentTime.format('hhmmss')

    return {
        now: currentTime,
        parts: formatted.split('').map(part => parseInt(part, 10)),
    }
}

class DigitalClock extends Component {
    static propTypes = {
        displayWeekday: PropTypes.bool.isRequired,
        displaySeconds: PropTypes.bool.isRequired,
        timezone: PropTypes.oneOf(moment.tz.names()),
        color: PropTypes.string,
        theme: PropTypes.object.isRequired,
    }

    static defaultProps = {
        displayWeekday: true,
        displaySeconds: true,
    }

    state = {
        dimensions: {
            width: -1,
            height: -1,
        },
    }

    constructor(props) {
        super(props)

        this.state = {
            ...getCurrentTimeParts(props.timezone),
            dimensions: {
                width: -1,
                height: -1,
            },
        }
    }

    componentDidMount() {
        setInterval(() => {
            this.setState(getCurrentTimeParts(this.props.timezone))
        }, 1000)
    }

    render() {
        const {
            displayWeekday,
            displaySeconds,
            color: _color,
            theme,
        } = this.props
        const {
            now,
            parts,
            dimensions: { width: _width, height: _height },
        } = this.state

        const color = _color || theme.root.color

        const shouldRender = _width > 0 && _height > 0

        let width = _width
        let height = _height
        const ratio = width / height
        //console.log('ratio', ratio)
        if (ratio > RATIO) {
            height = width * RATIO
        } else if (ratio < RATIO) {
            width = height / RATIO
        }

        const digitWidth = width * 0.14 // * 4 => .56
        const digitSpacing = width * 0.034 // * 4 => .16
        const digitStroke = digitWidth * 0.13

        const secondDigitWidth = width * 0.1 // * 2 => .20
        const secondDigitSpacing = width * 0.02 // * 1 => .02
        const secondDigitStroke = secondDigitWidth * 0.15

        let hoursX = 0
        if (!displaySeconds) {
            hoursX =
                (width - (digitWidth * 4 + digitStroke + digitSpacing * 4)) / 2
        }
        const separatorX = hoursX + (digitWidth + digitSpacing) * 2
        const minutesX =
            hoursX +
            (digitWidth + digitSpacing) * 2 +
            digitStroke +
            digitSpacing

        const secondsX = width - (secondDigitWidth * 2 + secondDigitSpacing)
        const secondsY = height * 0.34

        return (
            <Widget>
                <Container>
                    {displayWeekday &&
                        <DigitalClockDayOfWeek day={now.day()} color={color} />}
                    <Measure
                        onResize={contentRect => {
                            this.setState({ dimensions: contentRect.entry })
                        }}
                    >
                        {({ measureRef }) =>
                            <div
                                ref={measureRef}
                                style={{
                                    flex: 1,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                {shouldRender &&
                                    <svg width={width} height={height}>
                                        <DigitalClockDigit
                                            number={parts[0]}
                                            width={digitWidth}
                                            height={height}
                                            x={hoursX}
                                            stroke={digitStroke}
                                            color={color}
                                        />
                                        <DigitalClockDigit
                                            number={parts[1]}
                                            width={digitWidth}
                                            height={height}
                                            x={
                                                hoursX +
                                                digitWidth +
                                                digitSpacing
                                            }
                                            stroke={digitStroke}
                                            color={color}
                                        />
                                        <DigitalClockHoursMinutesSeparator
                                            height={height}
                                            stroke={digitStroke}
                                            x={separatorX}
                                            color={color}
                                        />
                                        <DigitalClockDigit
                                            number={parts[2]}
                                            width={digitWidth}
                                            height={height}
                                            x={minutesX}
                                            stroke={digitStroke}
                                            color={color}
                                        />
                                        <DigitalClockDigit
                                            number={parts[3]}
                                            width={digitWidth}
                                            height={height}
                                            x={
                                                minutesX +
                                                digitWidth +
                                                digitSpacing
                                            }
                                            stroke={digitStroke}
                                            color={color}
                                        />
                                        {displaySeconds &&
                                            <DigitalClockDigit
                                                number={parts[4]}
                                                width={secondDigitWidth}
                                                height={height * 0.66}
                                                x={secondsX}
                                                y={secondsY}
                                                stroke={secondDigitStroke}
                                                color={color}
                                            />}
                                        {displaySeconds &&
                                            <DigitalClockDigit
                                                number={parts[5]}
                                                width={secondDigitWidth}
                                                height={height * 0.66}
                                                x={
                                                    secondsX +
                                                    secondDigitWidth +
                                                    secondDigitSpacing
                                                }
                                                y={secondsY}
                                                stroke={secondDigitStroke}
                                                color={color}
                                            />}
                                    </svg>}
                            </div>}
                    </Measure>
                </Container>
            </Widget>
        )
    }
}

export default withTheme(DigitalClock)
