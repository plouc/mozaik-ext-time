import React from 'react'
import { partPropTypes } from './Part'
import VerticalPart from './VerticalPart'

const PartLeftBottom = props =>
    <VerticalPart
        transform={`translate(0, ${props.height / 2 + props.spacing / 2})`}
        {...props}
    />

PartLeftBottom.propTypes = partPropTypes

export default PartLeftBottom
