import React from 'react'
import { WrapperInputStyle } from './style';

const InputForm = (props) => {
    const { placeholder = 'Nhập text', ...rests } = props
    return (
        <WrapperInputStyle placeholder={placeholder} {...rests} />
    )
}

export default InputForm