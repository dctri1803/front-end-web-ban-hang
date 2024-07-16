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
        onSearch,
        onButtonClick
    } = props

    const handleInputChange = (e) => {
        if (onSearch) {
            onSearch(e);  
        }
    }

    return (
        <div style={{ display: 'flex' }}>
            <InputComponent
                size={size}
                placeholder={placeholder}
                style={{ border: !border && 'none', background: backgroundColorInput }}
                onChange={handleInputChange}
                {...props}
            />
            <ButtonComponent
                size={size}
                icon={<SearchOutlined color={colorButton} style={{ color: '#fff' }} />}
                style={{ border: !border && 'none', background: backgroundColorButton }}
                textButton={textButton}
                styleTextButton={{color: colorButton}}
                onClick={onButtonClick}
            >
            </ButtonComponent>
        </div>
    )
}
