import React, { useState } from 'react'
import { Input } from 'antd';

const InputForm = ({props}) => {
    const [valueInput, setValueInput] = useState('');
    // const { placeholder = 'Nhập text' } = props
    return (
        <Input placeholder={'placeholder'} valueInput={valueInput} />
    )
}

export default InputForm