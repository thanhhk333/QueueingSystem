import React from "react";
import { useState } from "react";
import { Button, Input, Form } from "antd";
import { FormInstance } from "antd/lib/form";
import logo from "../../assets/images/logo.png";
import login from "../../assets/images/login_image.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import firebase from "firebase/compat/app";
import { useNavigate } from "react-router-dom";
import { userInfo } from "os";
const ForgotPassword: React.FC = () => {
    const formRef = React.useRef<FormInstance>(null);
    const accounts = useSelector((state: RootState) => state.account.data);
    const [user, setUser] = useState({ email: "" });
    const [errors, setErrors] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async () => {
        try {
            const res = await firebase
                .firestore()
                .collection("accounts")
                .where("email", "==", user.email)
                .get();
            if (!res.empty) {
                const userId = res.docs[0].id;
                const newUser = {
                    ...res.docs[0].data(),
                    id: userId,
                    role: res.docs[0].data().role.id,
                };
                localStorage.setItem("userInfo", userId);
                localStorage.setItem("user", JSON.stringify(newUser));
                localStorage.setItem("isLoggedIn", "true");
                navigate("/confilm-password");
            } else {
                setErrors(true);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-5">
                        <div className="row px-5 mx-auto mt-20">
                            <div className="col-12 flex items-center justify-center">
                                <img className="mt-5" src={logo} alt="" />
                            </div>

                            <Form
                                name="basic"
                                initialValues={{ remember: true }}
                                autoComplete="off"
                                ref={formRef}
                                onFinish={handleSubmit}
                            >
                                <div className="col-12 px-5 text-center">
                                    <label htmlFor="" className="fs-5 fw-bold">
                                        Đặt lại mật khẩu
                                    </label>
                                </div>
                                <div className="col-12 px-5 mt-2 text-center">
                                    <Form.Item
                                        name="email"
                                        className="px-4"
                                        label={
                                            <span>
                                                Vui lòng nhập email của bạn
                                            </span>
                                        }
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Vui lòng nhập email của bạn!",
                                            },
                                        ]}
                                    >
                                        <Input
                                            id="email"
                                            name="email"
                                            placeholder="email test: thanhhk333@gmail.com"
                                            value={user.email}
                                            onChange={(e) =>
                                                setUser({
                                                    ...user,
                                                    email: e.target.value,
                                                })
                                            }
                                        />
                                    </Form.Item>
                                    {errors ? (
                                        <p className="text-danger">
                                            Email không tồn tại
                                        </p>
                                    ) : null}
                                </div>

                                <div className="col-12 text-center">
                                    <Form.Item>
                                        <Button
                                            danger
                                            htmlType="submit"
                                            href="/"
                                            className="me-3 mt-2 w-25"
                                        >
                                            Hủy
                                        </Button>
                                        <Button
                                            htmlType="submit"
                                            style={{
                                                background: "#FF9138",
                                                color: "white",
                                            }}
                                            className="w-25"
                                        >
                                            Tiếp tục
                                        </Button>
                                    </Form.Item>
                                </div>
                            </Form>
                        </div>
                    </div>
                    <div className="col-7">
                        <img className="img-fluid" src={login} alt="" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;
