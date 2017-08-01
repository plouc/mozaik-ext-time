import React from 'react'
import { partPropTypes } from './Part'
import HorizontalPart from './HorizontalPart'

const PartTopLeft = props =>
    <HorizontalPart
        transform={`translate(${props.stroke / 2 + props.spacing / 2}, 0)`}
        {...props}
    />

PartTopLeft.propTypes = partPropTypes

export default PartTopLeft
