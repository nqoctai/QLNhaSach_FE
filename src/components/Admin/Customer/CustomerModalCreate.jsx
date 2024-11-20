import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Divider, Form, Input, message, Modal, notification, Select } from 'antd';
import { callCreateAUser, callCreateCustomer, callListRole } from '../../../services/api';

const CustomerModalCreate = (props) => {
    const { openModalCreate, setOpenModalCreate } = props;
    const [isSubmit, setIsSubmit] = useState(false);

    // https://ant.design/components/form#components-form-demo-control-hooks
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        const { name, address, phone, email, gender, birthday } = values;
        setIsSubmit(true)
        const res = await callCreateCustomer(name, address, phone, email, gender, birthday);
        if (res && res.data) {
            message.success('Tạo mới customer thành công');
            form.resetFields();
            setOpenModalCreate(false);
            await props.fetchCustomer()
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
                title="Thêm mới khách hàng"
                open={openModalCreate}
                onOk={() => { form.submit() }}
                onCancel={() => setOpenModalCreate(false)}
                okText={"Tạo mới"}
                cancelText={"Hủy"}
                confirmLoading={isSubmit}
            >
                <Divider />

                <Form
                    form={form}
                    name="basic"
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Họ và tên"
                        name="name"
                        rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Địa chỉ"
                        name="address"
                        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Số điện thoại"
                        name="phone"
                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Giới tính"
                        name="gender"
                        rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                    >
                        <Select
                            placeholder="Chọn giới tính"
                            allowClear
                        >
                            <Option value="Nam">Nam</Option>
                            <Option value="Nữ">Nữ</Option>
                            <Option value="Khác">Khác</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Ngày sinh"
                        name="birthday"
                        rules={[{ required: true, message: 'Vui lòng nhập ngày sinh!' }]}
                    >
                        <DatePicker />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default CustomerModalCreate;
