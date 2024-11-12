import { AntDesignOutlined, UploadOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Form, Input, Row, Upload, message, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { callUpdateAvatar, callUpdateCustomer, callUpdateUserInfo } from "../../services/api";
import { doUpdateUserInfoAction, doUploadAvatarAction } from "../../redux/account/accountSlice";
import { useState } from "react";

const CustomerInfo = (props) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const customer = useSelector(state => state.account.user.customer);
    const tempAvatar = useSelector(state => state.account.tempAvatar);


    const [isSubmit, setIsSubmit] = useState(false);

    const onFinish = async (values) => {
        const { name, address, phone, id, email } = values;
        setIsSubmit(true)
        const res = await callUpdateCustomer(id, name, address, phone, email);

        if (res && res.data) {
            //update redux
            message.success("Cập nhật thông tin khách hàng thành công");

            //force renew token
            localStorage.removeItem('access_token');
        } else {
            notification.error({
                message: "Đã có lỗi xảy ra",
                description: res.message
            })
        }
        setIsSubmit(false)
    }

    return (
        <div style={{ minHeight: 400 }}>
            <Row>

                <Col span={24} >
                    <Form
                        onFinish={onFinish}
                        form={form}
                    >
                        <Form.Item
                            hidden
                            labelCol={{ span: 24 }}
                            label="id"
                            name="id"
                            initialValue={customer?.id}

                        >
                            <Input disabled hidden />
                        </Form.Item>

                        <Form.Item
                            labelCol={{ span: 24 }}
                            label="Email"
                            name="email"
                            initialValue={customer?.email}

                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            labelCol={{ span: 24 }}
                            label="Họ và tên"
                            name="name"
                            initialValue={customer?.name}
                            rules={[{ required: true, message: 'Tên hiển thị không được để trống!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            labelCol={{ span: 24 }}
                            label="Địa chỉ"
                            name="address"
                            initialValue={customer?.address}
                            rules={[{ required: true, message: 'Tên hiển thị không được để trống!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            labelCol={{ span: 24 }}
                            label="Số điện thoại"
                            name="phone"
                            initialValue={customer?.phone}
                            rules={[{ required: true, message: 'Số điện thoại không được để trống!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Button loading={isSubmit} onClick={() => form.submit()}>Cập nhật</Button>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default CustomerInfo;
