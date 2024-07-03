import { Button } from 'antd'
import React from 'react'

export const ButtonComponent = ({ size, styleButton, styleTextButton, textButton, disabled, ...rests }) => {
    return (
        <Button
            style={{
                ...styleButton,
                background: disabled ? '#ccc' : styleButton?.background,
                cursor: disabled ? 'not-allowed' : 'pointer'
            }}
            size={size}
            {...rests}
        >
            <span style={styleTextButton}>{textButton}</span>
        </Button>
    )
}
