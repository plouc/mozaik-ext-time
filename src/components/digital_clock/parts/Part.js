import styled from 'styled-components'
import PropTypes from 'prop-types'

export const partPropTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    stroke: PropTypes.number.isRequired,
    spacing: PropTypes.number.isRequired,
}

export default styled.path`
    fill: ${props => props.color};
    opacity: ${props => (props.isActive ? 0.9 : 0.05)};
    transition: opacity 300ms;
`
