import React from 'react'
import { partPropTypes } from './Part'
import HorizontalPart from './HorizontalPart'

const PartBottomLeft = props =>
    <HorizontalPart
        transform={`translate(${props.stroke / 2 + props.spacing / 2}, ${props.height -
            props.stroke})`}
        {...props}
    />

PartBottomLeft.propTypes = partPropTypes

export default PartBottomLeft
