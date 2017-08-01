import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import mapping from './characters_mapping'
import {
    PartTopRight,
    PartTopLeft,
    PartRightTop,
    PartRightBottom,
    PartBottomRight,
    PartBottomLeft,
    PartLeftBottom,
    PartLeftTop,
    PartCenterTop,
    PartCenterBottom,
    PartCenterLeft,
    PartCenterRight,
    PartObliqueTopLeft,
    PartObliqueTopRight,
    PartObliqueBottomRight,
    PartObliqueBottomLeft,
} from './parts'

export default class DigitalChar extends PureComponent {
    static propTypes = {
        char: PropTypes.oneOf(Object.keys(mapping)).isRequired,
        color: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        stroke: PropTypes.number.isRequired,
        spacing: PropTypes.number.isRequired,
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }

    static defaultProps = {
        spacing: 2,
        x: 0,
        y: 0,
    }

    render() {
        const { char, color, width, height, stroke, spacing, x, y } = this.props

        const shape = mapping[`${char}`]

        const shapeProps = { width, height, stroke, spacing, color }

        return (
            <g transform={`translate(${x}, ${y})`}>
                {/* Top parts */}
                <PartTopLeft {...shapeProps} isActive={shape.topLeft} />
                <PartTopRight {...shapeProps} isActive={shape.topRight} />

                {/* Right parts */}
                <PartRightTop {...shapeProps} isActive={shape.rightTop} />
                <PartRightBottom {...shapeProps} isActive={shape.rightBottom} />

                {/* Bottom parts */}
                <PartBottomRight {...shapeProps} isActive={shape.bottomRight} />
                <PartBottomLeft {...shapeProps} isActive={shape.bottomLeft} />

                {/* Left parts */}
                <PartLeftBottom {...shapeProps} isActive={shape.leftBottom} />
                <PartLeftTop {...shapeProps} isActive={shape.leftTop} />

                {/* Center parts */}
                <PartCenterLeft {...shapeProps} isActive={shape.centerLeft} />
                <PartCenterRight {...shapeProps} isActive={shape.centerRight} />
                <PartCenterTop {...shapeProps} isActive={shape.centerTop} />
                <PartCenterBottom {...shapeProps} isActive={shape.centerBottom} />

                {/* Oblique parts */}
                <PartObliqueTopLeft {...shapeProps} isActive={shape.obliqueTopLeft} />
                <PartObliqueTopRight {...shapeProps} isActive={shape.obliqueTopRight} />
                <PartObliqueBottomRight {...shapeProps} isActive={shape.obliqueBottomRight} />
                <PartObliqueBottomLeft {...shapeProps} isActive={shape.obliqueBottomLeft} />
            </g>
        )
    }
}
