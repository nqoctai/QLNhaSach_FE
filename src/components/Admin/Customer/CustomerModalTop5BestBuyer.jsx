import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Divider, Form, Input, InputNumber, message, Modal, notification, Select, Table } from 'antd';
import { callCreateAUser, callCreateCustomer, callCreateEmployee, callCreateImportReceipt, callCreateOrder, callCreateRole, callFetchAllPermission, callFetchBookBySupplierId, callFetchListBook, callFetchListBookNoPagination, callFetchListPermissionNoPagination, callFetchListSupplier, callFetchSupplierById, callFetcListShippingStatus, callGetTop5BestBuyer, callListRole, callSupplyBySupplierIDAndBookID } from '../../../services/api';
import moment from 'moment';


const CustomerModalTop5BestBuyer = (props) => {
    const { openModalTop5BestBuyer, setOpenModalTop5BestBuyer } = props;
    const [products, setProducts] = useState([]);


    // https://ant.design/components/form#components-form-demo-control-hooks
    const [form] = Form.useForm();
    useEffect(() => {
        fetchTop5BestBuyer();
    }, []);

    const fetchTop5BestBuyer = async () => {
        const res = await callGetTop5BestBuyer();
        if (res && res.data) {
            setProducts(res.data)
        }
    }

    const productColumns = [
        {
            title: 'Id',
            dataIndex: 'maKH',
            key: 'id',
        },
        {
            title: 'Tên khách hàng',
            dataIndex: 'tenKH',
            key: 'tenKH',
        },
        {
            title: 'email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'sdt',
            key: 'sdt',
        },
        {
            title: 'Số tiền đã mua',
            dataIndex: 'chiPhi',
            key: 'chiPhi',
        }
    ];

    return (
        <>

            <Modal
                title="Top 5 khách hàng mua nhiều nhất"
                open={openModalTop5BestBuyer}
                onOk={() => { form.submit() }}
                onCancel={() => { setOpenModalTop5BestBuyer(false); setProducts([]); form.resetFields(); }}
                cancelText={"Hủy"}
            >
                <Divider />
                {/* Bảng sản phẩm */}
                <Table
                    dataSource={products}
                    columns={productColumns}
                    rowKey="name"
                    pagination={false}
                    style={{ marginTop: 16, overflowX: 'auto' }}
                    bordered
                />
            </Modal>
        </>
    );
};

export default CustomerModalTop5BestBuyer;
