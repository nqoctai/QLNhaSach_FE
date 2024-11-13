import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Divider, Form, Input, InputNumber, message, Modal, notification, Select } from 'antd';
import { callCreateAUser, callCreateCustomer, callCreateEmployee, callListRole } from '../../../services/api';

const EmployeeModalCreate = (props) => {
    const { openModalCreate, setOpenModalCreate } = props;
    const [isSubmit, setIsSubmit] = useState(false);

    // https://ant.design/components/form#components-form-demo-control-hooks
    const [form] = Form.useForm();
    const [roles, setRoles] = useState([]);

    const fetchRoles = async () => {
        const res = await callListRole();
        if (res && res.data) {
            const d = res.data.map(item => {
                return { label: item.name, value: item.id }
            })
            setRoles(d)
        }
    }
    useEffect(() => {
        fetchRoles()
    }, [])
    const onFinish = async (values) => {
        const { fullName, address, phone, email, hireDate, salary, role } = values;
        setIsSubmit(true)
        const res = await callCreateEmployee(fullName, address, phone, email, hireDate, salary, role);
        if (res && res.data) {
            message.success('Tạo mới nhân viên thành công');
            form.resetFields();
            setOpenModalCreate(false);
            await props.fetchEmployee()
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
                title="Thêm mới nhân viên"
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
                        name="fullName"
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
                        label="Ngày thuê"
                        name="hireDate"
                        rules={[{ required: true, message: 'Vui lòng nhập ngày thuê!' }]}
                    >
                        <DatePicker />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Lương"
                        name="salary"
                        rules={[{ required: true, message: 'Vui lòng nhập lương!' }]}
                    >
                        <InputNumber
                            min={0}
                            style={{ width: '100%' }}
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            addonAfter="VND"
                        />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Vai trò"
                        name="role"
                        rules={[{ required: true, message: 'Vui lòng chọn role!' }]}
                    >
                        <Select
                            defaultValue={null}
                            showSearch
                            allowClear
                            options={roles}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default EmployeeModalCreate;
