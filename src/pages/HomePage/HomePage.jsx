import React from 'react'
import { TypeProduct } from '../../components/TypeProduct/TypeProduct'
import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from './style'
import { SliderComponent } from '../../components/SilderComponent/SliderComponent'
import { CardComponent } from '../../components/CardComponent/CardComponent'
  import slider1 from '../../assets/images/slider1.jpg'
  import slider2 from '../../assets/images/slider2.png'
  import slider3 from '../../assets/images/slider3.png'

export const HomePage = () => {
  const arr = ['TV', 'Tu lanh', 'Laptop']
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
        <div id='container' style={{ margin: '0 auto', height: '1038px', width: '1270px' }}>
          <SliderComponent arrImages={[slider1, slider2, slider3]} />
          <WrapperProducts>
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
          </WrapperProducts>
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
