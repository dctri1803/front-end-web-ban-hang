import React from 'react';
import { Badge, Col } from 'antd';
import { WrapperHeader, WrapperTextHeader, WrapperHeaderAccount, WrapperTextHeaderSmall } from './style';
import { UserOutlined, ShoppingCartOutlined, CaretDownOutlined } from '@ant-design/icons';
import { ButtonInputSearch } from '../ButtonInputSearch/ButtonInputSearch';

export const HeaderComponent = () => {
  return (
    <div>
      <WrapperHeader >
        <Col span={4}>
          <WrapperTextHeader>PC Shop</WrapperTextHeader>
        </Col>
        <Col span={12}>
          <ButtonInputSearch
            size='large'
            textButton='Tìm kiếm'
            placeholder="input search text"
            // onSearch={onSearch}
            enterButton
          />
        </Col>
        <Col span={8} style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <WrapperHeaderAccount style={{ padding: '0 30px' }}>
            <UserOutlined style={{ fontSize: '30px' }} />
            <div>
              <WrapperTextHeaderSmall>Đăng nhập/ Đăng kí</WrapperTextHeaderSmall>
              <div>
                <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                <CaretDownOutlined />
              </div>
            </div>
          </WrapperHeaderAccount>
          <div>
            <div>
              <Badge count={4} size='small'>
                <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
              </Badge>
              <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
            </div>
          </div>
        </Col>
      </WrapperHeader>
    </div>
  )
}

