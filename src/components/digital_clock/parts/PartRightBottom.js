import React from 'react'
import { partPropTypes } from './Part'
import VerticalPart from './VerticalPart'

const PartRightBottom = props =>
    <VerticalPart
        transform={`translate(${props.width - props.stroke}, ${props.height /
            2 +
            props.spacing / 2})`}
        {...props}
    />

PartRightBottom.propTypes = partPropTypes

export default PartRightBottom
