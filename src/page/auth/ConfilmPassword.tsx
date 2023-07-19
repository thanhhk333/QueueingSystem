import React from "react";
import { useState } from "react";
import { Button, Input, Form } from "antd";
import logo from "../../assets/images/logo.png";
import bg from "../../assets/images/wrong_pass.png";
import firebase from "firebase/compat/app";
import { useNavigate } from "react-router-dom";

const ConfilmPassword: React.FC = () => {
    const userUid = JSON.parse(localStorage.getItem("user") || "{}");
    const navigate = useNavigate();
    const [errors, setErrors] = useState(false);
    // lấy giá trị của userId thông qua firebase
    const [user, setUser] = React.useState({
        userName: userUid.userName,
        email: userUid.email,
        password: userUid.password,
        confirmPassword: userUid.confirmPassword,
        role: userUid.role,
        phone: userUid.phoneNumber,
        fullName: userUid.fullName,
        id: userUid.id,
        status: "Hoạt động",
    });

    const handleSubmit = async () => {
        if (user.confirmPassword === user.password) {
            await firebase
                .firestore()
                .collection("accounts")
                .doc(user.id)
                .update({
                    password: user.password,
                });

            navigate("/profile");
        } else {
            alert("Mật khẩu không khớp");
            setErrors(true);
        }
    };
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    console.log(user);
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
                            >
                                <div className="col-12 px-5 text-center">
                                    <label htmlFor="" className="fs-5 fw-bold">
                                        Đặt lại mật khẩu mới
                                    </label>
                                </div>
                                <div className="col-12 px-5 mt-2">
                                    <Form.Item
                                        label={
                                            <span className="text-lg font-light">
                                                Mật khẩu *
                                            </span>
                                        }
                                        name="password"
                                        htmlFor="password"
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Vui lòng điền mật khẩu!",
                                            },
                                        ]}
                                    >
                                        <Input.Password
                                            size="large"
                                            id="password"
                                            name="password"
                                            value={user.password}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label={
                                            <span className="text-lg font-light">
                                                Nhập lại mật khẩu *
                                            </span>
                                        }
                                        name="confirmPassword"
                                        htmlFor="confirmPassword"
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Vui lòng điền lại mật khẩu!",
                                            },
                                        ]}
                                    >
                                        <Input.Password
                                            size="large"
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            value={user.confirmPassword}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Item>
                                    {errors ? (
                                        <p className="text-danger">
                                            Mật khẩu không khớp
                                        </p>
                                    ) : null}
                                </div>
                                <div className="col-12 text-center">
                                    <Form.Item>
                                        <Button
                                            size="large"
                                            style={{
                                                background: "#FF9138",
                                                color: "white",
                                            }}
                                            className="w-25 mt-2"
                                            onClick={handleSubmit}
                                        >
                                            Xác nhận
                                        </Button>
                                    </Form.Item>
                                </div>
                            </Form>
                        </div>
                    </div>
                    <div className="col-7">
                        <img className="img-fluid" src={bg} alt="" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConfilmPassword;
