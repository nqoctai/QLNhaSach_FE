import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { callOutboundAuthentication } from "../../services/api";
import { useDispatch } from "react-redux";
import { doLoginAction } from "../../redux/account/accountSlice";
import { message } from "antd";
import Loading from "../../components/Loading";

const Authenticate = () => {
  const navigate = useNavigate();
  const [isLoggedin, setIsLoggedin] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(window.location.href);

    const authCodeRegex = /code=([^&]+)/;
    const isMatch = window.location.href.match(authCodeRegex);

    if (isMatch) {
      const authCode = isMatch[1];
      const fetchAPIOutbound = async () => {
        const res = await callOutboundAuthentication(authCode);
        if (res && res?.data) {
          localStorage.setItem("access_token", res.data.access_token);
          dispatch(doLoginAction(res.data.account));
          message.success("Đăng nhập thành công");
          navigate("/");
        } else {
          notification.error({
            message: "Có lỗi xảy ra",
            description: "Tài khoản hoặc mật khẩu không chính xác",
            duration: 5,
          });
        }
      };
      fetchAPIOutbound();
    }
  }, []);

  //   useEffect(() => {
  //     if (isLoggedin) {
  //       navigate("/");
  //     }
  //   }, [isLoggedin, navigate]);

  return (
    <>
      <Loading />
    </>
  );
};

export default Authenticate;
