import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Input, message, Modal, notification, Select } from 'antd';
import { callUpdateUser, callListRole, callUpdateCustomer, callUpdatePermission } from '../../../services/api';

const PermissionModalUpdate = (props) => {
    const { openModalUpdate, setOpenModalUpdate, dataUpdate, setDataUpdate } = props;
    const [isSubmit, setIsSubmit] = useState(false);

    // https://ant.design/components/form#components-form-demo-control-hooks
    const [form] = Form.useForm();


    const onFinish = async (values) => {
        let { id, name, apiPath, method, module } = values;
        setIsSubmit(true)
        const res = await callUpdatePermission(+id, name, apiPath, method, module);
        if (res && res.data) {
            message.success('Cập nhật permission thành công');
            setOpenModalUpdate(false);
            await props.fetchPermission()
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
            form.setFieldsValue({ ...dataUpdate })
        }
    }, [dataUpdate])

    return (
        <>

            <Modal
                title="Cập nhật quyền hạn"
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

export default PermissionModalUpdate;
