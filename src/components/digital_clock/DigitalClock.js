import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import 'moment-timezone'
import styled from 'styled-components'
import Measure from 'react-measure'
import { Widget } from '@mozaik/ui'
import DigitalClockDate from './DigitalClockDate'
import DigitalClockTime from './DigitalClockTime'

const Container = styled.div`
    padding: 3vmin;
    width: 100%;
    height: 100%;
`

const innerContainerStyle = {
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

const getDate = timezone => (timezone ? moment().tz(timezone) : moment())

export default class DigitalClock extends Component {
    static propTypes = {
        displayDate: PropTypes.bool.isRequired,
        displaySeconds: PropTypes.bool.isRequired,
        timezone: PropTypes.oneOf(moment.tz.names()),
        color: PropTypes.string,
        theme: PropTypes.object.isRequired,
    }

    static defaultProps = {
        displayDate: true,
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
            date: getDate(props.timezone),
            dimensions: {
                width: -1,
                height: -1,
            },
        }
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({ date: getDate(this.props.timezone) })
        }, 1000)
    }

    render() {
        const { displayDate, displaySeconds, color: _color, theme } = this.props
        const { date, dimensions: { width, height } } = this.state

        const color = _color || theme.root.color

        const shouldRender = width > 0 && height > 0
        const shouldRenderDate = shouldRender && displayDate

        return (
            <Widget>
                <Container>
                    <Measure
                        onResize={contentRect => {
                            this.setState({ dimensions: contentRect.entry })
                        }}
                    >
                        {({ measureRef }) =>
                            <div ref={measureRef} style={innerContainerStyle}>
                                {shouldRenderDate &&
                                    <DigitalClockDate
                                        date={date}
                                        width={width}
                                        color={color}
                                    />}
                                {shouldRender &&
                                    <DigitalClockTime
                                        date={date}
                                        displaySeconds={displaySeconds}
                                        width={width}
                                        color={color}
                                    />}
                            </div>}
                    </Measure>
                </Container>
            </Widget>
        )
    }
}
