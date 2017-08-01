import React from 'react'
import { partPropTypes } from './Part'
import HorizontalPart from './HorizontalPart'

const PartBottomRight = props =>
    <HorizontalPart
        transform={`translate(${props.width / 2 + props.spacing / 2}, ${props.height -
            props.stroke})`}
        {...props}
    />

PartBottomRight.propTypes = partPropTypes

export default PartBottomRight
