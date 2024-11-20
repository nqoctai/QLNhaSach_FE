import { Badge, Descriptions, Drawer, Steps, Table } from "antd";
import moment from 'moment';
import { useEffect, useState } from "react";
import { callFetchSupplyBySupplierId, callSupplyBySupplierIDAndBookID } from "../../../services/api";
const RoleViewDetail = (props) => {
    const { openViewDetail, setOpenViewDetail, dataViewDetail, setDataViewDetail } = props;
    const [products, setProducts] = useState([]);



    const onClose = () => {
        setOpenViewDetail(false);
        setDataViewDetail(null);
    }



    useEffect(() => {

        if (dataViewDetail) {
            console.log('dataViewDetail', dataViewDetail);

            const listPr = dataViewDetail.permissions.map(item => {
                return { name: item?.name, apiPath: item?.apiPath, method: item?.method, module: item?.module, key: item.id };
            });

            setProducts(listPr);
        }



    }, [dataViewDetail]);


    const columns = [
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
                    title="Thông tin vai trò"
                    bordered
                    column={2}
                >
                    <Descriptions.Item label="Id">{dataViewDetail?.id}</Descriptions.Item>
                    <Descriptions.Item label="Tên role">{dataViewDetail?.name}</Descriptions.Item>
                    <Descriptions.Item label="Mô tả">{dataViewDetail?.description}</Descriptions.Item>
                    <Descriptions.Item label="Created By">{dataViewDetail?.createdBy}</Descriptions.Item>
                    <Descriptions.Item label="Created At">
                        {moment(dataViewDetail?.createdAt).format('DD-MM-YYYY hh:mm:ss')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Updated At">
                        {moment(dataViewDetail?.updatedAt).format('DD-MM-YYYY hh:mm:ss')}
                    </Descriptions.Item>
                </Descriptions>
                <p style={{ marginTop: '15px' }}>Chi tiết quyền hạn</p>
                <Table
                    columns={columns}
                    dataSource={products}
                    rowKey="id"
                    pagination={false}
                    scroll={{ y: 280 }}
                />
            </Drawer >
        </>
    )
}
export default RoleViewDetail;
