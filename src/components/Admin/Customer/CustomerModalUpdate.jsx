import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Divider, Form, Input, message, Modal, notification, Select } from 'antd';
import { callUpdateUser, callListRole, callUpdateCustomer } from '../../../services/api';
import { Option } from 'antd/es/mentions';
import moment from 'moment';

const CustomerModalUpdate = (props) => {
    const { openModalUpdate, setOpenModalUpdate, dataUpdate, setDataUpdate } = props;
    const [isSubmit, setIsSubmit] = useState(false);
    const [roles, setRoles] = useState([]);

    // https://ant.design/components/form#components-form-demo-control-hooks
    const [form] = Form.useForm();


    const onFinish = async (values) => {
        let { id, name, address, phone, email, gender, birthday } = values;
        setIsSubmit(true)
        const res = await callUpdateCustomer(+id, name, address, phone, email, gender, birthday);
        if (res && res.data) {
            message.success('Cập nhật customer thành công');
            setOpenModalUpdate(false);
            await props.fetchCustomer()
        } else {
            notification.error({
                message: 'Đã có lỗi xảy ra',
                description: res.message
            })
        }
        setIsSubmit(false)
    };


    useEffect(() => {
        if (dataUpdate) {
            console.log(dataUpdate)
            form.setFieldsValue({ ...dataUpdate, birthday: dataUpdate.birthday ? moment(dataUpdate.birthday) : null })
        }
    }, [dataUpdate])

    return (
        <>

            <Modal
                title="Cập nhật khách hàng"
                open={openModalUpdate}
                onOk={() => { form.submit() }}
                onCancel={() => {
                    setOpenModalUpdate(false);
                    setDataUpdate(null);
                }}
                okText={"Cập nhật"}
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
                // initialValues={dataUpdate}
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
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
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
                        label="Giới tính"
                        name="gender"
                        rules={[{ required: true, message: 'Vui lòng giới tính!' }]}
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

export default CustomerModalUpdate;
