import React from 'react'
import Part, { partPropTypes } from './Part'

const ObliquePart = ({ width, height, stroke, ...props }) => {
    const endX = width / 2 - stroke * 2
    const endY = height / 2 - stroke * 2

    const pathInstructions = `
        M 0 0
        H ${stroke * 1.4 / 2}
        L ${endX} ${endY - stroke * 1.4 / 2}
        L ${endX} ${endY}
        L ${endX - stroke * 1.4 / 2} ${endY}
        L 0 ${stroke * 1.4 / 2}
    `

    return <Part d={pathInstructions} {...props} />
}

ObliquePart.propTypes = partPropTypes

export default ObliquePart
