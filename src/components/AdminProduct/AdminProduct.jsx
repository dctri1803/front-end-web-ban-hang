import React, { useEffect, useRef, useState } from 'react'
import { WrapperHeader, WrapperUploadAvatar } from './style'
import { Button, Form, Select, Space } from 'antd'
import { error, success } from '../../components/Message/Message'
import { PlusOutlined, EditFilled, DeleteFilled, SearchOutlined } from '@ant-design/icons';
import { TableComponent } from '../TableComponent/TableComponent';
import { InputComponent } from '../InputComponent/InputComponent';
import { convertInputPrice, getBase64, renderOptions } from '../../utils';
import { useMutation, useQuery } from '@tanstack/react-query'
import * as ProductService from '../../services/ProductService'
import { useSelector } from 'react-redux';
import { Loading } from '../LoadingComponent/Loading';
import { DrawerComponent } from '../DrawerComponent/DrawerComponent';
import { ModalComponent } from '../ModalComponent/ModalComponent';

export const AdminProduct = () => {
  const user = useSelector((state) => state.user)
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isPendingUpdate, setIsPendingUpdate] = useState(false);
  const searchInput = useRef(null);
  const [rowSelected, setRowSelected] = useState('')
  const [typeSelected, setTypeSelected] = useState('')
  const initial = () => ({
    name: '',
    type: '',
    price: '',
    countInStock: '',
    rating: '',
    description: '',
    image: '',
    discount: '',
  })
  const [stateProduct, setStateProduct] = useState(initial())
  const [stateDetailsProduct, setStateDetailsProduct] = useState(initial())

  const mutation = useMutation({
    mutationFn: async (data) => {
      const { access_token, ...rests } = data
      const res = await ProductService.createProduct(rests, access_token)
      return res
    },
  })

  const mutationUpdate = useMutation({
    mutationFn: async (data) => {
      const { id, access_token, ...rests } = data
      console.log('data', data)
      const res = await ProductService.updateProduct(id, access_token, { ...rests })
      return res
    },
  })

  const mutationDeleted = useMutation({
    mutationFn: async (data) => {
      const { id, access_token } = data
      const res = await ProductService.deleteProduct(id, access_token)
      return res
    },
  })

  const mutationDeletedMany = useMutation({
    mutationFn: async (data) => {
      const { access_token, ...ids } = data
      const res = await ProductService.deleteManyProducts(ids, access_token)
      return res
    },
  })

  const handleDeleteManyProducts = (ids) => {
    mutationDeletedMany.mutate({ ids: ids, access_token: user?.access_token }, {
      onSettled: () => {
        queryProducts.refetch()
      }
    })
  }

  const getAllProduct = async () => {
    const res = await ProductService.getAllProduct()
    return res
  }

  const fetchGetAllTypeProduct = async () => {
    const res = await ProductService.getAllType()
    return res
  }

  const fetchGetDetailsProduct = async (rowSelected) => {
    const res = await ProductService.getDetailsProduct(rowSelected)
    if (res?.data) {
      setStateDetailsProduct({
        name: res?.data?.name,
        type: res?.data?.type,
        price: res?.data?.price,
        countInStock: res?.data?.countInStock,
        rating: res?.data?.rating,
        description: res?.data?.description,
        image: res?.data?.image,
        discount: res?.data?.discount,
      })
    }
    setIsPendingUpdate(false)
    return res
  }

  const handleDetailsProduct = async () => {
    if (rowSelected) {
      setIsPendingUpdate(true)
      fetchGetDetailsProduct(rowSelected)
    }
    setIsOpenDrawer(true)
    console.log('rowSelected', rowSelected)
  }

  const queryProducts = useQuery({ queryKey: ['products'], queryFn: getAllProduct, })
  const queryTypeProducts = useQuery({ queryKey: ['type-products'], queryFn: fetchGetAllTypeProduct, })
  console.log('queryTypeProducts', queryTypeProducts)
  const { isPending: isPendingProduct, data: products } = queryProducts
  const renderAction = () => {
    return (
      <div>
        <DeleteFilled style={{ color: 'red', cursor: 'pointer', fontSize: '30px' }} onClick={() => { setIsModalDeleteOpen(true) }} />
        <EditFilled style={{ color: 'orange', cursor: 'pointer', fontSize: '30px' }} onClick={handleDetailsProduct} />
      </div>
    )
  }

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    // setSearchText(selectedKeys[0]);
    // setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    // setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     <Highlighter
    //       highlightStyle={{
    //         backgroundColor: '#ffc069',
    //         padding: 0,
    //       }}
    //       searchWords={[searchText]}
    //       autoEscape
    //       textToHighlight={text ? text.toString() : ''}
    //     />
    //   ) : (
    //     text
    //   ),
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps('name')
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
      filters: [
        {
          text: '>= 5000',
          value: '>=',
        },
        {
          text: '<= 5000',
          value: '<=',
        },
      ],
      onFilter: (value, record) => {
        if (value === '>=') {
          return record.price >= 5000
        } else if (value === '<=') {
          return record.price <= 5000
        }
      },
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      sorter: (a, b) => a.rating - b.rating,
      filters: [
        {
          text: '>= 3',
          value: '>=3',
        },
        {
          text: '<= 3',
          value: '<=3',
        },
        {
          text: '>= 4',
          value: '>=4',
        },
        {
          text: '<= 4',
          value: '<=4',
        },
      ],
      onFilter: (value, record) => {
        if (value === '>=3') {
          return record.rating >= 3
        } else if (value === '<=3') {
          return record.rating <= 3
        } if (value === '>=4') {
          return record.rating >= 4
        } else if (value === '<=4') {
          return record.rating <= 4
        }
      },
    },
    {
      title: 'Type',
      dataIndex: 'type',
      sorter: (a, b) => a.type.length - b.type.length
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: renderAction
    },
  ];

  const { data, isSuccess, isPending, isError } = mutation
  const { data: dataUpdated, isSuccess: isSuccessUpdated, isPending: isPendingUpdated, isError: isErrorUpdated } = mutationUpdate
  const { data: dataDeleted, isSuccess: isSuccessDeleted, isPending: isPendingDeleted, isError: isErrorDeleted } = mutationDeleted
  const { data: dataDeletedMany, isSuccess: isSuccessDeletedMany, isPending: isPendingDeletedMany, isError: isErrorDeletedMany } = mutationDeletedMany


  useEffect(() => {
    if(!isModalOpen) {
      form.setFieldsValue(stateDetailsProduct)
    } else {
      form.setFieldsValue(initial())
    }
  }, [form, stateDetailsProduct, isModalOpen])

  useEffect(() => {
    if (rowSelected) {
      fetchGetDetailsProduct(rowSelected)
    }
  }, [rowSelected])

  useEffect(() => {
    if (isSuccess && data?.status === 'OK') {
      success()
      handleCancel()
    } else if (isError) {
      error()
    }
  }, [isSuccess, isError,])

  useEffect(() => {
    if (isSuccessDeletedMany && dataDeletedMany?.status === 'OK') {
      success()
    } else if (isErrorDeletedMany) {
      error()
    }
  }, [isSuccessDeletedMany, isErrorDeletedMany])

  const showModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === 'OK') {
      success()
      handleCloseDrawer()
    } else if (isErrorUpdated) {
      error()
    }
  }, [isSuccessUpdated, isErrorUpdated])

  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === 'OK') {
      success()
      handleCancelDelete()
    } else if (isErrorDeleted) {
      error()
    }
  }, [isSuccessDeleted, isErrorDeleted])

  const handleCancel = () => {
    setIsModalOpen(false);
    setStateProduct({
      name: '',
      type: '',
      price: '',
      countInStock: '',
      rating: '',
      description: '',
      image: '',
      discount: '',
    })
    form.resetFields()
  };

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateDetailsProduct({
      name: '',
      type: '',
      price: '',
      countInStock: '',
      rating: '',
      description: '',
      image: '',
    })
    form.resetFields()
  };

  const handleOnChange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value
    })
  }

  const handleOnChangeDetails = (e) => {
    setStateDetailsProduct({
      ...stateDetailsProduct,
      [e.target.name]: e.target.value
    })
  }

  const handleUpAvatar = async (info) => {
    await getBase64(info.file.originFileObj, (url) => {
      setStateProduct({
        ...stateProduct,
        image: url
      })
    });
  }

  const handleUpDetailsAvatar = async (info) => {
    await getBase64(info.file.originFileObj, (url) => {
      setStateDetailsProduct({
        ...stateDetailsProduct,
        image: url
      })
    });
  }

  const handleCancelDelete = () => {
    setIsModalDeleteOpen(false)
  }

  const handleDeleteProduct = () => {
    if (user?.access_token, rowSelected) {
      mutationDeleted.mutate({ id: rowSelected, access_token: user.access_token },
        {
          onSettled: () => {
            queryProducts.refetch()
          }
        }
      )
        ;

    } else {
      error('Access token is missing');
    }
  }

  const handleChangeSelected = (value) => {
    if (value !== 'add_type') {
      setTypeSelected(value)
      setStateProduct({
        ...stateProduct,
        type: value
      })
    } else {
      setTypeSelected(value)
    }
  }

  const onFinish = () => {
    if (user?.access_token) {
      mutation.mutate({ ...stateProduct, access_token: user.access_token },
        {
          onSettled: () => {
            queryProducts.refetch()
          }
        }
      );
    } else {
      error('Access token is missing');
    }
  }

  const onUpdateProduct = () => {
    if (user?.access_token, rowSelected) {
      mutationUpdate.mutate({ id: rowSelected, access_token: user.access_token,...stateDetailsProduct },
        {
          onSettled: () => {
            queryProducts.refetch()
          }
        }
      );
    } else {
      error('Access token is missing');
    }
  }

  const dataTable = products?.data.length && products?.data.map((product) => {
    return {
      ...product,
      key: product._id
    }
  })

  return (
    <div>
      <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
      <div style={{ marginTop: '10px' }}>
        <Button style={{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed' }} onClick={showModal}><PlusOutlined style={{ fontSize: '60px' }} /> </Button>
      </div>
      <div style={{ marginTop: '20px' }} >
        <TableComponent handleDeleteMany={handleDeleteManyProducts} data={dataTable} isPending={isPendingProduct} columns={columns} onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setRowSelected(record._id)
            }, // click row
          };
        }} />
      </div>
      <ModalComponent forceRender title="Tạo sản phẩm" open={isModalOpen} onOk={onFinish} onCancel={handleCancel} okText={'Submit'}>
        <Loading isPending={isPending}>
          <Form
            name="basic"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 18,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input your name!',
                },
              ]}
            >
              <InputComponent value={stateProduct.name} onChange={handleOnChange} name="name" />
            </Form.Item>

            <Form.Item
              label="Type"
              name="type"
              rules={[
                {
                  required: true,
                  message: 'Please input your type!',
                },
              ]}
            >
              <Select
                name="type"
                value={stateProduct.type}
                onChange={handleChangeSelected}
                options={renderOptions(queryTypeProducts?.data?.data)}
              />
              {typeSelected === 'add_type' && <InputComponent value={stateProduct.type} onChange={handleOnChange} name="type"/>}
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[
                {
                  required: true,
                  message: 'Please input your price!',
                },
              ]}
            >
              <InputComponent value={stateProduct.price} onChange={handleOnChange} name="price" />
            </Form.Item>

            <Form.Item
              label="Count in stock"
              name="countInStock"
              rules={[
                {
                  required: true,
                  message: 'Please input your count in stock!',
                },
              ]}
            >
              <InputComponent value={stateProduct.countInStock} onChange={handleOnChange} name="countInStock" />
            </Form.Item>

            <Form.Item
              label="Rating"
              name="rating"
              rules={[
                {
                  required: false,
                  message: 'Please input your rating!',
                },
              ]}
            >
              <InputComponent value={stateProduct.rating} onChange={handleOnChange} name="rating" />
            </Form.Item>

            <Form.Item
              label="Discount"
              name="discount"
              rules={[
                {
                  required: false,
                  message: 'Please input your discount of product!',
                },
              ]}
            >
              <InputComponent value={stateProduct.discount} onChange={handleOnChange} name="discount" />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: false,
                  message: 'Please input your Description!',
                },
              ]}
            >
              <InputComponent value={stateProduct.description} onChange={handleOnChange} name="description" />
            </Form.Item>

            <Form.Item
              label="Image"
              name="image"
              rules={[
                {
                  required: false,
                  message: 'Please input your Image!',
                },
              ]}
            >
              <WrapperUploadAvatar onChange={handleUpAvatar} maxCount={1}>
                <Button >Click to Upload</Button>
                {stateProduct.image && (<img src={stateProduct.image} style={{
                  height: '80px',
                  width: '80px',
                  objectFit: 'contain',
                  marginLeft: 20,
                }} alt='avatar'></img>)}
              </WrapperUploadAvatar>
            </Form.Item>
            {/* <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item> */}
          </Form>
        </Loading>
      </ModalComponent>
      <DrawerComponent title='Chi tiết sản phẩm' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width='90%'>
        <Loading isPending={isPendingUpdate}>
          <Form
            name="basic"
            labelCol={{
              span: 2,
            }}
            wrapperCol={{
              span: 22,
            }}
            style={{
              width: '100%',
            }}
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input your name!',
                },
              ]}
            >
              <InputComponent value={stateDetailsProduct.name} onChange={handleOnChangeDetails} name="name" />
            </Form.Item>

            <Form.Item
              label="Type"
              name="type"
              rules={[
                {
                  required: true,
                  message: 'Please input your type!',
                },
              ]}
            >
              <InputComponent value={stateDetailsProduct.type} onChange={handleOnChangeDetails} name="type" />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[
                {
                  required: true,
                  message: 'Please input your price!',
                },
              ]}
            >
              <InputComponent value={stateDetailsProduct.price} onChange={handleOnChangeDetails} name="price" />
            </Form.Item>

            <Form.Item
              label="Count in stock"
              name="countInStock"
              rules={[
                {
                  required: true,
                  message: 'Please input your count in stock!',
                },
              ]}
            >
              <InputComponent value={stateDetailsProduct.countInStock} onChange={handleOnChangeDetails} name="countInStock" />
            </Form.Item>

            <Form.Item
              label="Discount"
              name="discount"
              rules={[
                {
                  required: true,
                  message: 'Please input your discount of product!',
                },
              ]}
            >
              <InputComponent value={stateDetailsProduct.discount} onChange={handleOnChangeDetails} name="discount" />
            </Form.Item>

            <Form.Item
              label="Rating"
              name="rating"
              rules={[
                {
                  required: true,
                  message: 'Please input your rating!',
                },
              ]}
            >
              <InputComponent value={stateDetailsProduct.rating} onChange={handleOnChangeDetails} name="rating" />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: 'Please input your Description!',
                },
              ]}
            >
              <InputComponent value={stateDetailsProduct.description} onChange={handleOnChangeDetails} name="description" />
            </Form.Item>

            <Form.Item
              label="Image"
              name="image"
              rules={[
                {
                  required: true,
                  message: 'Please input your Image!',
                },
              ]}
            >
              <WrapperUploadAvatar onChange={handleUpDetailsAvatar} maxCount={1}>
                <Button >Click to Upload</Button>
                {stateDetailsProduct.image && (<img src={stateDetailsProduct.image} style={{
                  height: '80px',
                  width: '80px',
                  objectFit: 'contain',
                  marginLeft: 20,
                }} alt='avatar'></img>)}
              </WrapperUploadAvatar>
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 20,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit" onClick={onUpdateProduct}>
                Apply
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </DrawerComponent>
      <ModalComponent title="Xóa sản phẩm" open={isModalDeleteOpen} onOk={handleDeleteProduct} onCancel={handleCancelDelete} okText={'Xác nhận'} cancelText={'Hủy'}>
        <Loading isPending={isPendingDeleted}>
          <div>Bạn chắc chắn muốn xóa sản phẩm này</div>
        </Loading>
      </ModalComponent>
    </div >
  )
}
