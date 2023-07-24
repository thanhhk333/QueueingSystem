import React, { useState } from "react";
import { Button, Input, Typography, Form } from "antd";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import login from "../../assets/images/login_image.svg";
import logo from "../../assets/images/logo.svg";
import { useDispatch } from "react-redux";
import { getLogin } from "../management/account/redux/AccountSlice";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState({ username: "", password: "" });
    const [errors, setErrors] = useState(false);
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
                    <div className="col-5 flex items-center">
                        <div className="row px-5">
                            <div className="col-12 flex items-center justify-center mb-5">
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
                                            placeholder="user test: thanhhk333"
                                            onChange={handleChange}
                                            value={user.username}
                                            size="large"
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
                                            placeholder="123"
                                            onChange={handleChange}
                                            value={user.password}
                                            size="large"
                                        />
                                    </Form.Item>
                                </div>
                                <div className="row">
                                    {errors === true ? (
                                        <div className="col-12 text-center ">
                                            <Typography.Text
                                                type="danger"
                                                className="text-center"
                                            >
                                                Tài khoản hoặc mật khẩu không
                                                đúng!
                                            </Typography.Text>
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                    <Link
                                        to="/forget-password"
                                        className="text-[red] justify-start p-0 ml-16 mb-2"
                                    >
                                        Quên mật khẩu ?
                                    </Link>
                                </div>
                                <div className="col-12 text-center">
                                    <Form.Item>
                                        <Button
                                            size="large"
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
