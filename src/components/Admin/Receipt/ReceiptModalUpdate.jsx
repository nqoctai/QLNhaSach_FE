import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Divider, Form, Input, InputNumber, message, Modal, notification, Select, Table } from 'antd';
import { callCreateAUser, callCreateCustomer, callCreateEmployee, callCreateImportReceipt, callCreateOrder, callFetchBookBySupplierId, callFetchListBook, callFetchListBookNoPagination, callFetchListSupplier, callFetchSupplierById, callFetcListShippingStatus, callListRole, callSupplyBySupplierIDAndBookID, callUpdateImportReceipt } from '../../../services/api';
import moment from 'moment';

import ModalAddReceiptItem from './ModalAddReceiptItem';
import { useSelector } from 'react-redux';
import { DeleteTwoTone } from '@ant-design/icons';

const ReceiptModalUpdate = (props) => {
    const { openModalUpdate, setOpenModalUpdate, dataUpdate, setDataUpdate } = props;
    const [openModalAddReceiptItem, setModalAddReceiptItem] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [products, setProducts] = useState([]);
    const [idSupplier, setIdSupplier] = useState(null);
    const user = useSelector(state => state.account.user);


    // https://ant.design/components/form#components-form-demo-control-hooks
    const [form] = Form.useForm();

    const [listSupplier, setListSupplier] = useState([]);
    const [listBooks, setListBooks] = useState([]);

    const fetchListbook = async () => {
        const res = await callFetchBookBySupplierId(idSupplier);
        if (res && res.data) {
            const d = res.data?.map(item => {
                return { label: item.mainText, value: item.id }
            })
            setListBooks(d)
        }
    }


    const fetchSuppliers = async () => {
        const res = await callFetchListSupplier();
        if (res && res.data) {
            const d = res.data.map(item => {
                return { label: item.name, value: item.id }
            })
            setListSupplier(d)
        }
    }


    useEffect(() => {
        fetchListbook();
    }, [idSupplier]);
    useEffect(() => {
        fetchSuppliers();
    }, []);

    useEffect(() => {
        if (dataUpdate) {
            console.log('dataUpdate', dataUpdate);
            form.setFieldsValue({ ...dataUpdate })
            const listOderitems = dataUpdate.importReceiptDetails.map(product => {
                return { bookId: product?.supply?.book.id, supplierId: product?.supply?.supplier.id, quantity: product.quantity, price: product?.supply?.supplyPrice, totalPrice: product.totalPrice, key: product.id }
            })

            setProducts(listOderitems)
        }

    }, [dataUpdate]);

    useEffect(() => {
        const calculateTotalPrice = () => {
            const totalPrice = products.reduce((total, product) => total + product.totalPrice, 0);
            form.setFieldsValue({ totalPrice });
        };

        calculateTotalPrice();
    }, [products]);


    const onFinish = async (values) => {
        const { id, totalPrice } = values;
        console.log('values', values);
        console.log('products', products);
        const rqProducts = products.map(product => {
            return { supplierId: product.supplierId, bookId: product.bookId, quantity: product.quantity, totalPrice: product.totalPrice }
        })
        setIsSubmit(true)
        console.log('rqProducts', rqProducts);
        const res = await callUpdateImportReceipt(id, user?.email, totalPrice, rqProducts);
        if (res && res.data) {
            message.success('Cập nhập phiếu nhập thành công');
            form.resetFields();
            setOpenModalUpdate(false);
            await props.fetchReceipt()
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

    const handleCancelModal = () => {
        setOpenModalUpdate(false);
        if (dataUpdate) {
            console.log('dataUpdate', dataUpdate);
            form.setFieldsValue({ ...dataUpdate })
            const listOderitems = dataUpdate.importReceiptDetails.map(product => {
                return { bookId: product?.supply?.book.id, supplierId: product?.supply?.supplier.id, quantity: product.quantity, price: product?.supply?.supplyPrice, totalPrice: product.totalPrice, key: product.id }
            })

            setProducts(listOderitems)
        }
    }

    const productColumns = [
        {
            title: 'Mã Sách',
            dataIndex: 'bookId',
            key: 'bookId',
        },
        {
            title: 'Mã nhà cung ứng',
            dataIndex: 'supplierId',
            key: 'supplierId',
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
                <DeleteTwoTone onClick={() => deleteProduct(record.key)} twoToneColor="#ff4d4f" />
            ),
        },
    ];

    return (
        <>

            <Modal
                title="Thêm mới phiếu nhập"
                open={openModalUpdate}
                onOk={() => { form.submit() }}
                onCancel={() => handleCancelModal()}
                okText={"Cập nhập phiếu nhập"}
                cancelText={"Hủy"}
                confirmLoading={isSubmit}
            >
                <Divider />

                <Form
                    form={form}
                    name="update_receipt_form"
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        hidden
                        labelCol={{ span: 24 }}
                        label="Id"
                        name="id"
                        rules={[{ required: true, message: 'Vui lòng nhập Id!' }]}
                    >
                        <Input />
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
                        label="Nhà cung cấp"
                        name="supplier"
                        rules={[{ required: true, message: 'Vui lòng chọn nhà cung cấp!' }]}
                    >
                        <Select
                            defaultValue={null}
                            showSearch
                            allowClear
                            onChange={(value) => setIdSupplier(value)}
                            options={listSupplier}
                        />
                    </Form.Item>

                    {/* Bảng sản phẩm */}
                    <Form.Item label="Danh sách sản phẩm">
                        <Button type="dashed" onClick={() => setModalAddReceiptItem(true)}>
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
            <ModalAddReceiptItem
                openModalAddReceiptItem={openModalAddReceiptItem}
                setModalAddReceiptItem={setModalAddReceiptItem}
                products={products}
                setProducts={setProducts}
                listBooks={listBooks}
                idSupplier={idSupplier}
            />
        </>
    );
};

export default ReceiptModalUpdate;
