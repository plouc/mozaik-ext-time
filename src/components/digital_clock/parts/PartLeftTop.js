import React from 'react'
import { partPropTypes } from './Part'
import VerticalPart from './VerticalPart'

const PartLeftTop = props =>
    <VerticalPart
        transform={`translate(0, ${props.stroke / 2 + props.spacing / 2})`}
        {...props}
    />

PartLeftTop.propTypes = partPropTypes

export default PartLeftTop
