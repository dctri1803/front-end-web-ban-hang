import React, { useEffect, useState } from 'react'
import { NavbarComponent } from '../../components/NavbarComponent/NavbarComponent'
import { CardComponent } from '../../components/CardComponent/CardComponent'
import { Col, Pagination, Row } from 'antd'
import { WrapperNavbar, WrapperProducts } from './style'
import { useLocation } from 'react-router-dom'
import * as ProductService from '../../services/ProductService'
import { Loading } from '../../components/LoadingComponent/Loading'
import { useSelector } from 'react-redux'

export const TypeProductPage = () => {
    const searchProduct = useSelector((state) => state?.product?.search)

    const { state } = useLocation()
    const [products, setProducts] = useState([])
    const [panigate, setPanigate] = useState({
        page: 0,
        limit: 10,
        total: 1,
    })
    const [isLoading, setIsLoading] = useState(false)

    const fetchProductType = async (type, limit, page) => {
        setIsLoading(true)
        const res = await ProductService.getProductType(type, limit, page)
        console.log('res', res)
        if (res?.status === 'OK') {
            setProducts(res.data)
            setPanigate({
                ...panigate,
                total: res?.totalPage,
            })
        }
        setIsLoading(false)
    }

    useEffect(() => {
        if (state) {
            fetchProductType(state, panigate.limit, panigate.page)
        }
    }, [state, panigate.page, panigate.limit])

    const onChange = (current, pageSize) => {
        console.log({ current, pageSize })
        setPanigate({ ...panigate, page: current - 1, limit: pageSize })
    }

    const filteredProducts = products?.filter((pro) => {
        if (searchProduct === '') {
            return pro
        } else if (pro?.name?.toLowerCase()?.includes(searchProduct?.toLowerCase())) {
            return pro
        }
        return null
    })

    return (
        <Loading isPending={isLoading}>
            <div style={{ width: '100%', background: '#efefef', height: 'calc(100vh - 62px)' }}>
                <div style={{ width: '1270px', margin: '0 auto', height: '100%' }}>
                    <Row style={{ flexWrap: 'nowrap', paddingTop: '10px', height: '100%' }}>
                        <WrapperNavbar span={4}>
                            <NavbarComponent />
                        </WrapperNavbar>
                        <Col span={20} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <WrapperProducts>
                                {filteredProducts?.map((product) => (
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
                                ))}
                            </WrapperProducts>
                            <Pagination
                                defaultCurrent={panigate.page + 1}
                                total={panigate?.total}
                                onChange={onChange}
                                style={{ textAlign: 'center', marginTop: '10px' }}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        </Loading>
    )
}
