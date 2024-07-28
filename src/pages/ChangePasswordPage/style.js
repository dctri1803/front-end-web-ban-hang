import { Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
    color: #000;
    font-size: 18px;
    margin: 4px 0;
    font-weight: 600;
`

export const WrapperContentProfile = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    width: 700px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 10px;
    gap: 20px;
`

export const WrapperLabel = styled.label`
    color: #000;
    font-size: 12px;
    line-height: 30px;
    font-weight: 600;
    width: 100px;
    
`

export const WrapperInput = styled.div`
    display: flex;
    align-items: center;
    gap: 20px
`

export const WrapperUploadAvatar = styled(Upload)`
    & .ant-upload-list-item-name {
        display: none
    }
`