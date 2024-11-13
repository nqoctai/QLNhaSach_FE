import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Input, message, Modal, notification, Select } from 'antd';
import { callCreateAUser, callCreateCustomer, callCreatePermission, callListRole } from '../../../services/api';

const PermissionModalCreate = (props) => {
    const { openModalCreate, setOpenModalCreate } = props;
    const [isSubmit, setIsSubmit] = useState(false);

    // https://ant.design/components/form#components-form-demo-control-hooks
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        const { name, apiPath, method, module } = values;
        setIsSubmit(true)
        const res = await callCreatePermission(name, apiPath, method, module);
        if (res && res.data) {
            message.success('Tạo mới permission thành công');
            form.resetFields();
            setOpenModalCreate(false);
            await props.fetchPermission()
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
                title="Thêm mới quyền hạn"
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
                        label="Tên quyền hạn"
                        name="name"
                        rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="API"
                        name="apiPath"
                        rules={[{ required: true, message: 'Vui lòng nhập api!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="METHOD"
                        name="method"
                        rules={[{ required: true, message: 'Vui lòng nhập method!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="MODULE"
                        name="module"
                        rules={[{ required: true, message: 'Vui lòng nhập module!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default PermissionModalCreate;
