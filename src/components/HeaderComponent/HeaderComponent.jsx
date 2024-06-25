import React from 'react';
import { Badge, Col } from 'antd';
import { WrapperHeader, WrapperTextHeader, WrapperHeaderAccount, WrapperTextHeaderSmall } from './style';
import { UserOutlined, ShoppingCartOutlined, CaretDownOutlined } from '@ant-design/icons';
import { ButtonInputSearch } from '../ButtonInputSearch/ButtonInputSearch';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const HeaderComponent = () => {

  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const handleNavigateLogin = () => {
    navigate('/sign-in')
  }
  console.log('user', user);
  return (
    <div style={{ width: '100%', display: 'block', background: 'rgb(26, 148, 255)' }}>
      <WrapperHeader >
        <Col span={3}>
          <WrapperTextHeader>TAKA</WrapperTextHeader>
        </Col>
        <Col span={15}>
          <ButtonInputSearch
            size='large'
            textButton='Tìm kiếm'
            placeholder="Tên sản phẩm tìm kiếm..."
          // onSearch={onSearch}

          />
        </Col>
        <Col span={6} style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <WrapperHeaderAccount style={{ padding: '0 30px' }}>
            <UserOutlined style={{ fontSize: '30px' }} />
            {user?.name ? (
              <div>{user.name}</div>
            ) : (
              <div onClick={handleNavigateLogin} style={{ cursor: 'pointer', }}>
                <WrapperTextHeaderSmall>Đăng nhập/ Đăng kí</WrapperTextHeaderSmall>
                <div>
                  <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                  <CaretDownOutlined />
                </div>
              </div>
            )}
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

