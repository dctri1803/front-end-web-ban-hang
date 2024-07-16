import React from 'react'
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperImageStyle, WrapperPriceText, WrapperReportText, WrapperStyleTextSell } from './style';
import { StarFilled } from '@ant-design/icons';
import logo from '../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';

export const CardComponent = (props) => {
  const {countInStock, description, image, name, price, rating, type, selled, discount, id} = props
  const navigate = useNavigate()
  const handleDetailsProduct = (id) => {
    navigate(`/product-details/${id}`)
  }
  return (
    <WrapperCardStyle
      hoverable
      style={{ width: 200 }}
      cover={<img alt="example" src={image} />}
      onClick={() => handleDetailsProduct(id)}
    >
      <WrapperImageStyle src={logo} />
      <StyleNameProduct>{name}</StyleNameProduct>
      <WrapperReportText>
        <span>{rating}</span> <StarFilled style={{ fontSize: '12px', color:'rgb(253, 216, 54)', margin:'0 4px' }} />
        <WrapperStyleTextSell> | Đã bán {selled || 1000}+</WrapperStyleTextSell>
      </WrapperReportText>
      <WrapperPriceText>
        <span style={{ marginRight: '8px' }}>{price?.toLocaleString()}đ</span>
        <WrapperDiscountText>
          -{discount || 5}%
        </WrapperDiscountText>
      </WrapperPriceText>

    </WrapperCardStyle>
  );

}
