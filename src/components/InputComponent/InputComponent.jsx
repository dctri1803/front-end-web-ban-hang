import { Input } from 'antd'
import React from 'react'

export const InputComponent = ({size, placeholder, style, ...rests}) => {
    return (
        <Input
            size={size}
            placeholder={placeholder}
            style={ style}
            {...rests}
        />
    )
}
