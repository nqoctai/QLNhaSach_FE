import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Input, message, Modal, notification, Select } from 'antd';
import { callUpdateUser, callListRole } from '../../../services/api';

const UserModalUpdate = (props) => {
    const { openModalUpdate, setOpenModalUpdate, dataUpdate, setDataUpdate } = props;
    const [isSubmit, setIsSubmit] = useState(false);
    const [roles, setRoles] = useState([]);

    // https://ant.design/components/form#components-form-demo-control-hooks
    const [form] = Form.useForm();


    const onFinish = async (values) => {
        let { username, id, phone, role } = values;
        setIsSubmit(true)
        const res = await callUpdateUser(+id, username, phone, role);
        if (res && res.data) {
            message.success('Cập nhật user thành công');
            setOpenModalUpdate(false);
            await props.fetchUser()
        } else {
            notification.error({
                message: 'Đã có lỗi xảy ra',
                description: res.message
            })
        }
        setIsSubmit(false)
    };

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
        if (dataUpdate) {
            form.setFieldsValue({ ...dataUpdate, role: { value: dataUpdate?.role?.id, label: dataUpdate?.role?.name } })
        }

        fetchRoles();
    }, [dataUpdate])

    return (
        <>

            <Modal
                title="Cập nhật người dùng"
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
                        label="Tên hiển thị"
                        name="username"
                        rules={[{ required: true, message: 'Vui lòng nhập tên hiển thị!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                    >
                        <Input disabled />
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

export default UserModalUpdate;
