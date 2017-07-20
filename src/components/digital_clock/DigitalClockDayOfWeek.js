import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    text-transform: uppercase;
    margin-bottom: 2.4vmin;
    color: ${props => props.color};
`

const Item = styled.span`
    opacity: ${props => (props.isCurrent ? 1 : 0.35)};
    border-bottom: 1px solid transparent;
`

const DAYS_OF_WEEK = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

const DigitalClockDayOfWeek = ({ day, color }) =>
    <Container color={color}>
        {DAYS_OF_WEEK.map((dayOfWeek, i) =>
            <Item key={dayOfWeek} isCurrent={day === i}>
                {dayOfWeek}
            </Item>
        )}
    </Container>

DigitalClockDayOfWeek.propTypes = {
    day: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
}

export default DigitalClockDayOfWeek
