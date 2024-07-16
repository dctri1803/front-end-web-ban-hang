import React, { useEffect, useRef, useState } from 'react';
import { TypeProduct } from '../../components/TypeProduct/TypeProduct';
import {
  WrapperButtonMore,
  WrapperProducts,
  WrapperTypeProduct
} from './style';
import { SliderComponent } from '../../components/SilderComponent/SliderComponent';
import { CardComponent } from '../../components/CardComponent/CardComponent';
import slider1 from '../../assets/images/slider1.jpg';
import slider2 from '../../assets/images/slider2.png';
import slider3 from '../../assets/images/slider3.png';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import * as ProductService from '../../services/ProductService';
import { Loading } from '../../components/LoadingComponent/Loading';
import { useSelector } from 'react-redux';

export const HomePage = () => {
  const searchProduct = useSelector((state) => state.product?.search);
  const [stateProducts, setStateProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [limit, setLimit] = useState(12);
  const [typeProducts, setTypeProducts] = useState([])
  const refSearch = useRef();
  const queryClient = useQueryClient();

  const fetchProductAll = async ({ queryKey }) => {
    const [_, limit, search] = queryKey;
    const res = await ProductService.getAllProduct(search, limit);
    return res.data;
  };

  const fetchGetAllTypeProduct = async () => {
    const res = await ProductService.getAllType()
    if (res?.status === 'OK') {
      setTypeProducts(res?.data)
    }
    return res
  }

  useEffect(() => {
    fetchGetAllTypeProduct()
  }, [])

  const { data: products, isPending } = useQuery({
    queryKey: ['products', limit, searchProduct],
    queryFn: fetchProductAll,
    keepPreviousData: true, // Keeps the previous data while fetching new data
  });

  useEffect(() => {
    if (products?.length > 0) {
      setStateProducts(products);
    }
  }, [products]);

  const handleLoadMore = () => {
    setLimit((prevLimit) => prevLimit + 12);
  };

  useEffect(() => {
    if (refSearch.current) {
      setIsLoading(true);
      queryClient.invalidateQueries(['products', limit, searchProduct]);
      setIsLoading(false);
    }
    refSearch.current = true;
  }, [searchProduct, limit, queryClient]);

  return (
    <Loading isPending={isPending}>
      <div style={{ width: '1270px', margin: '0 auto' }}>
        <WrapperTypeProduct>
          {typeProducts.map((item) => {
            return <TypeProduct name={item} key={item} />;
          })}
        </WrapperTypeProduct>
      </div>
      <div className="body" style={{ width: '100%', background: '#efefef' }}>
        <div id="container" style={{ margin: '0 auto', height: '1052px', width: '1270px' }}>
          <SliderComponent arrImages={[slider1, slider2, slider3]} />
          <Loading isPending={isLoading}>
            <WrapperProducts>
              {stateProducts?.map((product) => {
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
                    id={product._id}
                  />
                );
              })}
            </WrapperProducts>
          </Loading>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <WrapperButtonMore
              textButton={'Xem Thêm'}
              type="outline"
              styleButton={{
                border: '1px solid rgb(10, 104, 255)',
                color: 'rgba(0, 0, 0, 0.3)',
                width: '240px',
                height: '38px',
                borderRadius: '4px',
              }}
              styleTextButton={{ fontWeight: '500' }}
              onClick={handleLoadMore}
            />
          </div>
        </div>
      </div>
    </Loading>
  );
};
