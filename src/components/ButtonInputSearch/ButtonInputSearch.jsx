import React from 'react';
import {
    SearchOutlined,
} from '@ant-design/icons';
import { InputComponent } from '../InputComponent/InputComponent';
import { ButtonComponent } from '../ButtonComponent/ButtonComponent';

export const ButtonInputSearch = (props) => {
    const { 
        size,
        placeholder,
        textButton,
        border = 'none',
        backgroundColorInput= '#fff',
        backgroundColorButton = 'rgb(13, 92, 182)',
        colorButton = '#fff',
    } = props
    return (
        <div style={{ display: 'flex' }}>
            <InputComponent
                size={size}
                placeholder={placeholder}
                style={{ border: !border && 'none', background: backgroundColorInput }}
            />
            <ButtonComponent
                size={size}
                icon={<SearchOutlined color={colorButton} style={{ color: '#fff' }} />}
                style={{ border: !border && 'none', background: backgroundColorButton }}
                textButton={textButton}
                styleTextButton={{color: colorButton}}
                >
            </ButtonComponent>
        </div>
    )
}
