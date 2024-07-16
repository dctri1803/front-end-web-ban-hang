import {
  Col,
  Image,
  Row
} from 'antd'
import React, { useState } from 'react'
import imageProductSmall from '../../assets/images/imgsmall.png'
import {
  WrapperAddressProduct,
  WrapperInputNumber,
  WrapperPriceProduct,
  WrapperPriceTextProduct,
  WrapperQuantityProduct,
  WrapperStyleColImage,
  WrapperStyleImageSmall,
  WrapperStyleNameProduct,
  WrapperStyleTextSell
} from './style'
import {
  StarFilled,
  PlusOutlined,
  MinusOutlined,
} from '@ant-design/icons';
import { ButtonComponent } from '../ButtonComponent/ButtonComponent'
import * as ProductService from '../../services/ProductService'
import { useQuery } from '@tanstack/react-query'
import { Loading } from '../LoadingComponent/Loading'
import { useSelector } from 'react-redux';

export const ProductDetailsComponent = ({ idProduct }) => {
  const [numProduct, setNumProduct] = useState(1)
  const user = useSelector((state)=> state.user)
  console.log('user', user)
  const onChange = (value) => {
    setNumProduct(Number(value))
  }

  const fetchGetDetailsProduct = async ({ queryKey }) => {
    const [_, id] = queryKey;
    const res = await ProductService.getDetailsProduct(id)
    return res.data
  }

  const handleChangeCount = (type) => {
    if(numProduct > 0 ) {
      
      if(type==='increase') {
        setNumProduct(numProduct + 1)
      }else if (type === 'decrease' && numProduct > 1){
        setNumProduct(numProduct - 1)
      }
    }
  }

  const renderStars = (num) => {
    const stars = [];
    for (let i = 0; i < num; i++) {
      stars.push(<StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54)' }} key={i} />);
    }
    return stars;
  };
  const { isPending, data: productDetails } = useQuery({ queryKey: ['product-details', idProduct], queryFn: fetchGetDetailsProduct, enabled: !!idProduct })
  return (
    <Loading isPending={isPending}>
      <Row style={{ padding: '16px', background: '#fff', borderRadius: '4px', }}>
        <Col span={10} style={{ borderRight: '1px solid #e5e5e5', paddingRight: '8px', }}>
          <Image src={productDetails?.image} alt='image product' preview={false} />
          <Row style={{ paddingTop: '10px', justifyContent: 'space-between' }}>
            <WrapperStyleColImage span={4}>
              <WrapperStyleImageSmall src={imageProductSmall} alt='image product' preview={false} />
            </WrapperStyleColImage>
            <WrapperStyleColImage span={4}>
              <WrapperStyleImageSmall src={imageProductSmall} alt='image product' preview={false} />
            </WrapperStyleColImage>
            <WrapperStyleColImage span={4}>
              <WrapperStyleImageSmall src={imageProductSmall} alt='image product' preview={false} />
            </WrapperStyleColImage>
            <WrapperStyleColImage span={4}>
              <WrapperStyleImageSmall src={imageProductSmall} alt='image product' preview={false} />
            </WrapperStyleColImage>
            <WrapperStyleColImage span={4}>
              <WrapperStyleImageSmall src={imageProductSmall} alt='image product' preview={false} />
            </WrapperStyleColImage>
            <WrapperStyleColImage span={4}>
              <WrapperStyleImageSmall src={imageProductSmall} alt='image product' preview={false} />
            </WrapperStyleColImage>
          </Row>
        </Col>
        <Col span={14} style={{ paddingLeft: '10px' }}>
          <WrapperStyleNameProduct>{productDetails?.name}</WrapperStyleNameProduct>
          <div>
            {renderStars(productDetails?.rating)}
            <WrapperStyleTextSell>| Đã bán 1000+</WrapperStyleTextSell>
          </div>
          <WrapperPriceProduct>
            <WrapperPriceTextProduct>{productDetails?.price.toLocaleString()} đ</WrapperPriceTextProduct>
          </WrapperPriceProduct>
          <WrapperAddressProduct>
            <span>Giao đến </span>
            <span className='address'>{user?.address}</span> -
            <span className='change-address'>Đổi địa chỉ</span>
          </WrapperAddressProduct>
          <div style={{ margin: '10px 0 20px', padding: '10px 0', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
            <div style={{ marginBottom: '10px' }}>Số lượng</div>
            <WrapperQuantityProduct>
              <button style={{ border: 'none', background: 'transparent', cursor:'pointer' }} onClick={() => handleChangeCount('decrease')}>
                <MinusOutlined style={{ color: '#000', fontSize: '20px' }} size={10} />
              </button>
              <WrapperInputNumber onChange={onChange} value={numProduct} size='small' />
              <button style={{ border: 'none', background: 'transparent', cursor:'pointer' }} onClick={() => handleChangeCount('increase')} >
                <PlusOutlined style={{ color: '#000', fontSize: '20px' }} size={10} />
              </button>
            </WrapperQuantityProduct>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ButtonComponent
              size={40}
              styleButton={{
                background: 'rgb(255, 57, 59)',
                height: '48px',
                width: '220px',
                border: 'none',
                borderRadius: '4px'
              }}
              textButton={'Chọn mua'}
              styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
            ></ButtonComponent>

            <ButtonComponent
              size={40}
              styleButton={{
                background: '#fff',
                height: '48px',
                width: '220px',
                border: '1px solid rgb(13, 92, 182)',
                borderRadius: '4px'
              }}
              textButton={'Mua trước trả sau'}
              styleTextButton={{ color: 'rgb (13, 92, 182)', fontSize: '15px' }}
            ></ButtonComponent>
          </div>
        </Col>
      </Row>
    </Loading>
  )
}
