import React from 'react'
import { TypeProduct } from '../../components/TypeProduct/TypeProduct'
import {
  WrapperButtonMore,
  WrapperProducts,
  WrapperTypeProduct
} from './style'
import { SliderComponent } from '../../components/SilderComponent/SliderComponent'
import { CardComponent } from '../../components/CardComponent/CardComponent'
import slider1 from '../../assets/images/slider1.jpg'
import slider2 from '../../assets/images/slider2.png'
import slider3 from '../../assets/images/slider3.png'
import { useQuery } from '@tanstack/react-query'
import * as ProductService from '../../services/ProductService'
import { Loading } from '../../components/LoadingComponent/Loading'

export const HomePage = () => {
  const arr = ['TV', 'Tu lanh', 'Laptop']

  const fetchProductAll = async () => {
    const res = await ProductService.getAllProduct()
    return res
  }

  const { data: products, isPending } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProductAll,
    retry: 3,
    retryDelay: 1000,
  })
  console.log('product', products)
  return (
    <>
      <div style={{ width: '1270px', margin: '0 auto' }}>
        <WrapperTypeProduct>
          {arr.map((item) => {
            return (
              <TypeProduct name={item} key={item} />
            )
          })}
        </WrapperTypeProduct>
      </div>
      <div className='body' style={{ width: '100%', background: '#efefef' }}>
        <div id='container' style={{ margin: '0 auto', height: '1052px', width: '1270px' }}>
          <SliderComponent arrImages={[slider1, slider2, slider3]} />
          <Loading isPending={isPending}>
            <WrapperProducts>
              {products?.data?.map((product) => {
                return (
                  <CardComponent
                    key={product._id}
                    countInStock={product.countInStock}
                    description={product.description}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    rating={product.rating}
                    type={product.type}
                    selled={product.selled}
                    discount={product.discount}
                  />)
              })}
            </WrapperProducts>
          </Loading>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <WrapperButtonMore
              textButton={'Xem Thêm'}
              type='outline'
              styleButton={{
                border: '1px solid rgb(10, 104, 255)',
                color: 'rgba(0, 0, 0, 0.3)',
                width: '240px', height: '38px',
                borderRadius: '4px'
              }}
              styleTextButton={{ fontWeight: '500', }} />
          </div>
        </div>
      </div>
    </>
  )
}
