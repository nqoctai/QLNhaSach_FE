import { Badge, Descriptions, Divider, Popconfirm, Space, Table, Tag } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { callOrderHistory, callUpdateOrder } from "../../services/api";
import { FORMAT_DATE_DISPLAY } from "../../utils/constant";
import ReactJson from 'react-json-view'
import { useSelector } from "react-redux";
import HistoryOrderViewDetail from "./HistoryOrderViewDetail";
import { DeleteTwoTone } from "@ant-design/icons";

const History = () => {
    const [orderHistory, setOrderHistory] = useState([]);
    const account = useSelector(state => state?.account?.user);
    const [dataViewDetail, setDataViewDetail] = useState(null);
    const [openViewDetail, setOpenViewDetail] = useState(false);
    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        const res = await callOrderHistory(account?.id);
        if (res && res.data) {
            console.log(res.data);
            setOrderHistory(res.data);
        }
    }

    const handleDeleteOrder = async (id) => {
        const res = await callUpdateOrder(id, 8, 'Khách hàng đã hủy đơn hàng');
        if (res && res.data) {
            fetchHistory();
            notification.success({ message: "Hủy đơn hàng thành công" });
        } else {
            notification.error({ message: "Hủy đơn hàng thất bại" });
        }

    }

    const columns = [
        {
            title: 'STT',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => {
                return (
                    <a href='#' onClick={() => {
                        setDataViewDetail(record);
                        setOpenViewDetail(true);
                    }}>{index + 1}</a>
                )
            }
        },
        {
            title: 'Thời gian ',
            dataIndex: 'createdAt',
            render: (item, record, index) => {
                return moment(item).format(FORMAT_DATE_DISPLAY)
            }
        },
        {
            title: 'Tổng số tiền',
            dataIndex: 'totalPrice',
            render: (item, record, index) => {
                return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item)
            }
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            sorter: true,
            render: (text, record, index) => {
                const orderShippingEventsNew = record.orderShippingEvents.reduce((latest, event) => {
                    return new Date(event.createdAt) > new Date(latest.createdAt) ? event : latest;
                }, record.orderShippingEvents[0]);

                console.log('orderShippingEventsNew', orderShippingEventsNew);
                return (
                    <>
                        {orderShippingEventsNew?.shippingStatus?.status === "Hủy bỏ" ?
                            <Tag color={"red"}>{orderShippingEventsNew?.shippingStatus?.status}</Tag> :
                            orderShippingEventsNew?.shippingStatus?.status === "Hoàn thành" ?
                                <Tag color={"green"}>{orderShippingEventsNew?.shippingStatus?.status}</Tag> :
                                <Tag color={"blue"}>{orderShippingEventsNew?.shippingStatus?.status}</Tag>}
                    </>

                )
            }
        },
        {
            title: 'Địa chỉ nhận hàng',
            dataIndex: 'receiverAddress',
            render: (item, record, index) =>
                (<>{item}</>)

        },
        {
            title: 'Số điện thoại nhận hàng',
            dataIndex: 'receiverPhone',
            render: (item, record, index) =>
                (<>{item}</>)
        }, ,
        {
            title: 'Action',
            render: (text, record, index) => {
                const orderShippingEventsNew = record.orderShippingEvents.reduce((latest, event) => {
                    return new Date(event.createdAt) > new Date(latest.createdAt) ? event : latest;
                }, record.orderShippingEvents[0]);
                return (
                    <>
                        {
                            orderShippingEventsNew?.shippingStatus?.status !== "Chờ xác nhận" ? null :
                                <Popconfirm
                                    placement="leftTop"
                                    title={"Xác nhận xóa user"}
                                    description={"Bạn có chắc chắn muốn hủy đơn hàng này ?"}
                                    onConfirm={() => handleDeleteOrder(record.id)}
                                    okText="Xác nhận"
                                    cancelText="Hủy"
                                >
                                    <span style={{ cursor: "pointer", margin: "0 20px" }}>
                                        <DeleteTwoTone twoToneColor="#ff4d4f" />
                                    </span>
                                </Popconfirm>
                        }
                    </>

                )
            }
        }

    ];


    return (
        <>
            <div >
                <div style={{ margin: "15px 0" }}>Lịch sử đặt hàng:</div>
                <Table columns={columns} dataSource={orderHistory} pagination={false} scroll={{ y: 500 }} />
            </div>
            <HistoryOrderViewDetail
                openViewDetail={openViewDetail}
                setOpenViewDetail={setOpenViewDetail}
                dataViewDetail={dataViewDetail}
                setDataViewDetail={setDataViewDetail}
            />
        </>


    )
}

export default History;
