import React from 'react'
import { ThemeProvider } from 'styled-components'
import { shallow } from 'enzyme'

export const shallowWithTheme = (children, options) => {
    const wrapper = shallow(
        <ThemeProvider theme={{}}>
            {children}
        </ThemeProvider>,
        options
    )
    const instance = wrapper.root.instance()

    return wrapper.shallow({ context: instance.getChildContext() })
}
