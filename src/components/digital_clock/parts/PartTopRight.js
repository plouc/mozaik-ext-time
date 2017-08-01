import React from 'react'
import { partPropTypes } from './Part'
import HorizontalPart from './HorizontalPart'

const PartTopRight = props =>
    <HorizontalPart transform={`translate(${props.width / 2 + props.spacing / 2}, 0)`} {...props} />

PartTopRight.propTypes = partPropTypes

export default PartTopRight
