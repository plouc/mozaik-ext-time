import React, { Component, PropTypes } from 'react'
import _                               from 'lodash'
import classNames                      from 'classnames'


const digitsShapes = [
    { top: 1, 'top-right': 1, middle: 0, 'bottom-right': 1, bottom: 1, 'bottom-left': 1, 'top-left': 1 }, // 0
    { top: 0, 'top-right': 1, middle: 0, 'bottom-right': 1, bottom: 0, 'bottom-left': 0, 'top-left': 0 }, // 1
    { top: 1, 'top-right': 1, middle: 1, 'bottom-right': 0, bottom: 1, 'bottom-left': 1, 'top-left': 0 }, // 2
    { top: 1, 'top-right': 1, middle: 1, 'bottom-right': 1, bottom: 1, 'bottom-left': 0, 'top-left': 0 }, // 3
    { top: 0, 'top-right': 1, middle: 1, 'bottom-right': 1, bottom: 0, 'bottom-left': 0, 'top-left': 1 }, // 4
    { top: 1, 'top-right': 0, middle: 1, 'bottom-right': 1, bottom: 1, 'bottom-left': 0, 'top-left': 1 }, // 5
    { top: 1, 'top-right': 0, middle: 1, 'bottom-right': 1, bottom: 1, 'bottom-left': 1, 'top-left': 1 }, // 6
    { top: 1, 'top-right': 1, middle: 0, 'bottom-right': 1, bottom: 0, 'bottom-left': 0, 'top-left': 0 }, // 7
    { top: 1, 'top-right': 1, middle: 1, 'bottom-right': 1, bottom: 1, 'bottom-left': 1, 'top-left': 1 }, // 8
    { top: 1, 'top-right': 1, middle: 1, 'bottom-right': 1, bottom: 1, 'bottom-left': 0, 'top-left': 1 }, // 9
]


class DigitalClockDigit extends Component {
    render() {
        const { number, type } = this.props

        const parts = []
        _.forOwn(digitsShapes[number], (visible, part) => {
            parts.push(
                <span
                    key={part}
                    className={classNames('digital-clock__digit__part', {
                        [`digital-clock__digit__part--${part}`]: true,
                        'digital-clock__digit__part--visible':   visible === 1,
                    })}
                />
            )
        })

        return (
            <div className={`digital-clock__digit digital-clock__digit--${type}`}>
                {parts}
            </div>
        )
    }
}

DigitalClockDigit.propTypes = {
    number: PropTypes.oneOf(_.range(10)),
    type:   PropTypes.string.isRequired,
}


export default DigitalClockDigit
