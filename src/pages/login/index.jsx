import { Button, Divider, Form, Input, message, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "../register/register.scss";
import { useState } from "react";
import { callLogin } from "../../services/api";
import { useDispatch } from "react-redux";
import { doLoginAction } from "../../redux/account/accountSlice";
import { OAuthConfig } from "../../utils/constant";
import { GoogleOutlined } from "@ant-design/icons";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);

  const dispatch = useDispatch();

  const onFinish = async (values) => {
    const { username, password } = values;
    setIsSubmit(true);
    const res = await callLogin(username, password);
    setIsSubmit(false);
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
    // window.location.reload();
    console.log("check>>> res:", res);
  };

  const handleGoogleLogin = () => {
    const callbackUrl = OAuthConfig.redirectUri;
    const authUrl = OAuthConfig.authUri;
    const googleClientId = OAuthConfig.clientId;

    const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(
      callbackUrl
    )}&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile`;

    console.log(targetUrl);

    window.location.href = targetUrl;
  };

  return (
    <div className="register-page">
      <main className="main">
        <div className="container">
          <section className="wrapper">
            <div className="heading">
              <h2 className="text text-large">Đăng Nhập</h2>
              <Divider />
            </div>
            <Form
              name="basic"
              // style={{ maxWidth: 600, margin: '0 auto' }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                labelCol={{ span: 24 }} //whole column
                label="Email"
                name="username"
                rules={[
                  { required: true, message: "Email không được để trống!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 24 }} //whole column
                label="Mật khẩu"
                name="password"
                rules={[
                  { required: true, message: "Mật khẩu không được để trống!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
              // wrapperCol={{ offset: 6, span: 16 }}
              >
                <Button type="primary" htmlType="submit" loading={isSubmit}>
                  Đăng Nhập
                </Button>
              </Form.Item>
              <Divider>Or</Divider>
              <Button
                onClick={handleGoogleLogin}
                icon={<GoogleOutlined />}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  backgroundColor: "#ffffff",
                  color: "#444",
                  border: "1px solid #ddd",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                  fontWeight: 500,
                  height: "40px",
                  width: "100%",
                  borderRadius: "4px",
                  transition: "all 0.2s ease",
                }}
                className="google-login-button"
              >
                Đăng nhập với Google
              </Button>
              <p className="text text-normal">
                Bạn chưa có tài khoản ?
                <span>
                  <Link to="/register"> Đăng ký </Link>
                </span>
              </p>
            </Form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
