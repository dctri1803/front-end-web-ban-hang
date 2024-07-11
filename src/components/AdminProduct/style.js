import { Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
    color: #000;
    font-size: 14px;
    font-weight: 600;
`

export const WrapperUploadAvatar = styled(Upload)`
    & .ant-upload-list-item-name {
        display: none
    }
`