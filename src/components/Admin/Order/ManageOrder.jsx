import React, { useEffect, useState } from 'react';
import { Table, Row, Col, Popconfirm, Button, message, notification, Tag } from 'antd';
import { callFetchListOrder } from '../../../services/api';
import { CloudUploadOutlined, DeleteTwoTone, EditTwoTone, ExportOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import moment from 'moment/moment';
import { FORMAT_DATE_DISPLAY } from '../../../utils/constant';
import OrderModalCreate from './OrderModalCreate';
import OrderModalUpdate from './OrderModalUpdate';
import OrderViewDetail from './OrderViewDetail';
import InputSearch from './InputSearch';


// https://stackblitz.com/run?file=demo.tsx
const ManageOrder = () => {
    const [listOrder, setListOrder] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [dataViewDetail, setDataViewDetail] = useState(null);
    const [openViewDetail, setOpenViewDetail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState("");
    const [sortQuery, setSortQuery] = useState("sort=createdAt,desc");
    const [dataUpdate, setDataUpdate] = useState(null);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);

    useEffect(() => {
        fetchOrder();
    }, [current, pageSize, filter, sortQuery]);

    const fetchOrder = async () => {
        setIsLoading(true)
        let query = `page=${current}&size=${pageSize}`;
        if (filter) {
            query += `&${filter}`;
        }
        if (sortQuery) {
            query += `&${sortQuery}`;
        }

        const res = await callFetchListOrder(query);
        if (res && res.data) {
            setListOrder(res.data.result);
            setTotal(res.data.meta.total)
        }
        setIsLoading(false)
    }

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            render: (text, record, index) => {
                return (
                    <a href='#' onClick={() => {
                        setDataViewDetail(record);
                        setOpenViewDetail(true);
                    }}>{record.id}</a>
                )
            }
        },
        {
            title: 'Price',
            dataIndex: 'totalPrice',
            render: (text, record, index) => {
                return (
                    <>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(record.totalPrice)}</>

                )
            },
            sorter: true
        },
        {
            title: 'Email',
            dataIndex: 'receiverEmail',
            sorter: true
        },
        {
            title: 'Name',
            dataIndex: 'receiverName',
            sorter: true
        },
        {
            title: 'Address',
            dataIndex: 'receiverAddress',
            sorter: true,
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'receiverPhone',
            sorter: true
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            sorter: true,
            render: (text, record, index) => {
                const orderShippingEventsNew = record.orderShippingEvents.reduce((latest, event) => {
                    return new Date(event.createdAt) > new Date(latest.createdAt) ? event : latest;
                }, record.orderShippingEvents[0]);
                <Tag color={"green"}>
                    Thành công
                </Tag>
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
            title: 'Ngày cập nhật',
            dataIndex: 'updatedAt',
            sorter: true,
            render: (text, record, index) => {
                return (
                    <>{moment(record.updatedAt).format(FORMAT_DATE_DISPLAY)}</>
                )
            }

        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            sorter: true,
            render: (text, record, index) => {
                return (
                    <>{moment(record.createdAt).format(FORMAT_DATE_DISPLAY)}</>
                )
            }

        },
        {
            title: 'Action',
            render: (text, record, index) => {
                const orderShippingEventsNew = record.orderShippingEvents.reduce((latest, event) => {
                    return new Date(event.createdAt) > new Date(latest.createdAt) ? event : latest;
                }, record.orderShippingEvents[0]);
                return (
                    <>
                        {
                            orderShippingEventsNew?.shippingStatus?.status === "Hủy bỏ" || orderShippingEventsNew?.shippingStatus?.status === "Hoàn thành" ? null :
                                <EditTwoTone
                                    twoToneColor="#f57800" style={{ cursor: "pointer" }}
                                    onClick={() => {
                                        setOpenModalUpdate(true);
                                        setDataUpdate(record);
                                    }}
                                />
                        }
                    </>

                )
            }
        }

    ];

    const onChange = (pagination, filters, sorter, extra) => {
        if (pagination && pagination.current !== current) {
            setCurrent(pagination.current)
        }
        if (pagination && pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize)
            setCurrent(1);
        }
        if (sorter && sorter.field) {
            // const q = sorter.order === 'ascend' ? `sort=${sorter.field}` : `sort=-${sorter.field}`;
            let q = "";
            if (sorter.order === 'ascend') {
                q = `sort=${sorter.field},asc`;
            } else if (sorter.order === 'descend') {
                q = `sort=${sorter.field},desc`;
            }
            setSortQuery(q);
        }
    };




    // change button color: https://ant.design/docs/react/customize-theme#customize-design-token
    const renderHeader = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Table List Order</span>
                <span style={{ display: 'flex', gap: 15 }}>
                    <Button type='ghost' onClick={() => {
                        setFilter("");
                        setSortQuery("")
                    }}>
                        <ReloadOutlined />
                    </Button>

                    <Button
                        icon={<PlusOutlined />}
                        type="primary"
                        onClick={() => setOpenModalCreate(true)}
                    >Thêm mới</Button>


                </span>
            </div>
        )
    }

    const handleSearch = (query) => {
        setFilter(query);
    }


    return (
        <>
            <Row gutter={[20, 20]}>
                <Col span={24}>
                    <InputSearch
                        handleSearch={handleSearch}
                        setFilter={setFilter}
                    />
                </Col>
                <Col span={24}>
                    <Table
                        title={renderHeader}
                        loading={isLoading}

                        columns={columns}
                        dataSource={listOrder}
                        onChange={onChange}
                        rowKey="id"
                        pagination={
                            {
                                current: current,
                                pageSize: pageSize,
                                showSizeChanger: true,
                                total: total,
                                showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                            }
                        }
                        scroll={{ y: 280 }}

                    />
                </Col>
            </Row>
            <OrderModalCreate
                openModalCreate={openModalCreate}
                setOpenModalCreate={setOpenModalCreate}
                fetchOrder={fetchOrder}
            />
            <OrderModalUpdate
                openModalUpdate={openModalUpdate}
                setOpenModalUpdate={setOpenModalUpdate}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                fetchOrder={fetchOrder}
            />
            <OrderViewDetail
                openViewDetail={openViewDetail}
                setOpenViewDetail={setOpenViewDetail}
                dataViewDetail={dataViewDetail}
                setDataViewDetail={setDataViewDetail}
            />
        </>
    )
}


export default ManageOrder;
