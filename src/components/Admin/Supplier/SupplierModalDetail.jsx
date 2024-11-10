import { Badge, Descriptions, Drawer, Steps, Table } from "antd";
import moment from 'moment';
import { useEffect, useState } from "react";
import { callFetchSupplyBySupplierId, callSupplyBySupplierIDAndBookID } from "../../../services/api";
const SupplierModalDetail = (props) => {
    const { openViewDetail, setOpenViewDetail, dataViewDetail, setDataViewDetail } = props;
    const [steps, setsteps] = useState([]);
    const [products, setProducts] = useState([]);



    const onClose = () => {
        setOpenViewDetail(false);
        setDataViewDetail(null);
    }

    const fetchSupplyBySupplierID = async (supplierID) => {
        const response = await callFetchSupplyBySupplierId(supplierID);
        if (response && response.data) {
            return response.data;
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if (dataViewDetail) {
                console.log('dataViewDetail', dataViewDetail);

                const supply = await fetchSupplyBySupplierID(dataViewDetail?.id);

                const listPr = supply.map(product => {
                    return { bookId: product?.book?.id, bookName: product?.book?.mainText, price: product?.supplyPrice, key: product.id };
                });

                setProducts(listPr);
            }
        };

        fetchData();
    }, [dataViewDetail]);


    const columns = [
        {
            title: 'Mã sách',
            dataIndex: 'bookId',
            key: 'bookId',
        },
        {
            title: 'Tên sách',
            dataIndex: 'bookName',
            key: 'bookName',
        },
        {
            title: 'Giá nhập',
            dataIndex: 'price',
            key: 'price',
            render: (text) => `${text} đ`,
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
                    title="Thông tin đơn hàng"
                    bordered
                    column={2}
                >
                    <Descriptions.Item label="Id">{dataViewDetail?.id}</Descriptions.Item>
                    <Descriptions.Item label="Tên nhà cung cấp">{dataViewDetail?.name}</Descriptions.Item>
                    <Descriptions.Item label="Địa chỉ">{dataViewDetail?.address}</Descriptions.Item>
                    <Descriptions.Item label="Số điện thoại">{dataViewDetail?.phone}</Descriptions.Item>
                    <Descriptions.Item label="Email">{dataViewDetail?.email}</Descriptions.Item>
                </Descriptions>
                <p style={{ marginTop: '15px' }}>Chi tiết sản phẩm</p>
                <Table
                    columns={columns}
                    dataSource={products}
                    rowKey="id"
                    pagination={false}
                />
            </Drawer >
        </>
    )
}
export default SupplierModalDetail;
