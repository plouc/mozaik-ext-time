import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import 'moment-timezone'
import styled from 'styled-components'
import Measure from 'react-measure'
import { Widget } from '@mozaik/ui'
import DigitalClockDayOfWeek from './DigitalClockDayOfWeek'
import DigitalClockDigit from './DigitalClockDigit'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    //background: $digital-clock-bg-color;
    height: 100%;
    width: 100%;
    padding: 2vmin;
    //border-radius: $widget-border-radius;
`

const DigitsPair = styled.div`display: flex;`

const SecondsDigitsPair = DigitsPair.extend`margin-left: 1.4vmin;`

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
    }

    static defaultProps = {
        displayWeekday: true,
        displaySeconds: true,
    }

    state = {
        dimensions: {
            width: -1,
            height: -1
        }
    }

    constructor(props) {
        super(props)

        this.state = {
            ...getCurrentTimeParts(props.timezone),
            dimensions: {
                width: -1,
                height: -1
            }
        }
    }

    componentDidMount() {
        setInterval(() => {
            this.setState(getCurrentTimeParts(this.props.timezone))
        }, 1000)
    }

    render() {
        const { displayWeekday, displaySeconds } = this.props
        const { now, parts, dimensions: { width, height } } = this.state

        console.log(width, height)

        const shouldRender = width > 0 && height > 0

        return (
            <Widget>
                <Container>
                    {displayWeekday &&
                        <DigitalClockDayOfWeek day={now.day()} />}
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
                                }}
                            >
                                {shouldRender && (
                                    <svg width={width} height={height}>
                                        <DigitalClockDigit
                                            number={parts[4]}
                                            type="hours"
                                            width={width / 10}
                                            height={height}
                                        />
                                        <DigitalClockDigit
                                            number={parts[5]}
                                            type="hours"
                                            width={width / 10}
                                            height={height}
                                        />
                                    </svg>
                                )}
                                {/*
                                <DigitsPair>
                                    <DigitalClockDigit
                                        number={parts[0]}
                                        type="hours"
                                    />
                                    <DigitalClockDigit
                                        number={parts[1]}
                                        type="hours"
                                    />
                                </DigitsPair>
                                <div className="digital-clock__separator" />
                                <DigitsPair>
                                    <DigitalClockDigit
                                        number={parts[2]}
                                        type="minutes"
                                    />
                                    <DigitalClockDigit
                                        number={parts[3]}
                                        type="minutes"
                                    />
                                </DigitsPair>
                                {displaySeconds &&
                                    <SecondsDigitsPair>
                                        <DigitalClockDigit
                                            number={parts[4]}
                                            type="seconds"
                                            width={28}
                                            stroke={3}
                                            height={46}
                                        />
                                        <DigitalClockDigit
                                            number={parts[5]}
                                            type="seconds"
                                            width={28}
                                            stroke={3}
                                            height={46}
                                        />
                                    </SecondsDigitsPair>}
                                 */}
                            </div>}
                    </Measure>
                </Container>
            </Widget>
        )
    }
}

export default DigitalClock
