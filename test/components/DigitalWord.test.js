import React from 'react'
import { shallow } from 'enzyme'
import DigitalWord from '../../src/components/digital_clock/DigitalWord'
import DigitalChar from '../../src/components/digital_clock/DigitalChar'

test('should display multiple characters', () => {
    const wrapper = shallow(
        <DigitalWord
            word="TEST"
            charWidth={36}
            charHeight={24}
            stroke={2}
            spacing={6}
            color="#F00"
        />
    )

    const chars = wrapper.find(DigitalChar)
    expect(chars.length).toBe(4)

    expect(chars.at(0).prop('char')).toBe('T')
    expect(chars.at(1).prop('char')).toBe('E')
    expect(chars.at(2).prop('char')).toBe('S')
    expect(chars.at(3).prop('char')).toBe('T')
})

test('should position characters x according to spacing', () => {
    const charWidth = 36
    const spacing = 6

    const wrapper = shallow(
        <DigitalWord
            word="TEST"
            charWidth={charWidth}
            charHeight={24}
            stroke={2}
            spacing={spacing}
            color="#F00"
        />
    )

    const chars = wrapper.find(DigitalChar)
    expect(chars.length).toBe(4)

    expect(chars.at(0).prop('x')).toBe(0)
    expect(chars.at(1).prop('x')).toBe(charWidth + spacing)
    expect(chars.at(2).prop('x')).toBe(charWidth * 2 + spacing * 2)
    expect(chars.at(3).prop('x')).toBe(charWidth * 3 + spacing * 3)
})

test('should translate container according to x/y props', () => {
    const wrapper = shallow(
        <DigitalWord
            word="TEST"
            charWidth={36}
            charHeight={24}
            stroke={2}
            spacing={6}
            color="#F00"
            x={100}
            y={50}
        />
    )

    expect(wrapper.prop('transform')).toBe('translate(100, 50)')
})
