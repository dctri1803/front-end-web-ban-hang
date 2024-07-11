import React from 'react'
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperImageStyle, WrapperPriceText, WrapperReportText, WrapperStyleTextSell } from './style';
import { StarFilled } from '@ant-design/icons';
import logo from '../../assets/images/logo.png';

export const CardComponent = (props) => {
  const {countInStock, description, image, name, price, rating, type, selled, discount} = props
  return (
    <WrapperCardStyle
      hoverable
      style={{ width: 200 }}
      cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
    >
      <WrapperImageStyle src={logo} />
      <StyleNameProduct>{name}</StyleNameProduct>
      <WrapperReportText>
        <span>{rating}</span> <StarFilled style={{ fontSize: '12px', color:'rgb(253, 216, 54)', margin:'0 4px' }} />
        <WrapperStyleTextSell> | Đã bán {selled || 1000}+</WrapperStyleTextSell>
      </WrapperReportText>
      <WrapperPriceText>
        <span style={{ marginRight: '8px' }}>{price}đ</span>
        <WrapperDiscountText>
          {discount || 5}%
        </WrapperDiscountText>
      </WrapperPriceText>

    </WrapperCardStyle>
  );

}
