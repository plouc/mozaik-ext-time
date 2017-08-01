import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import DigitalChar from './DigitalChar'

export default class DigitalWord extends PureComponent {
    static propTypes = {
        word: PropTypes.string.isRequired,
        charWidth: PropTypes.number.isRequired,
        charHeight: PropTypes.number.isRequired,
        stroke: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
        spacing: PropTypes.number.isRequired,
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }

    static defaultProps = {
        x: 0,
        y: 0,
    }

    render() {
        const { word, charWidth, charHeight, stroke, color, spacing, x, y } = this.props

        return (
            <g transform={`translate(${x}, ${y})`}>
                {word
                    .split('')
                    .map((char, i) =>
                        <DigitalChar
                            key={`${char}.${i}`}
                            char={char}
                            color={color}
                            width={charWidth}
                            height={charHeight}
                            stroke={stroke}
                            x={i * (charWidth + spacing)}
                        />
                    )}
            </g>
        )
    }
}
