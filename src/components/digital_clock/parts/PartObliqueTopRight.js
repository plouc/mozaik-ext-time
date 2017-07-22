import React from 'react'
import { partPropTypes } from './Part'
import ObliquePart from './ObliquePart'

const PartObliqueTopRight = props =>
    <ObliquePart
        {...props}
        transform={`translate(${props.width -
            props.stroke -
            props.spacing / 2}, ${props.stroke +
            props.spacing / 2}) scale(-1, 1)`}
    />

PartObliqueTopRight.propTypes = partPropTypes

export default PartObliqueTopRight
