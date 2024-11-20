import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Divider, Form, Input, InputNumber, message, Modal, notification, Select, Table } from 'antd';
import { callCreateAUser, callCreateCustomer, callCreateEmployee, callCreateImportReceipt, callCreateOrder, callCreateRole, callFetchAllPermission, callFetchBookBySupplierId, callFetchListBook, callFetchListBookNoPagination, callFetchListPermissionNoPagination, callFetchListSupplier, callFetchSupplierById, callFetcListShippingStatus, callGetTop5BestBuyer, callListRole, callRevenueBookArePlaced, callSupplyBySupplierIDAndBookID } from '../../../services/api';
import moment from 'moment';


const BookModalRevenue = (props) => {
    const { openModalRevenue, setOpenModalRevenue } = props;
    const [products, setProducts] = useState([]);
    const { RangePicker } = DatePicker;


    // https://ant.design/components/form#components-form-demo-control-hooks
    const [form] = Form.useForm();

    const productColumns = [
        {
            title: 'Id',
            dataIndex: 'bookID',
            key: 'id',
        },
        {
            title: 'Tên sách',
            dataIndex: 'bookName',
            key: 'bookName',
        },
        {
            title: 'Số luợng đã đặt',
            dataIndex: 'totalQuantity',
            key: 'totalQuantity',
        }
    ];

    const onFinish = async (values) => {
        if (values.RangeDate) {
            const dateStart = values.RangeDate[0].format('YYYY-MM-DD');
            const dateFinish = values.RangeDate[1].format('YYYY-MM-DD');
            const res = await callRevenueBookArePlaced(dateStart, dateFinish);
            if (res && res.data) {
                setProducts(res.data)
            }
        }
    };

    return (
        <>

            <Modal
                title="Thống kê số lượng sách đã đặt theo thời gian"
                open={openModalRevenue}
                onOk={() => { form.submit() }}
                onCancel={() => { setOpenModalRevenue(false); setProducts([]); form.resetFields(); }}
                cancelText={"Hủy"}
            >
                <Form layout="vertical"
                    form={form}
                    name="add_rangedate_form"
                    onFinish={onFinish}

                >
                    <Form.Item
                        labelCol={{ span: 24 }}
                        name={`RangeDate`}
                        label={`Khoảng thời gian`}
                    >
                        <RangePicker />
                    </Form.Item>

                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
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
            </Modal >
        </>
    );
};

export default BookModalRevenue;
