import React from 'react'
import { WrapperContent, WrapperLabelText, WrapperTextPrice, WrapperTextValue } from './style'
import { Checkbox, Rate } from 'antd';

export const NavbarComponent = () => {
    const onChange = () => { }
    const renderContent = (type, options) => {
        switch (type) {
            case 'text':
                return options.map((option) => {
                    return (<WrapperTextValue>{option}</WrapperTextValue>)
                })

            case 'checkbox':
                return (
                    <Checkbox.Group style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }} onChange={onChange}>
                        {options.map((option) => {
                            return (
                                <Checkbox value={option.value}>{option.label}</Checkbox>
                            )
                        })}
                    </Checkbox.Group>)

            case 'star':
                return options.map((option) => {
                    return (
                        <div style={{ display: 'flex', gap: '4px' }}>
                            <Rate disabled defaultValue={option} style={{ fontSize: '12px' }} />
                            <span>{`Từ ${option} sao`}</span>
                        </div>
                    )
                })

            case 'price':
                return options.map((option) => {
                    return (
                        <WrapperTextPrice>
                            {option}
                        </WrapperTextPrice>
                    )
                })

            default:
                return {}
        }
    }

    return (
        <div>
            <WrapperLabelText>Label</WrapperLabelText>
            <WrapperContent>
                {renderContent('text', ['Tu lanh', 'TV', 'May giat'])}
            </WrapperContent>
            <WrapperContent>
                {renderContent('checkbox', [
                    { value: 'a', label: 'A' },
                    { value: 'b', label: 'B' },
                    { value: 'c', label: 'C' },
                ])}
            </WrapperContent>
            <WrapperContent>
                {renderContent('star', [1, 2, 3, 4, 5,])}
            </WrapperContent>
            <WrapperContent>
                {renderContent('price', ['Dưới 40.000d', 'Dưới 50.000d'])}

            </WrapperContent>
        </div>
    )
}
