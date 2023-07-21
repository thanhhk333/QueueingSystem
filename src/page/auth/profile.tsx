import { Form, Input, Row, Button, Upload } from "antd";
import { Col } from "antd";
import React, { useEffect, useState } from "react";

import Avatar from "../../assets/images/db.jpg";
import LeftMenu from "../Components/Leftmenu";
import { CameraOutlined } from "@ant-design/icons";

import Header from "../Components/Header";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import firebase from "firebase/compat/app";
import {
    AccountData,
    getLogin,
} from "../management/account/redux/AccountSlice";
const Proflie = () => {
    const roles = useSelector(
        (state: RootState) => state.roleManagement.data
    ) as { id: string; name: string }[];
    const account = useSelector((state: RootState) => state.account.data);
    const isLoggedIn = useSelector(
        (state: RootState) => state.account.isLoggedIn
    );
    const [user, setUser] = useState<AccountData>({} as AccountData);
    const userInfo = localStorage.getItem("userInfo");
    useEffect(() => {
        const fetchUser = async () => {
            const userRef = await firebase
                .firestore()
                .collection("accounts")
                .doc(userInfo as any);

            const userSnapshot = await userRef.get();

            if (userSnapshot.exists) {
                const userData = userSnapshot.data() as any;
                setUser(userData);
            }
        };
        fetchUser();
    }, [userInfo]);

    const nameRole = roles.find((r) => r.id === user?.role.id)?.name;

    // handleupdate image by firebase
    const [imgUrl, setImgUrl] = useState("");
    const dispath = useDispatch();
    const handleUpload = async (e: any) => {
        const file = e.target.files?.[0];
        console.log(file);

        try {
            const storageRef = firebase.storage().ref();
            const fileRef = storageRef.child(file.name);
            await fileRef.put(file);
            const imgUrls = await fileRef.getDownloadURL();
            console.log(imgUrls); // Kiểm tra xem đường dẫn URL đã được nhận hay không
            setImgUrl(imgUrls);
            dispath(getLogin(user.userName, user.password) as any);
        } catch (error) {
            console.log(error);
        }
    };
    console.log(imgUrl);
    return (
        <>
            <div
                className="flex_home"
                style={{
                    background: "rgba(246, 246, 246, 1)",
                    minHeight: "100 vh",
                }}
            >
                <div className="menu " style={{ background: "#fff" }}>
                    <LeftMenu />
                </div>

                <div className="w-full">
                    <Header />

                    <div
                        className="form h-fit rounded-md w-80  p-5 ps-12"
                        id="form"
                        style={{ background: "#fff" }}
                    >
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col
                                className="gutter-row d-flex align-center justify-center flex-col"
                                span={6}
                            >
                                <div
                                    style={{
                                        position: "relative",
                                        width: "90%",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "100%",
                                            paddingBottom: "100%",
                                            position: "relative",
                                            borderRadius: "50%",
                                            overflow: "hidden",
                                        }}
                                    >
                                        <img
                                            src={Avatar || user.image}
                                            alt=""
                                            className="w-100 h-100"
                                            style={{
                                                borderRadius: "50%",
                                                position: "absolute",
                                            }}
                                        />
                                    </div>

                                    <Button
                                        style={{
                                            position: "absolute",
                                            bottom: "10px",
                                            right: "10px",
                                            width: "44px",
                                            height: "44px",
                                            borderRadius: "50%",
                                            backgroundColor: "#ff9138",
                                            border: "2px solid #fff",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                        icon={
                                            <CameraOutlined
                                                style={{
                                                    color: "white",
                                                    fontWeight: "bold",
                                                }}
                                            />
                                        }
                                    ></Button>
                                </div>
                                <h3 className="mx-auto mt-10">
                                    {user.fullName}
                                </h3>
                            </Col>
                            <Col className="gutter-row" span={9}>
                                <Form layout="vertical">
                                    <Form.Item
                                        label="Tên người dùng"
                                        labelCol={{ span: 20 }}
                                        wrapperCol={{ span: 22 }}
                                    >
                                        <Input
                                            size="large"
                                            value={user.fullName}
                                            disabled
                                            placeholder="Thanh"
                                            style={{
                                                background:
                                                    "rgba(246, 246, 246, 1)",
                                                fontSize: 12,
                                            }}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Số điện thoại"
                                        labelCol={{ span: 20 }}
                                        wrapperCol={{ span: 22 }}
                                    >
                                        <Input
                                            size="large"
                                            value={user.phone}
                                            disabled
                                            placeholder="033218321"
                                            style={{
                                                background:
                                                    "rgba(246, 246, 246, 1)",
                                                fontSize: 12,
                                            }}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Email:"
                                        labelCol={{ span: 20 }}
                                        wrapperCol={{ span: 22 }}
                                    >
                                        <Input
                                            size="large"
                                            value={user.email}
                                            disabled
                                            placeholder="thanhhk333@gmail.com"
                                            style={{
                                                background:
                                                    "rgba(246, 246, 246, 1)",
                                                fontSize: 12,
                                            }}
                                        />
                                    </Form.Item>
                                </Form>
                            </Col>
                            <Col className="gutter-row" span={9}>
                                <Form layout="vertical">
                                    <Form.Item
                                        label="Tên đăng nhập: "
                                        labelCol={{ span: 20 }}
                                        wrapperCol={{ span: 22 }}
                                    >
                                        <Input
                                            size="large"
                                            value={user.userName}
                                            disabled
                                            placeholder="thanhx"
                                            style={{
                                                background:
                                                    "rgba(246, 246, 246, 1)",
                                                fontSize: 12,
                                            }}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Mật khẩu"
                                        labelCol={{ span: 20 }}
                                        wrapperCol={{ span: 22 }}
                                    >
                                        <Input
                                            size="large"
                                            value={user.password}
                                            disabled
                                            placeholder="4324"
                                            style={{
                                                background:
                                                    "rgba(246, 246, 246, 1)",
                                                fontSize: 12,
                                            }}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Vai trò"
                                        labelCol={{ span: 20 }}
                                        wrapperCol={{ span: 22 }}
                                    >
                                        <Input
                                            value={nameRole}
                                            size="large"
                                            disabled
                                            placeholder="Admin"
                                            style={{
                                                background:
                                                    "rgba(246, 246, 246, 1)",
                                                fontSize: 12,
                                            }}
                                        />
                                    </Form.Item>
                                </Form>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Proflie;
