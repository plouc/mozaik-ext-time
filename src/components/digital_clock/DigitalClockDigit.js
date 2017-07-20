import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {
    PartTop,
    PartTopRight,
    PartBottomRight,
    PartBottom,
    PartBottomLeft,
    PartTopLeft,
    PartMiddle,
} from './digit_parts'

const digitsShapes = [
    // 0
    {
        top: 1,
        topRight: 1,
        middle: 0,
        bottomRight: 1,
        bottom: 1,
        bottomLeft: 1,
        topLeft: 1,
    },
    // 1
    {
        top: 0,
        topRight: 1,
        middle: 0,
        bottomRight: 1,
        bottom: 0,
        bottomLeft: 0,
        topLeft: 0,
    },
    // 2
    {
        top: 1,
        topRight: 1,
        middle: 1,
        bottomRight: 0,
        bottom: 1,
        bottomLeft: 1,
        topLeft: 0,
    },
    // 3
    {
        top: 1,
        topRight: 1,
        middle: 1,
        bottomRight: 1,
        bottom: 1,
        bottomLeft: 0,
        topLeft: 0,
    },
    // 4
    {
        top: 0,
        topRight: 1,
        middle: 1,
        bottomRight: 1,
        bottom: 0,
        bottomLeft: 0,
        topLeft: 1,
    },
    // 5
    {
        top: 1,
        topRight: 0,
        middle: 1,
        bottomRight: 1,
        bottom: 1,
        bottomLeft: 0,
        topLeft: 1,
    },
    // 6
    {
        top: 1,
        topRight: 0,
        middle: 1,
        bottomRight: 1,
        bottom: 1,
        bottomLeft: 1,
        topLeft: 1,
    },
    // 7
    {
        top: 1,
        topRight: 1,
        middle: 0,
        bottomRight: 1,
        bottom: 0,
        bottomLeft: 0,
        topLeft: 0,
    },
    // 8
    {
        top: 1,
        topRight: 1,
        middle: 1,
        bottomRight: 1,
        bottom: 1,
        bottomLeft: 1,
        topLeft: 1,
    },
    // 9
    {
        top: 1,
        topRight: 1,
        middle: 1,
        bottomRight: 1,
        bottom: 1,
        bottomLeft: 0,
        topLeft: 1,
    },
]

const DigitalClockDigit = ({
    number,
    color,
    width,
    height,
    stroke,
    spacing = 2,
    x = 0,
    y = 0,
}) => {
    const shape = digitsShapes[number]

    const shapeProps = { width, height, stroke, spacing, color }

    return (
        <g transform={`translate(${x}, ${y})`}>
            <PartTop {...shapeProps} isActive={shape.top} />
            <PartMiddle {...shapeProps} isActive={shape.middle} />
            <PartBottom {...shapeProps} isActive={shape.bottom} />

            <PartTopRight {...shapeProps} isActive={shape.topRight} />
            <PartBottomRight {...shapeProps} isActive={shape.bottomRight} />

            <PartTopLeft {...shapeProps} isActive={shape.topLeft} />
            <PartBottomLeft {...shapeProps} isActive={shape.bottomLeft} />
        </g>
    )
}

DigitalClockDigit.propTypes = {
    number: PropTypes.oneOf(_.range(10)),
    color: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    stroke: PropTypes.number.isRequired,
    spacing: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
}

export default DigitalClockDigit
