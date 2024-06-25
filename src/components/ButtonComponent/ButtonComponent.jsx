import { Button } from 'antd'
import React from 'react'

export const ButtonComponent = ({ size, styleButton, styleTextButton, textButton, disabled, ...rests }) => {
    return (
        <Button
            style={{
                ...styleButton,
                background: disabled ? '#ccc' : 'rgb(255, 57, 59)',
                cursor: disabled ? 'not-allowed' : 'pointer'
            }}
            size={size}
            {...rests}
        >
            <span style={styleTextButton}>{textButton}</span>
        </Button>
    )
}
