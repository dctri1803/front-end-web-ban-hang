import { Card } from "antd";
import styled from "styled-components";

export const WrapperCardStyle = styled(Card)`
    width: 200px;
    & img {
        width: 200px;
        height: 200px;
    }
    poisition: relative;
    background-color: ${props => props.disabled ? '#ccc' : '#fff'};
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'}
`

export const WrapperImageStyle = styled.img`
    height: 20px !important;
    width: 89px !important;
    position: absolute;
    bottom: 137px;
    left: 0;
`

export const StyleNameProduct = styled.div`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    height: 36px;
    align-self: stretch;
    overflow: hidden;
    color: var(--Alias-Primary---On-Theme, #27272a);
    text-overflow: ellipsis;
    font-size: 12px;
    font-weight: 400;
    line-height: 150%;
    margin: 0px;
    word-break: break-word;
`

export const WrapperReportText = styled.div`
    font-size: 11px;
    color: rgb(128, 128, 137);
    display: flex;
    align-items: center;    
`

export const WrapperPriceText = styled.div`
    color: rgb(255, 68, 78);
    text-align: left;
    font-size: 16px;
    line-height: 150%;
    font-weight: 600;
    margin: 6px 0 0;
`

export const WrapperDiscountText = styled.span`
    color: rgb(255, 68, 78);
    text-align: left;
    font-size: 12px;
    line-height: 150%;
    font-weight: 600;
`

export const WrapperStyleTextSell = styled.span`
    font-size: 15px;
    line-height: 24px;
    color: rgb(120, 120, 120);
`