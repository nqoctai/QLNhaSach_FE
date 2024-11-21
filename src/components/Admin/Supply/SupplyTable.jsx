import React, { useEffect, useState } from 'react';
import { Table, Row, Col, Popconfirm, Button, message, notification } from 'antd';

import { callDeleteBook, callDeleteSupply, callFetchAllSupplyWithPagination, callFetchListBook } from '../../../services/api';
import { DeleteTwoTone, EditTwoTone, ExportOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';

import moment from 'moment/moment';
import { FORMAT_DATE_DISPLAY } from '../../../utils/constant';

import * as XLSX from 'xlsx';
import SupplyModalDetail from './SupplyModalDetail';
import InputSearch from './InputSearch';
import SupplyModalCreate from './SupplyModalCreate';
import SupplyModalUpdate from './SupplyModalUpdate';

const SupplyTable = () => {
    const [listSupply, setListSupply] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);

    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState("");
    const [sortQuery, setSortQuery] = useState("sort=createdAt,desc");

    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openViewDetail, setOpenViewDetail] = useState(false);
    const [dataViewDetail, setDataViewDetail] = useState(null);

    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);

    useEffect(() => {
        fetchSupply();
    }, [current, pageSize, filter, sortQuery]);

    const fetchSupply = async () => {
        setIsLoading(true)
        let query = `page=${current}&size=${pageSize}`;
        if (filter) {
            query += `&${filter}`;
        }
        if (sortQuery) {
            query += `&${sortQuery}`;
        }

        const res = await callFetchAllSupplyWithPagination(query);
        if (res && res.data) {
            setListSupply(res.data.result);
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
            title: 'Tên sách',
            dataIndex: 'bookMainText',
            sorter: true,
            render: (text, record, index) => {
                return (
                    <>{record?.book?.mainText}</>
                )
            }
        },
        {
            title: 'Tên nhà cung cấp',
            dataIndex: 'supplierName',
            sorter: true,
            render: (text, record, index) => {
                return (
                    <>{record?.supplier?.name}</>
                )
            }
        },
        {
            title: 'Giá nhập',
            dataIndex: 'supplyPrice',
            sorter: true,
            // https://stackoverflow.com/questions/37985642/vnd-currency-formatting
            render: (text, record, index) => {
                return (
                    <>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(record.supplyPrice)}</>
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
            width: 150,
            render: (text, record, index) => {
                return (
                    <>

                        <Popconfirm
                            placement="leftTop"
                            title={"Xác nhận xóa supply"}
                            description={"Bạn có chắc chắn muốn xóa cung ứng này ?"}
                            onConfirm={() => handleDeleteSupply(record.id)}
                            okText="Xác nhận"
                            cancelText="Hủy"
                        >
                            <span style={{ cursor: "pointer", margin: "0 20px" }}>
                                <DeleteTwoTone twoToneColor="#ff4d4f" />
                            </span>
                        </Popconfirm>

                        <EditTwoTone
                            twoToneColor="#f57800" style={{ cursor: "pointer" }}
                            onClick={() => {
                                setOpenModalUpdate(true);
                                setDataUpdate(record);
                            }}
                        />
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
            // const q = sorter.order === 'ascend' ? `sort=${sorter.field},asc` : `sort=${sorter.field},desc`;
            let q = "";
            if (sorter.order === 'ascend') {
                q = `sort=${sorter.field},asc`;
            } else if (sorter.order === 'descend') {
                q = `sort=${sorter.field},desc`;
            }
            setSortQuery(q);
        }
    };

    const handleDeleteSupply = async (id) => {
        const res = await callDeleteSupply(id);
        if (res && res.status == 200) {
            message.success('Xóa cung ứng thành công');
            fetchSupply();
        } else {
            notification.error({
                message: 'Có lỗi xảy ra',
                description: 'Xóa cung ứng không thành công, có các bản ghi khác liên quan'
            });
        }
    };


    // change button color: https://ant.design/docs/react/customize-theme#customize-design-token
    const renderHeader = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Table List Supplies</span>
                <span style={{ display: 'flex', gap: 15 }}>

                    <Button
                        icon={<PlusOutlined />}
                        type="primary"
                        onClick={() => setOpenModalCreate(true)}
                    >Thêm mới</Button>
                    <Button type='ghost' onClick={() => {
                        setFilter("");
                        setSortQuery("")
                    }}>
                        <ReloadOutlined />
                    </Button>


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
                        dataSource={listSupply}
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
            <SupplyModalDetail
                openViewDetail={openViewDetail}
                setOpenViewDetail={setOpenViewDetail}
                dataViewDetail={dataViewDetail}
                setDataViewDetail={setDataViewDetail}
            />

            <SupplyModalCreate
                openModalCreate={openModalCreate}
                setOpenModalCreate={setOpenModalCreate}
                fetchSupply={fetchSupply}
            />

            <SupplyModalUpdate
                openModalUpdate={openModalUpdate}
                setOpenModalUpdate={setOpenModalUpdate}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                fetchSupply={fetchSupply}
            />


        </>
    )
}


export default SupplyTable;
