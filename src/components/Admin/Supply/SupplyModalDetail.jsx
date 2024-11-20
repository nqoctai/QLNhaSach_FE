import { Badge, Descriptions, Drawer } from "antd";
import moment from 'moment';
const SupplyModalDetail = (props) => {
    const { openViewDetail, setOpenViewDetail, dataViewDetail, setDataViewDetail } = props;

    const onClose = () => {
        setOpenViewDetail(false);
        setDataViewDetail(null);
    }
    return (
        <>
            <Drawer
                title="Chức năng xem chi tiết"
                width={"50vw"}
                onClose={onClose}
                open={openViewDetail}
            >
                <Descriptions
                    title="Thông tin cung ứng"
                    bordered
                    column={2}
                >
                    <Descriptions.Item label="Id">{dataViewDetail?.id}</Descriptions.Item>
                    <Descriptions.Item label="Giá nhập">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dataViewDetail?.supplyPrice ?? 0)}</Descriptions.Item>
                    <Descriptions.Item label="Mã sách">{dataViewDetail?.book?.id}</Descriptions.Item>
                    <Descriptions.Item label="Tên sách">{dataViewDetail?.book?.mainText}</Descriptions.Item>
                    <Descriptions.Item label="Mã nhà cung cấp">{dataViewDetail?.supplier?.id}</Descriptions.Item>
                    <Descriptions.Item label="Tên nhà cung cấp">{dataViewDetail?.supplier?.name}</Descriptions.Item>

                    <Descriptions.Item label="Created At">
                        {moment(dataViewDetail?.createdAt).format('DD-MM-YYYY hh:mm:ss')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Updated At">
                        {moment(dataViewDetail?.updatedAt).format('DD-MM-YYYY hh:mm:ss')}
                    </Descriptions.Item>
                </Descriptions>
            </Drawer>
        </>
    )
}
export default SupplyModalDetail;
