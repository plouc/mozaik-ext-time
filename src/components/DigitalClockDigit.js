import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import styled, { withTheme } from 'styled-components'

const Part = styled.path`
    fill: ${props => props.theme.root.color};
    opacity: ${props => (props.isActive ? 0.9 : 0.1)};
    transition: opacity 400ms;
`

const digitsShapes = [
    {
        top: 1,
        topRight: 1,
        middle: 0,
        bottomRight: 1,
        bottom: 1,
        bottomLeft: 1,
        topLeft: 1,
    }, // 0
    {
        top: 0,
        topRight: 1,
        middle: 0,
        bottomRight: 1,
        bottom: 0,
        bottomLeft: 0,
        topLeft: 0,
    }, // 1
    {
        top: 1,
        topRight: 1,
        middle: 1,
        bottomRight: 0,
        bottom: 1,
        bottomLeft: 1,
        topLeft: 0,
    }, // 2
    {
        top: 1,
        topRight: 1,
        middle: 1,
        bottomRight: 1,
        bottom: 1,
        bottomLeft: 0,
        topLeft: 0,
    }, // 3
    {
        top: 0,
        topRight: 1,
        middle: 1,
        bottomRight: 1,
        bottom: 0,
        bottomLeft: 0,
        topLeft: 1,
    }, // 4
    {
        top: 1,
        topRight: 0,
        middle: 1,
        bottomRight: 1,
        bottom: 1,
        bottomLeft: 0,
        topLeft: 1,
    }, // 5
    {
        top: 1,
        topRight: 0,
        middle: 1,
        bottomRight: 1,
        bottom: 1,
        bottomLeft: 1,
        topLeft: 1,
    }, // 6
    {
        top: 1,
        topRight: 1,
        middle: 0,
        bottomRight: 1,
        bottom: 0,
        bottomLeft: 0,
        topLeft: 0,
    }, // 7
    {
        top: 1,
        topRight: 1,
        middle: 1,
        bottomRight: 1,
        bottom: 1,
        bottomLeft: 1,
        topLeft: 1,
    }, // 8
    {
        top: 1,
        topRight: 1,
        middle: 1,
        bottomRight: 1,
        bottom: 1,
        bottomLeft: 0,
        topLeft: 1,
    }, // 9
]

const HorizontalPart = ({ width: _width, stroke, spacing, ...props }) => {
    const width = _width - stroke - spacing

    const pathInstructions = `
        M ${0} ${stroke / 2}
        L ${stroke / 2} ${0}
        H ${width - stroke / 2}
        L ${width} ${stroke / 2}
        L ${width - stroke / 2} ${stroke}
        H ${stroke / 2}
        L ${0} ${stroke / 2}
    `

    return <Part d={pathInstructions} {...props} />
}
const PartTop = props =>
    <HorizontalPart
        transform={`translate(${props.stroke / 2 + props.spacing / 2}, 0)`}
        {...props}
    />
const PartMiddle = props =>
    <HorizontalPart
        transform={`translate(${props.stroke / 2 +
            props.spacing / 2}, ${props.height / 2 - props.stroke / 2})`}
        {...props}
    />
const PartBottom = props =>
    <HorizontalPart
        transform={`translate(${props.stroke / 2 +
            props.spacing / 2}, ${props.height - props.stroke})`}
        {...props}
    />

const VerticalPart = ({ height: _height, stroke, spacing, ...props }) => {
    const height = _height / 2 - stroke / 2 - spacing

    const pathInstructions = `
        M ${stroke / 2} ${0}
        L ${stroke} ${stroke / 2}
        V ${height - stroke / 2}
        L ${stroke / 2} ${height}
        L ${0} ${height - stroke / 2}
        V ${0} ${stroke / 2}
        L ${stroke / 2} ${0}
    `

    return <Part d={pathInstructions} {...props} />
}
const PartTopRight = props =>
    <VerticalPart
        transform={`translate(${props.width - props.stroke}, ${props.stroke /
            2 +
            props.spacing / 2})`}
        {...props}
    />
const PartBottomRight = props =>
    <VerticalPart
        transform={`translate(${props.width - props.stroke}, ${props.height /
            2 +
            props.spacing / 2})`}
        {...props}
    />
const PartTopLeft = props =>
    <VerticalPart
        transform={`translate(0, ${props.stroke / 2 + props.spacing / 2})`}
        {...props}
    />
const PartBottomLeft = props =>
    <VerticalPart
        transform={`translate(0, ${props.height / 2 + props.spacing / 2})`}
        {...props}
    />

class DigitalClockDigit extends Component {
    static propTypes = {
        number: PropTypes.oneOf(_.range(10)),
        type: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        stroke: PropTypes.number.isRequired,
        spacing: PropTypes.number.isRequired,
    }

    static defaultProps = {
        width: 46,
        height: 74,
        stroke: 5, //6
        spacing: 2, //1
    }

    render() {
        const {
            number,
            type,
            width,
            height,
            stroke,
            spacing,
            theme,
        } = this.props

        const shape = digitsShapes[number]

        const shapeProps = { width, height, stroke, spacing, theme }

        return (
            <g>
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
}

export default withTheme(DigitalClockDigit)
