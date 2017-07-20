import React from 'react'
import { partPropTypes } from './Part'
import VerticalPart from './VerticalPart'

const PartCenterBottom = props =>
    <VerticalPart
        transform={`translate(${props.width / 2 -
            props.stroke / 2}, ${props.height / 2 + props.spacing / 2})`}
        {...props}
    />

PartCenterBottom.propTypes = partPropTypes

export default PartCenterBottom
