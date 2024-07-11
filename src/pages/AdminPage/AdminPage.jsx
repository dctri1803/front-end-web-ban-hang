import React, { useState } from 'react'
import { Menu } from 'antd';
import { AppstoreOutlined, UserOutlined } from '@ant-design/icons';
import { getItem } from '../../utils';
import { HeaderComponent } from '../../components/HeaderComponent/HeaderComponent';
import { AdminUser } from '../../components/AdminUser/AdminUser';
import { AdminProduct } from '../../components/AdminProduct/AdminProduct';

const AdminPage = () => {

  const [keySelected, setKeySelected] = useState('')

  const renderPage = (key) => {
    switch (key) {
      case 'user':
        return (<AdminUser />)

      case 'product':
        return (<AdminProduct />)

      default:
        return (<h1> Wellcome to admin page </h1>)
    }

  }

  const items = [
    getItem('user', 'Người dùng', <UserOutlined />),
    getItem('product', 'Sản phẩm', <AppstoreOutlined />),
  ]

  const onClick = (e) => {
    console.log('click ', e);
    setKeySelected(e.key)
  };

  return (
    <>
      <HeaderComponent isHiddenSearch isHiddenCart />
      <div style={{ display: 'flex' }}>
        <Menu
          onClick={onClick}
          style={{
            width: 256,
            boxShadow: '1px 1px 2px #ccc',
            height: '100vh',
          }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          items={items}
        />
        <div style={{ flex: 1, padding: '15px' }} >
          {renderPage(keySelected)}
        </div>
      </div>
    </>
  )
}

export default AdminPage