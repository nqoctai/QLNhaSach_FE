import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Divider, Form, Input, InputNumber, message, Modal, notification, Select } from 'antd';
import { callUpdateUser, callListRole, callUpdateCustomer, callUpdateEmployee } from '../../../services/api';
import moment from 'moment';

const EmployeeModalUpdate = (props) => {
    const { openModalUpdate, setOpenModalUpdate, dataUpdate, setDataUpdate } = props;
    const [isSubmit, setIsSubmit] = useState(false);
    const [roles, setRoles] = useState([]);

    // https://ant.design/components/form#components-form-demo-control-hooks
    const [form] = Form.useForm();


    const onFinish = async (values) => {
        let { id, fullName, address, phone, email, hireDate, salary } = values;
        setIsSubmit(true)
        const res = await callUpdateEmployee(+id, fullName, address, phone, email, hireDate, salary);
        if (res && res.data) {
            message.success('Cập nhật customer thành công');
            setOpenModalUpdate(false);
            await props.fetchEmployee()
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
            const init = {
                id: dataUpdate.id,
                fullName: dataUpdate.fullName,
                hireDate: dataUpdate.hireDate ? moment(dataUpdate.hireDate) : null,
                address: dataUpdate.address,
                email: dataUpdate.email,
                phone: dataUpdate.phone,
                salary: dataUpdate.salary
                // Các trường khác
            };
            form.setFieldsValue(init);
        }
    }, [dataUpdate])

    return (
        <>

            <Modal
                title="Cập nhật nhân viên"
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
                        label="Ngày thuê"
                        name="hireDate"
                        rules={[{ required: true, message: 'Vui lòng nhập ngày thuê!' }]}
                    >
                        <DatePicker format="YYYY-MM-DD" picker="date" />
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


                </Form>
            </Modal>
        </>
    );
};

export default EmployeeModalUpdate;
