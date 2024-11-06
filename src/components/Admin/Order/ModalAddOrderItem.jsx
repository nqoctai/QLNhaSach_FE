import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Divider, Form, Input, InputNumber, message, Modal, notification, Select } from 'antd';
import { callCreateAUser, callCreateCustomer, callCreateEmployee, callFetchBookById, callListRole } from '../../../services/api';

const ModalAddOrderItem = (props) => {
    const { openModalAddOrderItem, setModalAddOrderItem, listBooks, products, setProducts } = props;
    const [form] = Form.useForm();
    const [currentProduct, setCurrentProduct] = useState({});
    const onFinish = async (values) => {

        const { book, quantity } = values;
        console.log('book', book);
        const currentBook = await callFetchBookById(book);
        if (currentBook && currentBook.data) {
            const { mainText, price } = currentBook.data;
            const currentProduct = { id: book, name: mainText, quantity, price, totalPrice: price * quantity };
            setCurrentProduct(values);
            setProducts([...products, { ...currentProduct, key: Date.now() }]);
            setModalAddOrderItem(false);
            setCurrentProduct({ name: '', quantity: 1, price: 0 });
        }
        form.resetFields();
    };


    return (
        <>
            {/* Modal thêm sản phẩm */}
            <Modal
                title="Thêm sản phẩm vào đơn hàng"
                open={openModalAddOrderItem}
                onCancel={() => { setModalAddOrderItem(false); form.resetFields() }}
                onOk={() => { form.submit() }}
            >
                <Form layout="vertical"
                    form={form}
                    name="add_order_form"
                    onFinish={onFinish}

                >
                    <Form.Item
                        label="Tên sản phẩm"
                        name="book"
                        rules={[{ required: true, message: 'Vui lòng chọn sản phẩm!' }]}
                    >
                        <Select
                            defaultValue={null}
                            showSearch
                            allowClear
                            options={listBooks}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Số lượng"
                        name="quantity"
                        rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
                    >
                        <InputNumber
                            min={1}
                            placeholder="Nhập số lượng"
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default ModalAddOrderItem;
