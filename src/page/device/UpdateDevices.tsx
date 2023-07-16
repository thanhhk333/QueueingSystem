import React, { useEffect, useState } from "react";
import {
    Breadcrumb,
    Button,
    Card,
    Form,
    Input,
    Layout,
    Select,
    Tag,
} from "antd";

import Header from "../Components/Header";
import LeftMenu from "../Components/Leftmenu";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { DataType, updateDevice } from "./redux/deviceSlice";
import { AccountData } from "../management/account/redux/AccountSlice";
import firebase from "firebase/compat/app";
import { createUserLog } from "../management/user/userLogSlice";

const { Content } = Layout;

function UpdateDevices() {
    const { id } = useParams<{ id: string }>();
    const device = useSelector((state: RootState) =>
        state.device.data.find((d: any) => d.id === id)
    );
    const services = useSelector((state: RootState) => state.service.data);

    const [updatedDevice, setUpdatedDevice] = useState<DataType>({
        id: device?.id || "",
        idDevice: device?.idDevice || "",
        name: device?.name || "",
        service: device?.service || "",
        type: device?.type || "",
        userName: device?.userName || "",
        password: device?.password || "",
        IpAddress: device?.IpAddress || "",
        status: device?.status || "",
        statusWork: device?.statusWork || "",
    });

    const dispatch = useDispatch();
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
        action: "Cập nhật thiết bị",
    };
    const handleUpdateDevice = () => {
        dispatch(updateDevice(updatedDevice) as any);
        dispatch(createUserLog(userLog) as any);
    };
    const serviceTags = updatedDevice.service.split(",");

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
                                                Thiết bị
                                            </Breadcrumb.Item>
                                            <Breadcrumb.Item>
                                                {" "}
                                                Danh sách thiết bị
                                            </Breadcrumb.Item>
                                            <Breadcrumb.Item>
                                                <span
                                                    style={{ color: "#ff9138" }}
                                                >
                                                    Cập nhật thiết bị
                                                </span>
                                            </Breadcrumb.Item>
                                        </Breadcrumb>
                                    }
                                />
                            </div>
                        </div>
                        <div>
                            <h4 style={{ color: "#FF7506" }}>
                                Quản lý thiết bị
                            </h4>
                        </div>
                        <div className="mt-3">
                            <Card style={{ width: 1140, height: 500 }}>
                                <h6 style={{ color: "#FF7506" }}>
                                    Thông tin thiết bị
                                </h6>
                                <Form className="mt-3">
                                    <div className="row">
                                        <div className="col-6">
                                            <label htmlFor="" className="mb-2">
                                                Mã thiết bị:{" "}
                                                <span
                                                    style={{ color: "#FF7506" }}
                                                >
                                                    *
                                                </span>
                                            </label>
                                            <Form.Item className="">
                                                <Input
                                                    placeholder="Nhập mã thiết bị"
                                                    value={
                                                        updatedDevice.idDevice
                                                    }
                                                    onChange={(e) =>
                                                        setUpdatedDevice({
                                                            ...updatedDevice,
                                                            idDevice:
                                                                e.target.value,
                                                        })
                                                    }
                                                />
                                            </Form.Item>
                                        </div>
                                        <div className="col-6">
                                            <label htmlFor="" className="mb-2">
                                                Loại thiết bị:{" "}
                                                <span
                                                    style={{ color: "#FF7506" }}
                                                >
                                                    *
                                                </span>
                                            </label>
                                            <Form.Item>
                                                <Select
                                                    defaultValue="all"
                                                    value={updatedDevice.type}
                                                    onChange={(value) =>
                                                        setUpdatedDevice({
                                                            ...updatedDevice,
                                                            type: value,
                                                        })
                                                    }
                                                >
                                                    <Select.Option value="all">
                                                        Chọn loại thiết bị
                                                    </Select.Option>
                                                    <Select.Option value="connected">
                                                        Kiosk
                                                    </Select.Option>
                                                    <Select.Option value="disconnected">
                                                        Display counter
                                                    </Select.Option>
                                                </Select>
                                            </Form.Item>
                                        </div>
                                        <div className="col-6">
                                            <label htmlFor="" className="mb-2">
                                                Tên thiết bị:{" "}
                                                <span
                                                    style={{ color: "#FF7506" }}
                                                >
                                                    *
                                                </span>
                                            </label>
                                            <Form.Item className="">
                                                <Input
                                                    placeholder="Nhập tên thiết bị"
                                                    value={updatedDevice.name}
                                                    onChange={(e) =>
                                                        setUpdatedDevice({
                                                            ...updatedDevice,
                                                            name: e.target
                                                                .value,
                                                        })
                                                    }
                                                />
                                            </Form.Item>
                                        </div>
                                        <div className="col-6">
                                            <label htmlFor="" className="mb-2">
                                                Tên đăng nhập:{" "}
                                                <span
                                                    style={{ color: "#FF7506" }}
                                                >
                                                    *
                                                </span>
                                            </label>
                                            <Form.Item className="">
                                                <Input
                                                    placeholder="Nhập tài khoản"
                                                    value={
                                                        updatedDevice.userName
                                                    }
                                                    onChange={(e) =>
                                                        setUpdatedDevice({
                                                            ...updatedDevice,
                                                            userName:
                                                                e.target.value,
                                                        })
                                                    }
                                                />
                                            </Form.Item>
                                        </div>
                                        <div className="col-6">
                                            <label htmlFor="" className="mb-2">
                                                Địa chỉ IP:{" "}
                                                <span
                                                    style={{ color: "#FF7506" }}
                                                >
                                                    *
                                                </span>
                                            </label>
                                            <Form.Item className="">
                                                <Input
                                                    placeholder="Nhập địa chỉ IP"
                                                    value={
                                                        updatedDevice.IpAddress
                                                    }
                                                    onChange={(e) =>
                                                        setUpdatedDevice({
                                                            ...updatedDevice,
                                                            IpAddress:
                                                                e.target.value,
                                                        })
                                                    }
                                                />
                                            </Form.Item>
                                        </div>

                                        <div className="col-6">
                                            <label htmlFor="" className="mb-2">
                                                Mật khẩu:{" "}
                                                <span
                                                    style={{ color: "#FF7506" }}
                                                >
                                                    *
                                                </span>
                                            </label>
                                            <Form.Item className="">
                                                <Input
                                                    placeholder="Nhập mật khẩu"
                                                    value={
                                                        updatedDevice.password
                                                    }
                                                    onChange={(e) =>
                                                        setUpdatedDevice({
                                                            ...updatedDevice,
                                                            password:
                                                                e.target.value,
                                                        })
                                                    }
                                                />
                                            </Form.Item>
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="" className="mb-2">
                                                Dịch vụ sử dụng:{" "}
                                                <span
                                                    style={{ color: "#FF7506" }}
                                                >
                                                    *
                                                </span>
                                            </label>
                                            <Input
                                                style={{
                                                    height: 100,
                                                    borderColor: "#FF9138",
                                                }}
                                                readOnly
                                                suffix={
                                                    <>
                                                        {serviceTags.map(
                                                            (tag) => (
                                                                <Tag
                                                                    style={{
                                                                        background:
                                                                            "#FFAC6A",
                                                                        color: "white",
                                                                    }}
                                                                    className="align-items-center justify-start"
                                                                    closable
                                                                >
                                                                    {tag}
                                                                </Tag>
                                                            )
                                                        )}
                                                    </>
                                                }
                                            />
                                        </div>
                                        <div className="col-12 items-center">
                                            <span style={{ color: "#FF7506" }}>
                                                *
                                            </span>{" "}
                                            <small>
                                                Là trường hợp thông tin bắt buộc
                                            </small>
                                        </div>
                                    </div>
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
                                        onClick={handleUpdateDevice}
                                        htmlType="submit"
                                        type="primary"
                                        className="normal-button"
                                        style={{
                                            backgroundColor: "#FF9138",
                                            color: "#fff",
                                            border: "1px solid #FF9138",
                                        }}
                                    >
                                        Cập nhật thiết bị
                                    </Button>
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                </Content>
            </Layout>
        </div>
    );
}

export default UpdateDevices;
