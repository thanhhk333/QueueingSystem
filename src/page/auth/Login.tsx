import React, { useState } from "react";
import { Button, Input, Typography, Form } from "antd";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import login from "../../assets/images/login_image.svg";
import logo from "../../assets/images/logo.png";
import { useDispatch } from "react-redux";
import { getLogin } from "../management/account/redux/AccountSlice";

const Login: React.FC = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState({ username: "", password: "" });
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const res = await firebase
                .firestore()
                .collection("accounts")
                .where("userName", "==", user.username)
                .where("password", "==", user.password)
                .get();
            console.log(res);
            if (!res.empty) {
                const userInfor = res.docs[0].id;
                dispatch(getLogin(user.username, user.password) as any);
                localStorage.setItem("userInfo", userInfor);
                localStorage.setItem("isLoggedIn", "true");
            } else {
                console.log("Tài khoản hoặc mật khẩu không đúng!");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-5 flex items-center">
                        <div className="row px-5">
                            <div className="col-12 flex items-center justify-center">
                                <img className=" mt-5 " src={logo} alt="" />
                            </div>

                            <Form
                                name="basic"
                                initialValues={{ remember: true }}
                                onFinish={handleSubmit}
                                autoComplete="off"
                            >
                                <div className="col-12 px-5">
                                    <label htmlFor="">
                                        Tên đăng nhập <span>*</span>
                                    </label>
                                    <Form.Item
                                        name="username"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Vui lòng nhập tên đăng nhập!",
                                            },
                                        ]}
                                    >
                                        <Input
                                            id="username"
                                            name="username"
                                            onChange={handleChange}
                                            value={user.username}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="col-12 px-5">
                                    <label htmlFor="">
                                        Mật khẩu <span>*</span>
                                    </label>
                                    <Form.Item
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Vui lòng nhập mật khẩu!",
                                            },
                                        ]}
                                    >
                                        <Input.Password
                                            id="password"
                                            name="password"
                                            onChange={handleChange}
                                            value={user.password}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="col-12 text-center">
                                    <Form.Item>
                                        <Button
                                            type="default"
                                            style={{
                                                background: "#FF9138",
                                                color: "white",
                                            }}
                                            htmlType="submit"
                                        >
                                            Đăng nhập
                                        </Button>
                                    </Form.Item>
                                </div>
                            </Form>
                        </div>
                    </div>
                    <div className="col-7">
                        <img className="m-3" src={login} alt="" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
