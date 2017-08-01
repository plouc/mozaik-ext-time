import React from 'react'
import { partPropTypes } from './Part'
import HorizontalPart from './HorizontalPart'

const PartCenterLeft = props =>
    <HorizontalPart
        transform={`translate(${props.stroke / 2 + props.spacing / 2}, ${props.height / 2 -
            props.stroke / 2})`}
        {...props}
    />

PartCenterLeft.propTypes = partPropTypes

export default PartCenterLeft
