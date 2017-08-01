import React from 'react'
import { partPropTypes } from './Part'
import VerticalPart from './VerticalPart'

const PartRightTop = props =>
    <VerticalPart
        transform={`translate(${props.width - props.stroke}, ${props.stroke / 2 +
            props.spacing / 2})`}
        {...props}
    />

PartRightTop.propTypes = partPropTypes

export default PartRightTop
