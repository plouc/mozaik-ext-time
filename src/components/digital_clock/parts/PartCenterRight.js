import React from 'react'
import { partPropTypes } from './Part'
import HorizontalPart from './HorizontalPart'

const PartCenterRight = props =>
    <HorizontalPart
        transform={`translate(${props.width / 2 + props.spacing / 2}, ${props.height / 2 -
            props.stroke / 2})`}
        {...props}
    />

PartCenterRight.propTypes = partPropTypes

export default PartCenterRight
