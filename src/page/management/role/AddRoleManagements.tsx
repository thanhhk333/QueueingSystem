import React, { useEffect, useState } from "react";
import {
    Breadcrumb,
    Button,
    Card,
    Checkbox,
    Form,
    Input,
    Layout,
    Space,
} from "antd";

import LeftMenu from "../../Components/Leftmenu";
import Header from "../../Components/Header";

import TextArea from "antd/es/input/TextArea";
import { useDispatch } from "react-redux";
import {
    RoleManagementData,
    addRoleManagement,
} from "./redux/roleManagementSlice";
import { AccountData } from "../account/redux/AccountSlice";
import firebase from "firebase/compat/app";
import { createUserLog } from "../user/userLogSlice";
const { Content } = Layout;

function AddRole() {
    const [checked, setChecked] = useState(false);
    const dispatch = useDispatch();
    const [newRoleManagement, setNewRoleManagement] =
        useState<RoleManagementData>({
            id: "",
            name: "",
            des: "",
        });
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

    const userLog = {
        userName: user.userName || "Unknown",
        time: firebase.firestore.Timestamp.now(),
        ip: "192.168.1.10",
        action: "Thêm vai trò",
    };
    const handleAddRoleManagement = () => {
        dispatch(addRoleManagement(newRoleManagement) as any);
        dispatch(createUserLog(userLog) as any);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewRoleManagement({ ...newRoleManagement, name: e.target.value });
    };

    const handleDescriptionChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setNewRoleManagement({ ...newRoleManagement, des: e.target.value });
    };

    return (
        <div className="flex">
            <LeftMenu />
            <Layout>
                <Content>
                    <div className="container">
                        <div className="row ">
                            <div className="col">
                                <Header
                                    headerContent={
                                        <Breadcrumb className="custom-breadcrumb">
                                            <Breadcrumb.Item>
                                                Cài đặt hệ thống
                                            </Breadcrumb.Item>
                                            <Breadcrumb.Item>
                                                Quản lý vai trò
                                            </Breadcrumb.Item>

                                            <Breadcrumb.Item>
                                                <span
                                                    style={{ color: "#ff9138" }}
                                                >
                                                    Thêm vai trò{" "}
                                                </span>
                                            </Breadcrumb.Item>
                                        </Breadcrumb>
                                    }
                                />
                            </div>
                        </div>
                        <div className="my-4 ">
                            <h2 style={{ color: "#ff9138" }}>
                                Danh sách vai trò
                            </h2>
                        </div>

                        <div className="row ml-5">
                            <div className="col-11 mt-3">
                                <Card
                                    bordered={true}
                                    style={{ overflow: "hidden" }}
                                >
                                    <div className="row my-2">
                                        <h3 className="mainColor">
                                            Thông tin vai trò{" "}
                                        </h3>
                                    </div>
                                    <div className="row ">
                                        <div className="col-6">
                                            <Space
                                                direction="vertical"
                                                style={{ width: "100%" }}
                                            >
                                                <h5>
                                                    Tên vai trò{" "}
                                                    <span className="text-danger">
                                                        *
                                                    </span>
                                                </h5>
                                                <Input
                                                    placeholder="Nhập tên vai trò"
                                                    size="large"
                                                    onChange={handleNameChange}
                                                />
                                                <h5>Mô tả</h5>
                                                <TextArea
                                                    onChange={
                                                        handleDescriptionChange
                                                    }
                                                    rows={4}
                                                    placeholder="Nhập mô tả"
                                                />
                                            </Space>
                                        </div>
                                        <div className="col-6">
                                            <h5>
                                                Phân quyền chức năng{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </h5>
                                            <Card
                                                className=""
                                                bordered={false}
                                                style={{
                                                    backgroundColor:
                                                        "rgb(255, 242, 231)",
                                                }}
                                            >
                                                <div>
                                                    <Space direction="vertical">
                                                        <h4 className="mainColor ">
                                                            Nhóm chức năng A
                                                        </h4>
                                                        <Checkbox
                                                            className="mainColor"
                                                            style={{
                                                                backgroundColor:
                                                                    checked
                                                                        ? "#ff9138"
                                                                        : "",
                                                                color: checked
                                                                    ? "#fff"
                                                                    : "",
                                                            }}
                                                        >
                                                            Tất cả
                                                        </Checkbox>
                                                        <Checkbox className="mainColor">
                                                            Chức năng x
                                                        </Checkbox>
                                                        <Checkbox className="mainColor">
                                                            Chức năng y
                                                        </Checkbox>
                                                        <Checkbox className="mainColor">
                                                            Chức năng z
                                                        </Checkbox>
                                                    </Space>
                                                </div>
                                                <div className="mt-2">
                                                    <Space direction="vertical">
                                                        <h4 className="mainColor my-3">
                                                            Nhóm chức năng B
                                                        </h4>
                                                        <Checkbox className="mainColor">
                                                            Tất cả
                                                        </Checkbox>
                                                        <Checkbox className="mainColor">
                                                            Chức năng x
                                                        </Checkbox>
                                                        <Checkbox className="mainColor">
                                                            Chức năng y
                                                        </Checkbox>
                                                        <Checkbox className="mainColor">
                                                            Chức năng z
                                                        </Checkbox>
                                                    </Space>
                                                </div>
                                            </Card>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                        <div
                            className="col-6 text-center offset-3 mt-5"
                            style={{ position: "sticky", bottom: "20px" }}
                        >
                            <Form.Item>
                                <Button
                                    htmlType="submit"
                                    type="primary"
                                    className="normal-button mr-5 px-10"
                                    style={{
                                        backgroundColor: "white",
                                        color: "#FF9138",
                                        border: "1px solid #FF9138",
                                    }}
                                >
                                    Hủy
                                </Button>
                                <Button
                                    htmlType="submit"
                                    onClick={handleAddRoleManagement}
                                    type="primary"
                                    className="normal-button px-10"
                                    style={{
                                        backgroundColor: "#FF9138",
                                        color: "#fff",
                                        border: "1px solid #FF9138",
                                    }}
                                >
                                    Thêm
                                </Button>
                            </Form.Item>
                        </div>
                    </div>
                </Content>
            </Layout>
        </div>
    );
}

export default AddRole;
