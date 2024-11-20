import { Modal, Tabs } from "antd";
import UserInfo from "./UserInfo";
import ChangePassword from "./ChangePassword";
import CustomerInfo from "./CustomerInfo";
import { useSelector } from "react-redux";

const ManageAccount = (props) => {
    const { isModalOpen, setIsModalOpen } = props;
    const user = useSelector(state => state.account.user);

    let items = [
        {
            key: 'info',
            label: `Cập nhật thông tin tài khoản`,
            children: <UserInfo />,
        },
        {
            key: 'password',
            label: `Đổi mật khẩu`,
            children: <ChangePassword />,
        },
        {
            key: 'infocustomer',
            label: `Cập nhật thông tin khách hàng`,
            children: <CustomerInfo />,
        },

    ];

    if (user?.role !== 'CUSTOMER') {
        items = [
            {
                key: 'info',
                label: `Cập nhật thông tin tài khoản`,
                children: <UserInfo />,
            },
            {
                key: 'password',
                label: `Đổi mật khẩu`,
                children: <ChangePassword />,
            }
        ];
    }



    return (
        <Modal
            title="Quản lý tài khoản"
            open={isModalOpen}
            footer={null}
            onCancel={() => setIsModalOpen(false)}
            maskClosable={false}
            width={"60vw"}
        >
            <Tabs
                defaultActiveKey="info"
                items={items}
            />
        </Modal>
    )
}

export default ManageAccount;
