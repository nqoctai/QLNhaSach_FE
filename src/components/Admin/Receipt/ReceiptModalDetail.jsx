import { Badge, Descriptions, Drawer, Steps, Table } from "antd";
import moment from 'moment';
import { useEffect, useState } from "react";
import { callSupplyBySupplierIDAndBookID } from "../../../services/api";
const ReceiptModalDetail = (props) => {
    const { openViewDetail, setOpenViewDetail, dataViewDetail, setDataViewDetail } = props;
    const [steps, setsteps] = useState([]);
    const [products, setProducts] = useState([]);



    const onClose = () => {
        setOpenViewDetail(false);
        setDataViewDetail(null);
    }

    const callSupply = async (supplierId, bookId) => {
        const res = await callSupplyBySupplierIDAndBookID(supplierId, bookId);
        if (res && res.data) {
            return res.data;
        }
    };
    // useEffect(() => {
    //     if (dataViewDetail) {
    //         console.log('dataViewDetail', dataViewDetail);
    //         const { importReceiptDetails } = dataViewDetail;

    //         const listOderitems = importReceiptDetails.map(product => {
    //             return { bookId: product?.supply?.book.id, supplierId: product?.supply?.supplier.id, quantity: product.quantity, price: product?.supply?.supplyPrice, totalPrice: product.totalPrice, key: product.id }
    //         })

    //         setProducts(listOderitems)
    //     }

    // }, [dataViewDetail]);
    useEffect(() => {
        const fetchData = async () => {
            if (dataViewDetail) {
                console.log('dataViewDetail', dataViewDetail);
                const { importReceiptDetails } = dataViewDetail;

                // Sử dụng Promise.all để đợi tất cả các cuộc gọi `callSupply`
                const listOderItems = await Promise.all(
                    importReceiptDetails.map(async (product) => {
                        const supplyData = await callSupply(product?.supply?.supplier.id, product?.supply?.book.id);
                        return {
                            supplyId: supplyData?.id,
                            bookId: product?.supply?.book.id,
                            supplierId: product?.supply?.supplier.id,
                            quantity: product.quantity,
                            price: supplyData?.supplyPrice || product?.supply?.supplyPrice,
                            totalPrice: product.totalPrice,
                            key: product.id,
                        };
                    })
                );

                setProducts(listOderItems);
            }
        };

        fetchData();
    }, [dataViewDetail]);

    const columns = [
        {
            title: 'Mã cung ứng',
            dataIndex: 'supplyId',
            key: 'supplyId',
        },

        {
            title: 'Mã sản phẩm',
            dataIndex: 'bookId',
            key: 'bookId',
        },
        {
            title: 'Mã nhà cung cấp',
            dataIndex: 'supplierId',
            key: 'supplierId',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            key: 'price',
            render: (text) => `${text} đ`,
        },
        {
            title: 'Tổng giá',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (text) => `${text} đ`,
        },
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
                    <Descriptions.Item label="Người tạo">{dataViewDetail?.createdBy}</Descriptions.Item>
                    <Descriptions.Item label="Tổng tiền"> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dataViewDetail?.totalAmount)}</Descriptions.Item>
                    <Descriptions.Item label="Created At">
                        {moment(dataViewDetail?.createdAt).format('DD-MM-YYYY hh:mm:ss')}
                    </Descriptions.Item>
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
export default ReceiptModalDetail;
