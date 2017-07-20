import React from 'react'
import PropTypes from 'prop-types'
import DigitalChar from './DigitalChar'

const DigitalWord = ({
    word,
    charWidth,
    charHeight,
    stroke,
    color,
    spacing,
}) => {
    return (
        <g>
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

DigitalWord.propTypes = {
    word: PropTypes.string.isRequired,
    charWidth: PropTypes.number.isRequired,
    charHeight: PropTypes.number.isRequired,
    stroke: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    spacing: PropTypes.number.isRequired,
}

DigitalWord.defaultProps = {}

export default DigitalWord
