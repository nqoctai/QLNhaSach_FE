import { Col, Divider, Form, Radio, Row, message, notification } from 'antd';
import { DeleteTwoTone, LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { doDeleteItemCartAction, doPlaceOrderAction, doUpdateCartAction } from '../../redux/order/orderSlice';
import { Input } from 'antd';
import { callFetchAccount, callPlaceOrder, createPaymentVnPay } from '../../services/api';
import { doGetAccountAction } from '../../redux/account/accountSlice';
const { TextArea } = Input;

const Payment = (props) => {
    const carts = useSelector(state => state?.account.user?.customer?.cart?.cartItems);
    const [totalPrice, setTotalPrice] = useState(0);
    const dispatch = useDispatch();
    const [isSubmit, setIsSubmit] = useState(false);
    const user = useSelector(state => state.account.user);
    const [form] = Form.useForm();


    useEffect(() => {
        console.log('carts', carts);
        if (carts && carts.length > 0) {
            console.log('carts', carts.length);
            let sum = 0;
            carts.map(item => {
                sum += item.quantity * item.book.price;
            })
            setTotalPrice(sum);
        } else {
            setTotalPrice(0);
        }
    }, [carts]);

    useEffect(() => {
        console.log('carts', carts);
        if (carts && carts.length > 0) {
            console.log('carts', carts.length);
            let sum = 0;
            carts.map(item => {
                sum += item.quantity * item.book.price;
            })
            setTotalPrice(sum);
        } else {
            setTotalPrice(0);
        }
    }, []);


    const handlePlaceOrder = () => {
        if (!address) {
            notification.error({
                message: "Đã có lỗi xảy ra",
                description: "Thông tin địa chỉ không được để trống!"
            })
            return;
        }
        props.setCurrentStep(2);
    }

    const onFinish = async (values) => {
        setIsSubmit(true);
        const detailOrder = carts.map(item => {
            return {
                bookName: item.book.mainText,
                quantity: item.quantity,
                id: item.id
            }
        })
        console.log("Method", values.paymentMethod);
        let data = {
            accountId: user?.id,
            email: user?.email,
            name: values.name,
            address: values.address,
            phone: values.phone,
            totalPrice: totalPrice,
            paymentMethod: values.paymentMethod,
        }

        if (values.paymentMethod === 'vnpay') {
            const resPayment = await createPaymentVnPay(totalPrice);
            console.log('resPayment', resPayment);
            const url = new URL(resPayment.data.paymentUrl);
            const vnp_TxnRef = url.searchParams.get('vnp_TxnRef');
            data = {
                ...data,
                vnp_txn_ref: vnp_TxnRef,
            }
            if (resPayment && resPayment.data) {
                const res = await callPlaceOrder(data);
                if (res && res.data) {
                    const dataAccount = await callFetchAccount();
                    dispatch(doGetAccountAction(dataAccount.data));
                    window.location.href = resPayment.data.paymentUrl;
                } else {
                    notification.error({
                        message: "Đã có lỗi xảy ra",
                        description: res.message
                    })
                }

            } else {
                notification.error({
                    message: "Đã có lỗi xảy ra",
                    description: resPayment.message
                })
            }

        }

        if (values.paymentMethod === 'cod') {
            const res = await callPlaceOrder(data);
            if (res && res.data) {
                message.success('Đặt hàng thành công !');
                // dispatch(doPlaceOrderAction());
                const dataAccount = await callFetchAccount();
                dispatch(doGetAccountAction(dataAccount.data));
                props.setCurrentStep(2);
            } else {
                notification.error({
                    message: "Đã có lỗi xảy ra",
                    description: res.message
                })
            }
        }


        setIsSubmit(false);
    }

    return (
        <Row gutter={[20, 20]}>
            <Col md={16} xs={24}>
                {carts?.map((item, index) => {
                    const currentBookPrice = item?.book?.price ?? 0;
                    return (
                        <div className='order-book' key={`index-${index}`}>
                            <div className='book-content'>
                                <img src={`${import.meta.env.VITE_BACKEND_URL}/storage/book/${item?.book?.thumbnail}`} />
                                <div className='title'>
                                    {item?.book?.mainText}
                                </div>
                                <div className='price'>
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(currentBookPrice)}
                                </div>
                            </div>
                            <div className='action'>
                                <div className='quantity'>
                                    Số lượng: {item?.quantity}
                                </div>
                                <div className='sum'>
                                    Tổng:  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(currentBookPrice * (item?.quantity ?? 0))}
                                </div>
                                <DeleteTwoTone
                                    style={{ cursor: "pointer" }}
                                    onClick={() => dispatch(doDeleteItemCartAction({ id: item.id }))}
                                    twoToneColor="#eb2f96"
                                />

                            </div>
                        </div>
                    )
                })}
            </Col>
            <Col md={8} xs={24} >
                <div className='order-sum'>
                    <Form
                        onFinish={onFinish}
                        form={form}
                    >
                        <Form.Item
                            style={{ margin: 0 }}
                            labelCol={{ span: 24 }}
                            label="Tên người nhận"
                            name="name"
                            initialValue={user?.username}
                            rules={[{ required: true, message: 'Tên người nhận không được để trống!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            style={{ margin: 0 }}
                            labelCol={{ span: 24 }}
                            label="Số điện thoại"
                            name="phone"
                            initialValue={user?.phone}
                            rules={[{ required: true, message: 'Số điện thoại không được để trống!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            style={{ margin: 0 }}
                            labelCol={{ span: 24 }}
                            label="Địa chỉ"
                            name="address"
                            rules={[{ required: true, message: 'Địa chỉ không được để trống!' }]}
                        >
                            <TextArea
                                autoFocus
                                rows={4}
                            />
                        </Form.Item>
                        <Form.Item
                            style={{ margin: 0 }}
                            labelCol={{ span: 24 }}
                            label="Hình thức thanh toán"
                            name="paymentMethod"
                            initialValue="cod"
                            rules={[{ required: true, message: 'Hình thức thanh toán không được để trống!' }]}
                        >
                            <Radio.Group>
                                <Radio value="cod">Thanh toán khi nhận hàng</Radio>
                                <Radio value="vnpay">Thanh toán qua VNPAY</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Form>


                    <Divider style={{ margin: "5px 0" }} />
                    <div className='calculate'>
                        <span> Tổng tiền</span>
                        <span className='sum-final'>
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice || 0)}
                        </span>
                    </div>
                    <Divider style={{ margin: "5px 0" }} />
                    <button
                        onClick={() => form.submit()}
                        disabled={isSubmit}
                    >
                        {isSubmit && <span><LoadingOutlined /> &nbsp;</span>}
                        Đặt Hàng ({carts?.length ?? 0})
                    </button>
                </div>
            </Col>
        </Row>
    )
}

export default Payment;
