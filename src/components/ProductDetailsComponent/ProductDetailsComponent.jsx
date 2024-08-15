import {
  Col,
  Image,
  Row
} from 'antd'
import React, { useState } from 'react'
import imageProductSmall from '../../assets/images/imgsmall.png'
import {
  WrapperAddressProduct,
  WrapperDescriptionProduct,
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
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { addOrderProduct } from '../../features/slice/orderSlice';
import { convertPrice } from '../../utils';
import CommentComponent from '../CommentComponent/CommentComponent';

export const ProductDetailsComponent = ({ idProduct }) => {
  const [numProduct, setNumProduct] = useState(1)
  const navigate = useNavigate()
  const location = useLocation()
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const onChange = (value) => { 
    setNumProduct(Number(value))
}

  const fetchGetDetailsProduct = async ({ queryKey }) => {
    const [_, id] = queryKey;
    const res = await ProductService.getDetailsProduct(id)
    return res.data
  }
  const { isPending, data: productDetails } = useQuery({ queryKey: ['product-details', idProduct], queryFn: fetchGetDetailsProduct, enabled: !!idProduct })
  const handleChangeCount = (type, limited) => {
    if(type === 'increase') {
      if(!limited) {
          setNumProduct(numProduct + 1)
      }
  }else {
      if(!limited) {
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

  const handleAddOrderProduct = () => {
    if (!user?.id) {
      navigate('/sign-in', { state: location?.pathname })
    } else {
      dispatch(addOrderProduct({
        orderItem: {
          name: productDetails?.name,
          amount: numProduct,
          countInStock: productDetails?.countInStock,
          image: productDetails?.image,
          price: productDetails?.price,
          product: productDetails?._id,
          discount: productDetails?.discount
        }
      }))
    }
  }

  const handleBuyOrderProduct = async () => {
    await handleAddOrderProduct()
    navigate('/order')
  }
  return (
    <Loading isPending={isPending}>
      <Row style={{ padding: '16px', background: '#fff', borderRadius: '4px', }}>
        <Col span={10} style={{ borderRight: '1px solid #e5e5e5', paddingRight: '8px', }}>
          <Image src={productDetails?.image} alt='image product' preview={false} />
          <Row style={{ paddingTop: '10px', justifyContent: 'space-between' }}>
            <WrapperStyleColImage span={4}>
              <WrapperStyleImageSmall src={productDetails?.image} alt='image product' preview={false} />
            </WrapperStyleColImage>
            <WrapperStyleColImage span={4}>
              <WrapperStyleImageSmall src={productDetails?.image} alt='image product' preview={false} />
            </WrapperStyleColImage>
            <WrapperStyleColImage span={4}>
              <WrapperStyleImageSmall src={productDetails?.image} alt='image product' preview={false} />
            </WrapperStyleColImage>
            <WrapperStyleColImage span={4}>
              <WrapperStyleImageSmall src={productDetails?.image} alt='image product' preview={false} />
            </WrapperStyleColImage>
            <WrapperStyleColImage span={4}>
              <WrapperStyleImageSmall src={productDetails?.image} alt='image product' preview={false} />
            </WrapperStyleColImage>
            <WrapperStyleColImage span={4}>
              <WrapperStyleImageSmall src={productDetails?.image} alt='image product' preview={false} />
            </WrapperStyleColImage>
          </Row>
        </Col>
        <Col span={14} style={{ paddingLeft: '10px' }}>
          <WrapperStyleNameProduct>{productDetails?.name}</WrapperStyleNameProduct>
          <div>
            {renderStars(productDetails?.rating)}
            <WrapperStyleTextSell>| Đã bán {productDetails?.sold}</WrapperStyleTextSell>
          </div>
          <WrapperPriceProduct>
            <WrapperPriceTextProduct>{convertPrice(productDetails?.price)} đ</WrapperPriceTextProduct>
          </WrapperPriceProduct>
          <WrapperAddressProduct>
            <span>Giao đến </span>
            <span className='address'>{user?.address}</span> -
            <span className='change-address'>Đổi địa chỉ</span>
          </WrapperAddressProduct>
          <div style={{ margin: '10px 0 20px', padding: '10px 0', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
            <div style={{ marginBottom: '10px' }}>Số lượng: {productDetails?.countInStock}</div>
            <WrapperQuantityProduct>
              <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('decrease', numProduct === 1)}>
                <MinusOutlined style={{ color: '#000', fontSize: '20px' }} />
              </button>
              <WrapperInputNumber onChange={onChange} defaultValue={1} max={productDetails?.countInStock} min={1} value={numProduct} size="small" />
              <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('increase', numProduct === productDetails?.countInStock)}>
                <PlusOutlined style={{ color: '#000', fontSize: '20px' }} />
              </button>
            </WrapperQuantityProduct>
            <WrapperDescriptionProduct>
              Chi tiết sản phẩm: <br /> {productDetails?.description}
            </WrapperDescriptionProduct>
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
              styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
              textButton={'Mua ngay'}
              onClick={handleBuyOrderProduct}
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
              textButton={'Thêm vào giỏ hàng'}
              onClick={handleAddOrderProduct}
              styleTextButton={{ color: 'rgb (13, 92, 182)', fontSize: '15px' }}
            ></ButtonComponent>
          </div>
        </Col>
      </Row>
      <CommentComponent productId={idProduct} /> {/* Add CommentComponent here */}
    </Loading>
  )
}
