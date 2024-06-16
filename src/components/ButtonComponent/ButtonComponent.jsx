import { Button } from 'antd'
import React from 'react'

export const ButtonComponent = ({ size, styleButton, styleTextButton, textButton, ...rests }) => {
    return (
        <Button
            size={size}
            style={styleButton}
            {...rests}
        >
            <span style={styleTextButton}>{textButton}</span>
        </Button>
    )
}
