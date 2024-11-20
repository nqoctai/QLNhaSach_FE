import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Divider, Form, Input, InputNumber, message, Modal, notification, Select } from 'antd';
import { callCreateAUser, callCreateCustomer, callCreateEmployee, callFetchBookById, callListRole, callSupplyBySupplierIDAndBookID } from '../../../services/api';

const ModalAddReceiptItem = (props) => {
    const { openModalAddReceiptItem, setModalAddReceiptItem, listBooks, products, setProducts, idSupplier } = props;
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const { book, quantity } = values;
        console.log('book', book);
        const currentPr = await callSupplyBySupplierIDAndBookID(idSupplier, book);
        if (currentPr && currentPr.data) {
            const { book, supplier, supplyPrice } = currentPr.data;
            const currentBook = { bookId: book.id, supplierId: supplier.id, quantity, price: supplyPrice, totalPrice: supplyPrice * quantity };
            const existingProductIndex = products.findIndex(
                (product) => product.bookId === currentBook.bookId && product.supplierId === currentBook.supplierId
            );
            if (existingProductIndex !== -1) {
                // Nếu sản phẩm đã tồn tại, cập nhật quantity và totalPrice
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex].quantity += quantity;
                updatedProducts[existingProductIndex].totalPrice = updatedProducts[existingProductIndex].price * updatedProducts[existingProductIndex].quantity;
                setProducts(updatedProducts);
            } else {
                // Nếu sản phẩm chưa tồn tại, thêm sản phẩm mới vào products
                setProducts([...products, { ...currentBook, key: Date.now() }]);
            }
            setModalAddReceiptItem(false);
            // setCurrentProduct({ book: '', quantity: 1, price: 0 });
        }
        form.resetFields();
    };


    return (
        <>
            {/* Modal thêm sản phẩm */}
            <Modal
                title="Thêm sản phẩm phiếu nhập hàng"
                open={openModalAddReceiptItem}
                onCancel={() => { setModalAddReceiptItem(false); form.resetFields() }}
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

export default ModalAddReceiptItem;
