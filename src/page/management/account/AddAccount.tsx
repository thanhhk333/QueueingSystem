import React, { useEffect, useState } from "react";
import {
    Breadcrumb,
    Button,
    Card,
    Form,
    Input,
    Layout,
    Select,
    Row,
    Col,
    MenuProps,
    Dropdown,
    Space,
} from "antd";
import LeftMenu from "../../Components/Leftmenu";
import Header from "../../Components/Header";
import { CaretDownOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { AccountData, addAccount } from "./redux/AccountSlice";
import firebase from "firebase/compat/app";
import { createUserLog } from "../user/userLogSlice";

const { Content } = Layout;

function AddAccount() {
    const dispatch = useDispatch();

    const [newAccount, setNewAccount] = useState<AccountData>({
        id: "",
        userName: "",
        fullName: "",
        phone: "",
        email: "",
        password: "",
        status: "Hoạt động",
        role: "",
    });

    const [selectedRole, setSelectedRole] = useState("Kế toán");
    const handleRoleChange = (value: any) => {
        setSelectedRole(value);
        setNewAccount((prevAccount) => ({
            ...prevAccount,
            role: value,
        }));
    };
    const roles = useSelector((state: RootState) => state.roleManagement.data);
    const menuProps = {
        items: roles.map((role) => ({
            label: role.name,
            key: role.name,
            onClick: () => handleRoleChange(role.id),
        })),
    };
    const [selectedStatus, setSelectedStatus] = useState("Hoạt động");

    const handleStatusChange = (value: any) => {
        setSelectedStatus(value);
        setNewAccount((prevAccount) => ({
            ...prevAccount,
            status: value,
        }));
    };

    const menuStatus = {
        items: [
            {
                label: "Hoạt động",
                key: "2",
                onClick: () => handleStatusChange("Hoạt động"),
            },
            {
                label: "Ngưng hoạt động",
                key: "3",
                onClick: () => handleStatusChange("Ngưng hoạt động"),
            },
        ],
    };

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
        action: "Thêm tài khoản",
    };
    const handleAddAccount = () => {
        dispatch(addAccount(newAccount as any) as any);
        dispatch(createUserLog(userLog) as any);
    };
    return (
        <div className="d-flex">
            <LeftMenu />
            <Layout>
                <Content style={{}}>
                    <div className="container">
                        <div className="row ">
                            <div className="col ">
                                <Header
                                    headerContent={
                                        <Breadcrumb className="custom-breadcrumb">
                                            <Breadcrumb.Item>
                                                Cài đặt hệ thống
                                            </Breadcrumb.Item>
                                            <Breadcrumb.Item>
                                                {" "}
                                                Quản lý tài khoản
                                            </Breadcrumb.Item>
                                            <Breadcrumb.Item>
                                                <span
                                                    style={{ color: "#ff9138" }}
                                                >
                                                    Thêm tài khoản
                                                </span>
                                            </Breadcrumb.Item>
                                        </Breadcrumb>
                                    }
                                />
                            </div>
                        </div>

                        <h2 style={{ color: "#ff9138" }}>Quản lý tài khoản</h2>

                        <div className="mt-3 row">
                            <div className="col">
                                <Card>
                                    <h4 style={{ color: "#ff9138" }}>
                                        Thông tin tài khoản
                                    </h4>
                                    <Form className="mt-3">
                                        <Row gutter={[16, 16]}>
                                            <Col span={12}>
                                                <label className="mb-2">
                                                    Họ tên:{" "}
                                                    <span className="text-danger">
                                                        *
                                                    </span>
                                                </label>
                                                <Form.Item>
                                                    <Input
                                                        placeholder="Nhập họ tên"
                                                        value={
                                                            newAccount.fullName
                                                        }
                                                        onChange={(e) =>
                                                            setNewAccount({
                                                                ...newAccount,
                                                                fullName:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <label className="mb-2">
                                                    Tên đăng nhập:{" "}
                                                    <span className="text-danger">
                                                        *
                                                    </span>
                                                </label>
                                                <Form.Item>
                                                    <Input
                                                        placeholder="Tên đăng nhập"
                                                        value={
                                                            newAccount.userName
                                                        }
                                                        onChange={(e) =>
                                                            setNewAccount({
                                                                ...newAccount,
                                                                userName:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <label className="mb-2">
                                                    Số điện thoại:{" "}
                                                    <span className="text-danger">
                                                        *
                                                    </span>
                                                </label>
                                                <Form.Item>
                                                    <Input
                                                        placeholder="Nhập Số điện thoại"
                                                        value={newAccount.phone}
                                                        onChange={(e) =>
                                                            setNewAccount({
                                                                ...newAccount,
                                                                phone: e.target
                                                                    .value,
                                                            })
                                                        }
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <label className="mb-2">
                                                    Mật khẩu:{" "}
                                                    <span className="text-danger">
                                                        *
                                                    </span>
                                                </label>
                                                <Form.Item>
                                                    <Input.Password
                                                        placeholder="Nhập mật khẩu"
                                                        value={
                                                            newAccount.password
                                                        }
                                                        onChange={(e) =>
                                                            setNewAccount({
                                                                ...newAccount,
                                                                password:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <label className="mb-2">
                                                    Email:{" "}
                                                    <span className="text-danger">
                                                        *
                                                    </span>
                                                </label>
                                                <Form.Item>
                                                    <Input
                                                        placeholder="Nhập địa chỉ email"
                                                        value={newAccount.email}
                                                        onChange={(e) =>
                                                            setNewAccount({
                                                                ...newAccount,
                                                                email: e.target
                                                                    .value,
                                                            })
                                                        }
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <label className="mb-2">
                                                    Nhập lại mật khẩu:{" "}
                                                    <span className="text-danger">
                                                        *
                                                    </span>
                                                </label>
                                                <Form.Item>
                                                    <Input.Password placeholder="Nhập lại mật khẩu" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <label className="mb-2">
                                                    Vai trò:{" "}
                                                    <span className="text-danger">
                                                        *
                                                    </span>
                                                </label>
                                                <Dropdown menu={menuProps}>
                                                    <Button
                                                        style={{
                                                            width: "100%",
                                                            fontSize: "16px",
                                                            lineHeight: "16px",
                                                            padding:
                                                                "10px, 12px, 10px, 12px",
                                                            color: "black",
                                                            borderRadius: "8px",
                                                        }}
                                                        size="middle"
                                                        value={selectedRole}
                                                    >
                                                        <Space className="flex justify-between mx-3">
                                                            {selectedRole}
                                                            <CaretDownOutlined
                                                                style={{
                                                                    color: "#ff9138",
                                                                }}
                                                            />
                                                        </Space>
                                                    </Button>
                                                </Dropdown>
                                            </Col>
                                            <Col span={12}>
                                                <label className="mb-2">
                                                    Tình trạng:{" "}
                                                    <span className="text-danger">
                                                        *
                                                    </span>
                                                </label>
                                                <Dropdown menu={menuStatus}>
                                                    <Button
                                                        value={selectedStatus}
                                                        style={{
                                                            width: "100%",
                                                            fontSize: "16px",
                                                            lineHeight: "16px",
                                                            padding:
                                                                "10px, 12px, 10px, 12px",
                                                            color: "black",
                                                            borderRadius: "8px",
                                                        }}
                                                        size="middle"
                                                    >
                                                        <Space className="flex justify-between mx-3">
                                                            {selectedStatus}
                                                            <CaretDownOutlined
                                                                style={{
                                                                    color: "#ff9138",
                                                                }}
                                                            />
                                                        </Space>
                                                    </Button>
                                                </Dropdown>
                                            </Col>
                                            <Col
                                                span={24}
                                                className="text-right mb-5 pb-1"
                                            >
                                                <span className="text-danger">
                                                    *
                                                </span>{" "}
                                                <small>
                                                    Là trường hợp thông tin bắt
                                                    buộc
                                                </small>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Card>
                                <div className="col-6 text-center offset-3 mt-3">
                                    <Form.Item>
                                        <Button
                                            htmlType="submit"
                                            type="primary"
                                            className="normal-button mr-5 "
                                            style={{
                                                backgroundColor: "white",
                                                color: "#FF9138",
                                                border: "1px solid #FF9138",
                                            }}
                                        >
                                            Hủy
                                        </Button>
                                        <Button
                                            onClick={handleAddAccount}
                                            htmlType="submit"
                                            type="primary"
                                            className="normal-button"
                                            style={{
                                                backgroundColor: "#FF9138",
                                                color: "#fff",
                                                border: "1px solid #FF9138",
                                            }}
                                        >
                                            Thêm tài khoản
                                        </Button>
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
                    </div>
                </Content>
            </Layout>
        </div>
    );
}

export default AddAccount;
