import React from 'react'
import PropTypes from 'prop-types'
import Part from './Part'

const HorizontalPart = ({ width: _width, stroke, spacing, ...props }) => {
    const width = _width - stroke - spacing

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

HorizontalPart.propTypes = {
    width: PropTypes.number.isRequired,
    stroke: PropTypes.number.isRequired,
    spacing: PropTypes.number.isRequired,
}

export default HorizontalPart
