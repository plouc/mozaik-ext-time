import React from 'react'
import { partPropTypes } from './Part'
import VerticalPart from './VerticalPart'

const PartCenterTop = props =>
    <VerticalPart
        transform={`translate(${props.width / 2 -
            props.stroke / 2}, ${props.stroke / 2 + props.spacing / 2})`}
        {...props}
    />

PartCenterTop.propTypes = partPropTypes

export default PartCenterTop
