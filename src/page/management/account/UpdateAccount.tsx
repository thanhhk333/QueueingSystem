import React, { useEffect, useState } from "react";
import {
    Breadcrumb,
    Button,
    Card,
    Form,
    Input,
    Layout,
    Row,
    Col,
    MenuProps,
    Dropdown,
    Space,
    Select,
} from "antd";
import LeftMenu from "../../Components/Leftmenu";
import Header from "../../Components/Header";
import { CaretDownOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { AccountData, UpdateAccount } from "./redux/AccountSlice";
import firebase from "firebase/compat/app";
import { createUserLog } from "../user/userLogSlice";

const { Content } = Layout;

function UpdateAccounts() {
    const { id } = useParams<{ id: string }>();
    const account = useSelector((state: RootState) =>
        state.account.data.find((d: any) => d.id === id)
    );
    const roles = useSelector((state: RootState) => state.roleManagement.data);
    const [updateAccount, setUpdateAccount] = useState<AccountData>({
        id: account?.id || "",
        userName: account?.userName || "",
        fullName: account?.fullName || "",
        phone: account?.phone || "",
        email: account?.email || "",
        department: account?.department || "",
        status: account?.status || "",
        role: account?.role.id || "",
        password: account?.password || "",
    });
    const roleName = roles.find((role) => role.id === updateAccount.role);

    const [selectedRole, setSelectedRole] = useState(roleName?.name || "");
    const handleRoleChange = (value: any) => {
        setSelectedRole(value);
        setUpdateAccount((prevAccount) => ({
            ...prevAccount,
            role: value,
        }));
    };

    const [selectedStatus, setSelectedStatus] = useState(updateAccount.status);

    const handleStatusChange = (value: any) => {
        setSelectedStatus(value);
        setUpdateAccount((prevAccount) => ({
            ...prevAccount,
            status: value,
        }));
    };

    const dispatch = useDispatch();
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

    const userLog = {
        userName: user.userName || "Guest mode",
        time: firebase.firestore.Timestamp.now(),
        ip: "192.168.1.10",
        action: "Cập nhật tài khoản",
    };
    const handleUpdateAccount = () => {
        dispatch(UpdateAccount(updateAccount) as any);
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
                                                            updateAccount?.fullName
                                                        }
                                                        onChange={(e) =>
                                                            setUpdateAccount({
                                                                ...updateAccount,
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
                                                            updateAccount?.userName
                                                        }
                                                        onChange={(e) =>
                                                            setUpdateAccount({
                                                                ...updateAccount,
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
                                                        value={
                                                            updateAccount?.phone
                                                        }
                                                        onChange={(e) =>
                                                            setUpdateAccount({
                                                                ...updateAccount,
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
                                                            updateAccount?.password
                                                        }
                                                        onChange={(e) =>
                                                            setUpdateAccount({
                                                                ...updateAccount,
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
                                                        value={
                                                            updateAccount?.email
                                                        }
                                                        onChange={(e) =>
                                                            setUpdateAccount({
                                                                ...updateAccount,
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
                                                <Select
                                                    suffixIcon={
                                                        <CaretDownOutlined className="mainColor" />
                                                    }
                                                    value={selectedRole}
                                                    style={{ width: "100%" }}
                                                    onChange={handleRoleChange}
                                                    options={roles.map(
                                                        (item) => ({
                                                            value: item.id,
                                                            label: item.name,
                                                        })
                                                    )}
                                                />
                                            </Col>
                                            <Col span={12}>
                                                <label className="mb-2">
                                                    Tình trạng:{" "}
                                                    <span className="text-danger">
                                                        *
                                                    </span>
                                                </label>

                                                <Select
                                                    suffixIcon={
                                                        <CaretDownOutlined className="mainColor" />
                                                    }
                                                    value={selectedStatus}
                                                    style={{ width: "100%" }}
                                                    onChange={
                                                        handleStatusChange
                                                    }
                                                    options={[
                                                        {
                                                            value: "Hoạt động",
                                                            label: " Hoạt động",
                                                        },
                                                        {
                                                            value: "Ngưng hoạt động",
                                                            label: " Ngưng hoạt động",
                                                        },
                                                    ]}
                                                />
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
                                            onClick={handleUpdateAccount}
                                            htmlType="submit"
                                            type="primary"
                                            className="normal-button"
                                            style={{
                                                backgroundColor: "#FF9138",
                                                color: "#fff",
                                                border: "1px solid #FF9138",
                                            }}
                                        >
                                            Cập nhật tài khoản
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

export default UpdateAccounts;
