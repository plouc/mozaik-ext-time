import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import DigitalWord from './DigitalWord'

const Container = styled.div`
    margin-bottom: 4vmin;
    display: flex;
    justify-content: space-between;
`

export default class DigitalClockDate extends Component {
    static propTypes = {
        date: PropTypes.shape({
            format: PropTypes.func.isRequired,
        }).isRequired,
        width: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
    }

    shouldComponentUpdate({ date, color, width }) {
        return (
            color !== this.props.color ||
            width !== this.props.width ||
            date.format('YYYY-MM-DD') !== this.props.date.format('YYYY-MM-DD')
        )
    }

    render() {
        const { date, width, color } = this.props

        const dateHeight = width * 0.1
        const dateCharWidth = dateHeight * 0.6
        const dateSpacing = dateCharWidth * 0.22
        const dateStroke = dateCharWidth * 0.1

        return (
            <Container
                style={{
                    width,
                    height: dateHeight,
                }}
            >
                <svg
                    width={dateCharWidth * 4 + dateSpacing * 3}
                    height={dateHeight}
                >
                    <DigitalWord
                        word={date.format('YYYY')}
                        charWidth={dateCharWidth}
                        charHeight={dateHeight}
                        stroke={dateStroke}
                        spacing={dateSpacing}
                        color={color}
                    />
                </svg>
                <svg
                    width={dateCharWidth * 2 + dateSpacing}
                    height={dateHeight}
                >
                    <DigitalWord
                        word={date.format('MM')}
                        charWidth={dateCharWidth}
                        charHeight={dateHeight}
                        stroke={dateStroke}
                        spacing={dateSpacing}
                        color={color}
                    />
                </svg>
                <svg
                    width={dateCharWidth * 6 + dateSpacing * 5}
                    height={dateHeight}
                >
                    <DigitalWord
                        word={date.format('DD')}
                        charWidth={dateCharWidth}
                        charHeight={dateHeight}
                        stroke={dateStroke}
                        spacing={dateSpacing}
                        color={color}
                    />
                    <DigitalWord
                        word={date.format('ddd').toUpperCase()}
                        charWidth={dateCharWidth}
                        charHeight={dateHeight}
                        stroke={dateStroke}
                        spacing={dateSpacing}
                        color={color}
                        x={dateCharWidth * 3 + dateSpacing * 3}
                    />
                </svg>
            </Container>
        )
    }
}
