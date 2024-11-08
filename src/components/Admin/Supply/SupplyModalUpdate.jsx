import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Divider, Form, Input, InputNumber, message, Modal, notification, Select } from 'antd';
import { callCreateAUser, callCreateCustomer, callCreateEmployee, callCreateSupply, callFetchListBookNoPagination, callFetchListSupplier, callListRole, callUpdateSupply } from '../../../services/api';

const SupplyModalUpdate = (props) => {
    const { openModalUpdate, setOpenModalUpdate, dataUpdate, setDataUpdate } = props;
    const [isSubmit, setIsSubmit] = useState(false);

    // https://ant.design/components/form#components-form-demo-control-hooks
    const [form] = Form.useForm();
    const [books, setBooks] = useState([]);
    const [suppliers, setSuppliers] = useState([]);

    const fetchBook = async () => {
        const res = await callFetchListBookNoPagination();
        if (res && res.data) {
            const d = res.data.map(item => {
                return { label: item.mainText, value: item.id }
            })
            setBooks(d)
        }
    }

    const fetchSuppliers = async () => {
        const res = await callFetchListSupplier();
        if (res && res.data) {
            const d = res.data.map(item => {
                return { label: item.name, value: item.id }
            })
            setSuppliers(d)
        }
    }
    useEffect(() => {
        fetchBook();
        fetchSuppliers();
    }, [])

    useEffect(() => {
        if (dataUpdate) {
            console.log('dataUpdate', dataUpdate);
            const init = { id: dataUpdate.id, book: dataUpdate.book.id, supplier: dataUpdate.supplier.id, supplyPrice: dataUpdate.supplyPrice }
            form.setFieldsValue({ ...init })
        }

    }, [dataUpdate]);


    const onFinish = async (values) => {
        const { id, book, supplier, supplyPrice } = values;
        console.log('values', values);
        setIsSubmit(true)
        const res = await callUpdateSupply(id, supplier, book, supplyPrice);
        if (res && res.data) {
            message.success('Cập nhật cung ứng thành công');
            form.resetFields();
            setOpenModalUpdate(false);
            await props.fetchSupply()
        } else {
            notification.error({
                message: 'Đã có lỗi xảy ra',
                description: res.message
            })
        }
        setIsSubmit(false)
    };

    return (
        <>

            <Modal
                title="Cập nhật cung ứng"
                open={openModalUpdate}
                onOk={() => { form.submit() }}
                onCancel={() => setOpenModalUpdate(false)}
                okText={"Cập nhật"}
                cancelText={"Hủy"}
                confirmLoading={isSubmit}
            >
                <Divider />

                <Form
                    form={form}
                    name="update_supply_form"
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    autoComplete="off"
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
                        labelCol={{ span: 24 }}
                        label="Sách"
                        name="book"
                        rules={[{ required: true, message: 'Vui lòng chọn sách!' }]}
                    >
                        <Select
                            defaultValue={null}
                            showSearch
                            allowClear
                            options={books}
                        />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Nhà cung cấp"
                        name="supplier"
                        rules={[{ required: true, message: 'Vui lòng chọn nhà cung cấp!' }]}
                    >
                        <Select
                            defaultValue={null}
                            showSearch
                            allowClear
                            options={suppliers}
                        />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Giá nhập"
                        name="supplyPrice"
                        rules={[{ required: true, message: 'Vui lòng nhập giá nhập!' }]}
                    >
                        <InputNumber
                            min={0}
                            style={{ width: '100%' }}
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            addonAfter="VND"
                        />
                    </Form.Item>

                </Form>
            </Modal>
        </>
    );
};

export default SupplyModalUpdate;
