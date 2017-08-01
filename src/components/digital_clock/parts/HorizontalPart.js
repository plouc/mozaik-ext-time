import React from 'react'
import Part, { partPropTypes } from './Part'

const HorizontalPart = ({ width: _width, stroke, spacing, ...props }) => {
    const width = (_width - stroke - spacing) / 2 - spacing / 2

    const pathInstructions = `
        M ${0} ${stroke / 2}
        L ${stroke / 2} ${0}
        H ${width - stroke / 2}
        L ${width} ${stroke / 2}
        L ${width - stroke / 2} ${stroke}
        H ${stroke / 2}
        L ${0} ${stroke / 2}
    `

    return <Part d={pathInstructions} {...props} />
}

HorizontalPart.propTypes = partPropTypes

export default HorizontalPart
