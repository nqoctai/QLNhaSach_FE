import { Col, Divider, Empty, InputNumber, message, Row } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { doDeleteItemCartAction, doUpdateCartAction } from '../../redux/order/orderSlice';
import { callAddBookToCart, callDeleteItemInCart, callFetchAccount, callUpdateQuantityBookInCart } from '../../services/api';
import { doGetAccountAction } from '../../redux/account/accountSlice';



const ViewOrder = (props) => {
    const cart = useSelector(state => state.account.user.customer.cart);
    const account = useSelector(state => state.account.user);
    const [totalPrice, setTotalPrice] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        if (cart) {
            setTotalPrice(cart.sumPrice);
        } else {
            setTotalPrice(0);
        }
    }, [cart]);

    const fetchAccount = async () => {
        const dataAccount = await callFetchAccount();
        dispatch(doGetAccountAction(dataAccount.data));
    }

    // const handleOnChangeInput = async (value, item) => {
    //     if (!value || value < 1) return;
    //     if (!isNaN(value)) {
    //         const res = await callAddBookToCart(account.email, item.book.id, value);
    //         if (res) {
    //             const dataAccount = await callFetchAccount();
    //             dispatch(doGetAccountAction(dataAccount.data));
    //         }
    //         // dispatch(doUpdateCartAction({ quantity: value, detail: { id: item?.book?.id, name: item?.book?.name }, id: item?.book.id }))
    //     }
    // }
    const handleOnChangeInput = async (item, value) => {
        if (!value || value < 1) return;
        if (!isNaN(value)) {
            try {
                // Gọi API để cập nhật số lượng sản phẩm
                const res = await callUpdateQuantityBookInCart(cart?.id, item?.id, value);
                if (res) {
                    // // Gọi API để lấy lại thông tin tài khoản mới sau khi cập nhật giỏ hàng
                    // const dataAccount = await callFetchAccount();
                    // // Dispatch cập nhật lại giỏ hàng vào Redux
                    // dispatch(doGetAccountAction(dataAccount.data));
                    fetchAccount();
                    message.success("Cập nhật số lượng sản phẩm thành công");
                }
            } catch (error) {
                console.error("Error updating cart item quantity:", error);
            }
        }
    };

    const handleDeleteItemCart = async (id) => {
        const res = await callDeleteItemInCart(id);
        if (res && res?.data) {
            fetchAccount();
            message.success("Xóa sản phẩm khỏi giỏ hàng thành công");
        }
    }



    return (
        <Row gutter={[20, 20]}>
            <Col md={18} xs={24}>
                {cart?.cartItems?.map((item, index) => {
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
                                    <InputNumber min={1} onChange={(value) => handleOnChangeInput(item, value)} value={item?.quantity} />
                                </div>
                                <div className='sum'>
                                    Tổng:  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(currentBookPrice * (item?.quantity ?? 0))}
                                </div>
                                <DeleteTwoTone
                                    style={{ cursor: "pointer" }}
                                    onClick={() => handleDeleteItemCart(item?.id)}
                                    twoToneColor="#eb2f96"
                                />

                            </div>
                        </div>
                    )
                })}
                {cart?.length === 0 &&
                    <div className='order-book-empty'>
                        <Empty
                            description={"Không có sản phẩm trong giỏ hàng"}
                        />
                    </div>
                }
            </Col>
            <Col md={6} xs={24} >
                <div className='order-sum'>
                    <div className='calculate'>
                        <span>  Tạm tính</span>
                        <span>
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice || 0)}
                        </span>
                    </div>
                    <Divider style={{ margin: "10px 0" }} />
                    <div className='calculate'>
                        <span> Tổng tiền</span>
                        <span className='sum-final'>
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice || 0)}
                        </span>
                    </div>
                    <Divider style={{ margin: "10px 0" }} />
                    <button
                        disabled={cart?.length === 0}
                        onClick={() => props.setCurrentStep(1)}
                    >
                        Mua Hàng ({cart?.length ?? 0})
                    </button>
                </div>
            </Col>
        </Row>
    )
}

export default ViewOrder;
