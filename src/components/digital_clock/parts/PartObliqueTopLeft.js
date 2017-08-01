import React from 'react'
import { partPropTypes } from './Part'
import ObliquePart from './ObliquePart'

const PartObliqueTopLeft = props =>
    <ObliquePart
        {...props}
        transform={`translate(${props.stroke + props.spacing / 2}, ${props.stroke +
            props.spacing / 2})`}
    />

PartObliqueTopLeft.propTypes = partPropTypes

export default PartObliqueTopLeft
