import React, { useEffect, useState } from 'react';
import {
    AppstoreOutlined,
    ExceptionOutlined,
    UserOutlined,
    TeamOutlined,
    DollarCircleOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined
} from '@ant-design/icons';
import { Layout, Menu, Dropdown, Space, message, Avatar } from 'antd';
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import './layout.scss';
import { useDispatch, useSelector } from 'react-redux';
import { callLogout } from '../../services/api';
import { doLogoutAction } from '../../redux/account/accountSlice';
import ManageAccount from '../Account/ManageAccount';

const { Content, Sider } = Layout;

const items = [
    {
        label: <Link to='/admin'>Dashboard</Link>,
        key: 'dashboard',
        icon: <AppstoreOutlined />
    },
    {
        label: <Link to='/admin/user'>Manage Accounts</Link>,
        key: 'account',
        icon: <UserOutlined />,

    },
    {
        label: <Link to='/admin/customer'>Manage Customers</Link>,
        key: 'customer',
        icon: <TeamOutlined />
    },
    {
        label: <Link to='/admin/employee'>Manage Employees</Link>,
        key: 'employee',
        icon: <TeamOutlined />
    },
    {
        label: <Link to='/admin/book'>Manage Books</Link>,
        key: 'book',
        icon: <ExceptionOutlined />
    },
    {
        label: <Link to='/admin/order'>Manage Orders</Link>,
        key: 'order',
        icon: <DollarCircleOutlined />
    },
    {
        label: <Link to='/admin/receipt'>Manage Receipts</Link>,
        key: 'receipt',
        icon: <DollarCircleOutlined />
    },
    {
        label: <Link to='/admin/supply'>Manage Supplies</Link>,
        key: 'supply',
        icon: <DollarCircleOutlined />
    },
    {
        label: <Link to='/admin/supplier'>Manage Suppliers</Link>,
        key: 'supplier',
        icon: <DollarCircleOutlined />
    },
    {
        label: <Link to='/admin/permission'>Manage Permissions</Link>,
        key: 'permission',
        icon: <DollarCircleOutlined />
    },
    {
        label: <Link to='/admin/role'>Manage Roles</Link>,
        key: 'role',
        icon: <DollarCircleOutlined />
    }
];

const LayoutAdmin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [activeMenu, setActiveMenu] = useState('');
    const user = useSelector(state => state.account.user);
    const [showManageAccount, setShowManageAccount] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    // Sử dụng useEffect để cập nhật trạng thái activeMenu khi đường dẫn thay đổi
    useEffect(() => {
        const currentPath = location.pathname;
        if (currentPath.includes('/admin/book')) {
            setActiveMenu('book');
        } else if (currentPath.includes('/admin/user')) {
            setActiveMenu('account');
        } else if (currentPath.includes('/admin/order')) {
            setActiveMenu('order');
        } else if (currentPath === '/admin') {
            setActiveMenu('dashboard');
        } else if (currentPath.includes('/admin/customer')) {
            setActiveMenu('customer');
        } else if (currentPath.includes('/admin/employee')) {
            setActiveMenu('employee');
        } else if (currentPath.includes('/admin/receipt')) {
            setActiveMenu('receipt');
        } else if (currentPath.includes('/admin/supply')) {
            setActiveMenu('supply');
        } else if (currentPath.includes('/admin/supplier')) {
            setActiveMenu('supplier');
        }
    }, [location]);

    const handleLogout = async () => {
        const res = await callLogout();
        if (res) {
            dispatch(doLogoutAction());
            message.success('Đăng xuất thành công');
            navigate('/');
        }
    };

    const itemsDropdown = [
        {
            label: <label style={{ cursor: 'pointer' }} onClick={() => setShowManageAccount(true)}>Quản lý tài khoản</label>,
            key: 'account',
        },
        {
            label: <Link to={'/'}>Trang chủ</Link>,
            key: 'home',
        },
        {
            label: <label
                style={{ cursor: 'pointer' }}
                onClick={() => handleLogout()}
            >Đăng xuất</label>,
            key: 'logout',
        },
    ];

    const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/storage/avatar/${user?.avatar}`;

    return (
        <>
            <Layout style={{ minHeight: '100vh' }} className="layout-admin">
                <Sider
                    theme='light'
                    collapsible
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}>
                    <div style={{ height: 32, margin: 16, textAlign: 'center' }}>
                        Admin
                    </div>
                    <Menu
                        selectedKeys={[activeMenu]}  // Sử dụng selectedKeys thay vì defaultSelectedKeys
                        mode="inline"
                        items={items}
                        onClick={(e) => setActiveMenu(e.key)}
                    />
                </Sider>
                <Layout>
                    <div className='admin-header'>
                        <span>
                            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                className: 'trigger',
                                onClick: () => setCollapsed(!collapsed),
                            })}
                        </span>
                        <Dropdown menu={{ items: itemsDropdown }} trigger={['click']}>
                            <Space style={{ cursor: "pointer" }}>
                                <Avatar src={urlAvatar} />
                                {user?.name}
                            </Space>
                        </Dropdown>
                    </div>
                    <Content style={{ padding: '15px' }}>
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
            <ManageAccount
                isModalOpen={showManageAccount}
                setIsModalOpen={setShowManageAccount}
            />
        </>
    );
};

export default LayoutAdmin;
