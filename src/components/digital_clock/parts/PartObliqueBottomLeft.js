import React from 'react'
import { partPropTypes } from './Part'
import ObliquePart from './ObliquePart'

const PartObliqueBottomLeft = props =>
    <ObliquePart
        {...props}
        transform={`translate(${props.width / 2 -
            props.stroke / 2 -
            props.spacing / 2}, ${props.height / 2 +
            props.stroke / 2 +
            props.spacing / 2}) scale(-1, 1)`}
    />

PartObliqueBottomLeft.propTypes = partPropTypes

export default PartObliqueBottomLeft
