import { Form, Input, Row, Button, Upload } from "antd";
import { Col } from "antd";
import React, { useEffect, useState } from "react";

import Avatar from "../../assets/images/avatar.jpg";
import LeftMenu from "../Components/Leftmenu";
import Icon, { CameraOutlined } from "@ant-design/icons";
import { BellFilled } from "@ant-design/icons";
import Header from "../Components/Header";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import firebase from "firebase/compat/app";
import { AccountData } from "../management/account/redux/AccountSlice";
import Account from "./../management/account/Account";
import MenuWithoutLogin from "../Components/menuWithoutLogin";

const Proflie = () => {
    const roles = useSelector(
        (state: RootState) => state.roleManagement.data
    ) as { id: string; name: string }[];
    const account = useSelector((state: RootState) => state.account.data);
    const isLoggedIn = useSelector(
        (state: RootState) => state.account.isLoggedIn
    );
    console.log(isLoggedIn);
    const [user, setUser] = useState<AccountData>({} as AccountData);
    const userInfo = localStorage.getItem("userInfo");

    console.log(userInfo);
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

    console.log(roles);
    const nameRole = roles.find((r) => r.id === user?.role.id)?.name;
    const [imgUrl, setImgUrl] = useState<string>("");
    const [loadImage, setLoadImage] = useState<boolean>(false);
    const [img, setImg] = useState<any>(null);
    const handleUpdateAvatar = () => {
        const profile = firebase
            .firestore()
            .collection("accounts")
            .doc(userInfo as any);
        const updatedProfile: AccountData = {
            ...user,
            image: imgUrl || user.image,
        };
        profile.update(updatedProfile).then(() => {
            console.log("update success");
        });
    };
    const handleUpload = async (e: any) => {
        setLoadImage(true);
        setImg(e);

        try {
            const storageRef = firebase.storage().ref();
            const fileRef = storageRef.child(`accounts/${e.name}`);
            await fileRef.put(e);
            const url = await fileRef.getDownloadURL();
            setImgUrl(url);
            setLoadImage(false);
        } catch (error) {
            console.log(error);

            setLoadImage(false);
        }
    };

    useEffect(() => {
        if (img) {
            handleUpdateAvatar();
        }
    });

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
                                            src={imgUrl || Avatar}
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
                                            bottom: "5px",
                                            right: "5px",
                                            width: "40px",
                                            height: "40px",
                                            borderRadius: "50%",
                                            backgroundColor: "#ff9138",
                                            border: "2px solid #fff",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                        icon={
                                            <Upload
                                                beforeUpload={handleUpload}
                                                showUploadList={false}
                                            >
                                                <CameraOutlined
                                                    style={{
                                                        color: "white",
                                                        fontWeight: "bold",
                                                    }}
                                                />
                                            </Upload>
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
