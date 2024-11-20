import { Badge, Descriptions, Drawer, Table } from "antd";
import moment from 'moment';
import { callFetchInvoiceByCustomerId } from "../../../services/api";
import { useEffect, useState } from "react";
const CustomerViewDetail = (props) => {
    const { openViewDetail, setOpenViewDetail, dataViewDetail, setDataViewDetail } = props;
    const [products, setProducts] = useState([]);

    const onClose = () => {
        setOpenViewDetail(false);
        setDataViewDetail(null);
    }

    useEffect(() => {
        const fetchData = async () => {
            if (dataViewDetail) {
                console.log('dataViewDetail', dataViewDetail);

                const res = await callFetchInvoiceByCustomerId(dataViewDetail?.id);

                if (res && res.data) {
                    console.log('res.data', res.data);
                    setProducts(res.data);
                }
            }
        };

        fetchData();
    }, [dataViewDetail]);
    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'receiverAddress',
            key: 'receiverAddress'
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'totalPrice',
            key: 'totalPrice'
        }
    ];
    return (
        <>
            <Drawer
                title="Chức năng xem chi tiết"
                width={"50vw"}
                onClose={onClose}
                open={openViewDetail}
            >
                <Descriptions
                    title="Thông tin khách hàng"
                    bordered
                    column={2}
                >
                    <Descriptions.Item label="Id">{dataViewDetail?.id}</Descriptions.Item>
                    <Descriptions.Item label="Họ va tên">{dataViewDetail?.name}</Descriptions.Item>
                    <Descriptions.Item label="Email">{dataViewDetail?.email}</Descriptions.Item>
                    <Descriptions.Item label="Địa chỉ">{dataViewDetail?.address}</Descriptions.Item>
                    <Descriptions.Item label="Số điện thoại">{dataViewDetail?.phone}</Descriptions.Item>
                    <Descriptions.Item label="Giới tính">{dataViewDetail?.gender}</Descriptions.Item>
                    <Descriptions.Item label="Ngày sinh">
                        {moment(dataViewDetail?.birthday).format('DD-MM-YYYY')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Created At">
                        {moment(dataViewDetail?.createdAt).format('DD-MM-YYYY hh:mm:ss')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Updated At">
                        {moment(dataViewDetail?.updatedAt).format('DD-MM-YYYY hh:mm:ss')}
                    </Descriptions.Item>
                </Descriptions>

                <Table
                    columns={columns}
                    dataSource={products}
                    rowKey="id"
                    pagination={false}
                />
            </Drawer>
        </>
    )
}
export default CustomerViewDetail;
