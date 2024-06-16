import React from 'react'
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperImageStyle, WrapperPriceText, WrapperReportText, WrapperStyleTextSell } from './style';
import { StarFilled } from '@ant-design/icons';
import logo from '../../assets/images/logo.png';

export const CardComponent = () => {
  return (
    <WrapperCardStyle
      hoverable
      style={{ width: 200 }}
      cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
    >
      <WrapperImageStyle src={logo} />
      <StyleNameProduct>Iphone</StyleNameProduct>
      <WrapperReportText>
        <span>4.96</span> <StarFilled style={{ fontSize: '12px', color:'rgb(253, 216, 54)', margin:'0 4px' }} />
        <WrapperStyleTextSell> | Đã bán 1000+</WrapperStyleTextSell>
      </WrapperReportText>
      <WrapperPriceText>
        1.000.000đ
        <WrapperDiscountText>
          -5%
        </WrapperDiscountText>
      </WrapperPriceText>

    </WrapperCardStyle>
  );

}
