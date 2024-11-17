import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Divider, Form, Input, InputNumber, message, Modal, notification, Select, Table } from 'antd';
import { callCreateAUser, callCreateCustomer, callCreateEmployee, callCreateImportReceipt, callCreateOrder, callCreateRole, callFetchAllPermission, callFetchBookBySupplierId, callFetchListBook, callFetchListBookNoPagination, callFetchListPermissionNoPagination, callFetchListSupplier, callFetchSupplierById, callFetcListShippingStatus, callListRole, callSupplyBySupplierIDAndBookID } from '../../../services/api';
import moment from 'moment';

import { useSelector } from 'react-redux';
import { DeleteTwoTone } from '@ant-design/icons';
import ModalAddPermission from './ModalAddPermission';

const RoleModalCreate = (props) => {
    const { openModalCreate, setOpenModalCreate } = props;
    const [openModalAddPermission, setModalAddPermission] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [products, setProducts] = useState([]);


    // https://ant.design/components/form#components-form-demo-control-hooks
    const [form] = Form.useForm();

    const [listSupplier, setListSupplier] = useState([]);
    const [listPermissions, setListPermissions] = useState([]);

    const fetchListPermission = async () => {
        const res = await callFetchListPermissionNoPagination();
        if (res && res.data) {
            const d = res.data?.map(item => {
                return { label: item.name, value: item.name }
            })
            setListPermissions(d)
        }
    }

    useEffect(() => {
        fetchListPermission();
    }, []);




    const onFinish = async (values) => {
        const { name, description } = values;
        console.log('values', values);
        console.log('products', products);
        const rqProducts = products.map(product => {
            return { id: product.id }
        })
        setIsSubmit(true)
        console.log('rqProducts', rqProducts);
        const res = await callCreateRole(name, description, rqProducts);
        if (res && res.data) {
            message.success('Tạo mới role thành công');
            form.resetFields();
            setOpenModalCreate(false);
            await props.fetchRole()
        } else {
            notification.error({
                message: 'Đã có lỗi xảy ra',
                description: res.message
            })
        }
        setIsSubmit(false)
    };
    const deleteProduct = (key) => {
        setProducts(products.filter((product) => product.key !== key));
    };

    const productColumns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            width: '10%',
        },
        {
            title: 'Tên quyền',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'API',
            dataIndex: 'apiPath',
            key: 'apiPath',
        },
        {
            title: 'METHOD',
            dataIndex: 'method',
            key: 'method',
        },
        {
            title: 'MODULE',
            dataIndex: 'module',
            key: 'module',
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <DeleteTwoTone onClick={() => deleteProduct(record.key)} twoToneColor="#ff4d4f" />
                // <Button type="link" onClick={() => deleteProduct(record.key)}>
                //     Xóa
                // </Button>
            ),
            width: '10%',
        },
    ];

    return (
        <>

            <Modal
                title="Thêm mới role"
                open={openModalCreate}
                onOk={() => { form.submit() }}
                onCancel={() => { setOpenModalCreate(false); setProducts([]); form.resetFields(); }}
                okText={"Tạo mới"}
                cancelText={"Hủy"}
                confirmLoading={isSubmit}
            >
                <Divider />

                <Form
                    form={form}
                    name="create_role_form"
                    onFinish={onFinish}
                    layout="vertical"
                >

                    <Form.Item
                        label="Tên role"
                        name="name"
                        rules={[{ required: true, message: 'Vui lòng nhập tên role!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Mô tả"
                        name="description"
                        rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                    >
                        <Input />
                    </Form.Item>


                    {/* Bảng sản phẩm */}
                    <Form.Item label="Danh sách quyền hạn">
                        <Button type="dashed" onClick={() => setModalAddPermission(true)}>
                            Thêm quyền
                        </Button>
                        <Table
                            dataSource={products}
                            columns={productColumns}
                            rowKey="name"
                            pagination={false}
                            style={{ marginTop: 16, overflowX: 'auto' }}
                            bordered
                        />
                    </Form.Item>
                </Form>
            </Modal>
            <ModalAddPermission
                openModalAddPermission={openModalAddPermission}
                setModalAddPermission={setModalAddPermission}
                products={products}
                setProducts={setProducts}
                listPermissions={listPermissions}
            />
        </>
    );
};

export default RoleModalCreate;
