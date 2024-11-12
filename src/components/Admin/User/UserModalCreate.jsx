import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Input, message, Modal, notification, Select } from 'antd';
import { callCreateAUser, callListRole } from '../../../services/api';

const UserModalCreate = (props) => {
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
        const { username, password, email, phone, role } = values;
        setIsSubmit(true)
        const res = await callCreateAUser(username, password, email, phone, role);
        if (res && res.data) {
            message.success('Tạo mới tài khoản thành công');
            form.resetFields();
            setOpenModalCreate(false);
            await props.fetchUser()
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
                title="Thêm mới tài khoản"
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
                        label="Tên hiển thị"
                        name="username"
                        rules={[{ required: true, message: 'Vui lòng nhập tên hiển thị!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                    >
                        <Input.Password />
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

export default UserModalCreate;
