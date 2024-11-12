import { Badge, Descriptions, Drawer, Steps, Table } from "antd";
import moment from 'moment';
import { useEffect, useState } from "react";
const OrderViewDetail = (props) => {
    const { openViewDetail, setOpenViewDetail, dataViewDetail, setDataViewDetail } = props;
    const [steps, setsteps] = useState([]);
    const [products, setProducts] = useState([]);



    const onClose = () => {
        setOpenViewDetail(false);
        setDataViewDetail(null);
    }

    useEffect(() => {
        if (dataViewDetail) {
            const { orderShippingEvents } = dataViewDetail;
            const init = orderShippingEvents?.map(item => {
                return { title: item.shippingStatus.status, description: item?.note, subTitle: moment(item.createdAt).format('DD-MM-YYYY hh:mm:ss') }
            }
            )
            setsteps(init)

            const listOderitems = dataViewDetail.orderItems.map(product => {
                return { mainText: product.book.mainText, quantity: product.quantity, price: product.book.price, totalPrice: product.price, key: product.id }
            })

            setProducts(listOderitems)
        }

    }, [dataViewDetail]);

    const columns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'mainText',
            key: 'mainText',
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
                    <Descriptions.Item label="Họ và tên">{dataViewDetail?.receiverName}</Descriptions.Item>
                    <Descriptions.Item label="Email">{dataViewDetail?.receiverEmail}</Descriptions.Item>
                    <Descriptions.Item label="Địa chỉ">{dataViewDetail?.receiverAddress}</Descriptions.Item>
                    <Descriptions.Item label="Số điện thoại">{dataViewDetail?.receiverPhone}</Descriptions.Item>
                    <Descriptions.Item label="Mã khách hàng">{dataViewDetail?.customer?.id}</Descriptions.Item>

                    <Descriptions.Item label="Created At">
                        {moment(dataViewDetail?.createdAt).format('DD-MM-YYYY hh:mm:ss')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Updated At">
                        {moment(dataViewDetail?.updatedAt).format('DD-MM-YYYY hh:mm:ss')}
                    </Descriptions.Item>

                </Descriptions>
                <p style={{ marginTop: '15px' }}>Chi tiết sản phẩm</p>
                <Table
                    columns={columns}
                    dataSource={products}
                    rowKey="id"
                    pagination={false}
                />
                <p style={{ marginTop: '15px' }}>Trạng thái đơn hàng</p>
                <Steps
                    direction="vertical"
                    size="small"
                    current={steps.length - 1}
                    style={{ marginTop: '16px' }}
                    items={[
                        ...steps
                    ]}
                />



            </Drawer >
        </>
    )
}
export default OrderViewDetail;
