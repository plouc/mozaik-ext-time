import styled from 'styled-components'

export default styled.path`
    fill: ${props => props.color};
    opacity: ${props => (props.isActive ? 0.9 : 0.1)};
    transition: opacity 600ms;
`
