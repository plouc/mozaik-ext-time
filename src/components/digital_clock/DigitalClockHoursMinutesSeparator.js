import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Dot = styled.rect`
    fill: ${props => props.color};
    opacity: 0.9;
`

const DigitalClockHoursMinutesSeparator = ({ height, stroke, color, x }) =>
    <g transform={`translate(${x})`}>
        <Dot
            width={stroke}
            height={stroke}
            color={color}
            transform={`translate(0, ${height / 2 - height * 0.16 - stroke})`}
        />
        <Dot
            width={stroke}
            height={stroke}
            color={color}
            transform={`translate(0, ${height / 2 + height * 0.16})`}
        />
    </g>

DigitalClockHoursMinutesSeparator.propTypes = {
    height: PropTypes.number.isRequired,
    stroke: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    x: PropTypes.number.isRequired,
}

export default DigitalClockHoursMinutesSeparator
