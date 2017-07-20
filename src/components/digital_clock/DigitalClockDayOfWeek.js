import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-content: stretch;
    text-transform: uppercase;
    margin-bottom: 2.4vmin;
    color: ${props => props.color};
`

const Item = styled.span`
    flex: 1;
    text-align: center;
    opacity: ${props => (props.isCurrent ? 1 : 0.15)};
    border-bottom: 1px solid ${props => props.color};
    padding-bottom: 0.6vmin;
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
