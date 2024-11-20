import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Divider, Form, Input, InputNumber, message, Modal, notification, Select, Table } from 'antd';
import { callCreateAUser, callCreateCustomer, callCreateEmployee, callCreateOrder, callFetchListBook, callFetchListBookNoPagination, callFetcListShippingStatus, callListRole } from '../../../services/api';
import moment from 'moment';
import ModalAddOrderItem from './ModalAddOrderItem';

const OrderModalCreate = (props) => {
    const { openModalCreate, setOpenModalCreate } = props;
    const [openModalAddOrderItem, setModalAddOrderItem] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [products, setProducts] = useState([]);


    // https://ant.design/components/form#components-form-demo-control-hooks
    const [form] = Form.useForm();

    const [shippingstatus, setShippingstatus] = useState([]);
    const [listBooks, setListBooks] = useState([]);

    const fetchListbook = async () => {
        const res = await callFetchListBookNoPagination();
        if (res && res.data && res.data.length > 0) {
            const d = res.data.map(item => {
                return { label: item.mainText, value: item.id }
            })
            setListBooks(d)
        }
    }


    const fetchShippingstatus = async () => {
        const res = await callFetcListShippingStatus();
        if (res && res.data) {
            const d = res.data.map(item => {
                return { label: item.status, value: item.id }
            })
            setShippingstatus(d)
        }
    }

    useEffect(() => {
        fetchShippingstatus();
        fetchListbook();
    }, []);

    useEffect(() => {
        const calculateTotalPrice = () => {
            const totalPrice = products.reduce((total, product) => total + product.totalPrice, 0);
            form.setFieldsValue({ totalPrice });
        };

        calculateTotalPrice();
    }, [products]);


    const onFinish = async (values) => {
        const { receiverName, email, receiverAddress, receiverPhone, totalPrice, status } = values;
        console.log('values', values);
        console.log('products', products);
        const rqProducts = products.map(product => {
            return { bookId: product.id, quantity: product.quantity }
        })
        setIsSubmit(true)
        const res = await callCreateOrder(receiverName, email, receiverAddress, receiverPhone, totalPrice, status, rqProducts);
        if (res && res.data) {
            message.success('Tạo mới đơn hàng thành công');
            form.resetFields();
            setProducts([]);
            setOpenModalCreate(false);
            await props.fetchOrder()
        } else {
            notification.error({
                message: 'Đã có lỗi xảy ra',
                description: res.message
            })
        }
        setIsSubmit(false)
    };
    const deleteProduct = (key) => {
        setProducts(products.filter((product) => product.key !== key));
    };

    const productColumns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            key: 'price',
            render: (price) => `${price} đ`, // Định dạng giá tiền
        },
        {
            title: 'Tổng giá',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (price) => `${price} đ`, // Định dạng giá tiền
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Button type="link" onClick={() => deleteProduct(record.key)}>
                    Xóa
                </Button>
            ),
        },
    ];

    return (
        <>

            <Modal
                title="Thêm mới đơn hàng"
                open={openModalCreate}
                onOk={() => { form.submit() }}
                onCancel={() => { setOpenModalCreate(false); setProducts([]) }}
                okText={"Tạo đơn hàng"}
                cancelText={"Hủy"}
                confirmLoading={isSubmit}
            >
                <Divider />

                <Form
                    form={form}
                    name="create_order_form"
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        label="Tên người nhận"
                        name="receiverName"
                        rules={[{ required: true, message: 'Vui lòng nhập tên người nhận!' }]}
                    >
                        <Input placeholder="Nhập tên người nhận" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Vui lòng nhập email người nhận!' }]}
                    >
                        <Input placeholder="Nhập email người nhận" />
                    </Form.Item>

                    <Form.Item
                        label="Địa chỉ người nhận"
                        name="receiverAddress"
                        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ người nhận!' }]}
                    >
                        <Input placeholder="Nhập địa chỉ người nhận" />
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại người nhận"
                        name="receiverPhone"
                        rules={[
                            { required: true, message: 'Vui lòng nhập số điện thoại người nhận!' },
                            { pattern: /^[0-9]{10}$/, message: 'Số điện thoại không hợp lệ!' },
                        ]}
                    >
                        <Input placeholder="Nhập số điện thoại người nhận" />
                    </Form.Item>

                    <Form.Item
                        label="Tổng giá"
                        name="totalPrice"
                        rules={[{ required: true, message: 'Vui lòng nhập tổng giá!' }]}
                    >
                        <InputNumber
                            min={0}
                            style={{ width: '100%' }}
                            placeholder="Nhập tổng giá"
                            formatter={(value) => `${value} đ`}
                            parser={(value) => value.replace(' đ', '')}
                            disabled
                        />
                    </Form.Item>

                    <Form.Item
                        label="Tình trạng"
                        name="status"
                        rules={[{ required: true, message: 'Vui lòng chọn tình trạng!' }]}
                    >
                        <Select
                            defaultValue={null}
                            showSearch
                            allowClear
                            options={shippingstatus}
                        />
                    </Form.Item>



                    {/* Bảng sản phẩm */}
                    <Form.Item label="Danh sách sản phẩm">
                        <Button type="dashed" onClick={() => setModalAddOrderItem(true)}>
                            Thêm sản phẩm
                        </Button>
                        <Table
                            dataSource={products}
                            columns={productColumns}
                            rowKey="name"
                            pagination={false}
                            style={{ marginTop: 16 }}
                        />
                    </Form.Item>
                </Form>
            </Modal>
            <ModalAddOrderItem
                openModalAddOrderItem={openModalAddOrderItem}
                setModalAddOrderItem={setModalAddOrderItem}
                products={products}
                setProducts={setProducts}
                listBooks={listBooks}
            />
        </>
    );
};

export default OrderModalCreate;
