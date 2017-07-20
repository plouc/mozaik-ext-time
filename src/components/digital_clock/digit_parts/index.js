import React from 'react'
import PropTypes from 'prop-types'
import HorizontalPart from './HorizontalPart'
import VerticalPart from './VerticalPart'

export const PartTop = props =>
    <HorizontalPart
        transform={`translate(${props.stroke / 2 + props.spacing / 2}, 0)`}
        {...props}
    />

PartTop.propTypes = {
    stroke: PropTypes.number.isRequired,
    spacing: PropTypes.number.isRequired,
}

export const PartTopRight = props =>
    <VerticalPart
        transform={`translate(${props.width - props.stroke}, ${props.stroke /
            2 +
            props.spacing / 2})`}
        {...props}
    />

PartTopRight.propTypes = {
    width: PropTypes.number.isRequired,
    stroke: PropTypes.number.isRequired,
    spacing: PropTypes.number.isRequired,
}

export const PartBottomRight = props =>
    <VerticalPart
        transform={`translate(${props.width - props.stroke}, ${props.height /
            2 +
            props.spacing / 2})`}
        {...props}
    />

PartBottomRight.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    stroke: PropTypes.number.isRequired,
    spacing: PropTypes.number.isRequired,
}

export const PartBottom = props =>
    <HorizontalPart
        transform={`translate(${props.stroke / 2 +
            props.spacing / 2}, ${props.height - props.stroke})`}
        {...props}
    />

PartBottom.propTypes = {
    height: PropTypes.number.isRequired,
    stroke: PropTypes.number.isRequired,
    spacing: PropTypes.number.isRequired,
}

export const PartBottomLeft = props =>
    <VerticalPart
        transform={`translate(0, ${props.height / 2 + props.spacing / 2})`}
        {...props}
    />

PartBottomLeft.propTypes = {
    height: PropTypes.number.isRequired,
    spacing: PropTypes.number.isRequired,
}

export const PartTopLeft = props =>
    <VerticalPart
        transform={`translate(0, ${props.stroke / 2 + props.spacing / 2})`}
        {...props}
    />

PartTopLeft.propTypes = {
    stroke: PropTypes.number.isRequired,
    spacing: PropTypes.number.isRequired,
}

export const PartMiddle = props =>
    <HorizontalPart
        transform={`translate(${props.stroke / 2 +
            props.spacing / 2}, ${props.height / 2 - props.stroke / 2})`}
        {...props}
    />

PartMiddle.propTypes = {
    height: PropTypes.number.isRequired,
    stroke: PropTypes.number.isRequired,
    spacing: PropTypes.number.isRequired,
}
