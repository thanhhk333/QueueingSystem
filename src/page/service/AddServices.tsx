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
import TextArea from "antd/es/input/TextArea";
import Header from "../Components/Header";
import LeftMenu from "../Components/Leftmenu";
import { useDispatch } from "react-redux";
import { ServiceType, addService } from "./redux/serviceSilece";
import { AccountData } from "../management/account/redux/AccountSlice";
import firebase from "firebase/compat/app";
import { createUserLog } from "../management/user/userLogSlice";

const { Content } = Layout;

function AddService() {
    const dispatch = useDispatch();
    const [serviceData, setServiceData] = useState<ServiceType>({
        id: "", // You can leave it empty as it will be generated by Firestore
        idService: "",
        name: "",
        description: "",
        status: "Hoạt động",
    });

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setServiceData((prevData) => ({ ...prevData, [name]: value }));
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
        action: "Thêm dịch vụ",
    };
    const handleSubmit = (event: any) => {
        event.preventDefault();
        dispatch(addService(serviceData as any) as any);
        dispatch(createUserLog(userLog as any) as any);
    };

    return (
        <div className="flex">
            <LeftMenu />
            <Layout>
                <Content>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <Header
                                    headerContent={
                                        <Breadcrumb className="custom-breadcrumb">
                                            <Breadcrumb.Item>
                                                Dịch vụ
                                            </Breadcrumb.Item>
                                            <Breadcrumb.Item>
                                                Danh sách dịch vụ
                                            </Breadcrumb.Item>
                                            <Breadcrumb.Item>
                                                <span
                                                    style={{ color: "#ff9138" }}
                                                >
                                                    Thêm dịch vụ
                                                </span>
                                            </Breadcrumb.Item>
                                        </Breadcrumb>
                                    }
                                />
                            </div>
                        </div>
                        <div className="pt-5">
                            <h2 style={{ color: "#ff9138" }}>
                                Danh sách dịch vụ{" "}
                            </h2>
                        </div>
                        <div className="mt-3">
                            <Card style={{ width: 1140 }}>
                                <h6 style={{ color: "#FF9138" }}>
                                    Thông tin dịch vụ
                                </h6>
                                <Form className="mt-3">
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="row">
                                                <div className="col-12">
                                                    <label
                                                        htmlFor=""
                                                        className="mb-2"
                                                    >
                                                        Mã dịch vụ:{" "}
                                                        <span
                                                            style={{
                                                                color: "#FF9138",
                                                            }}
                                                        >
                                                            *
                                                        </span>
                                                    </label>
                                                    <Form.Item className="">
                                                        <Input
                                                            name="idService"
                                                            placeholder="203"
                                                            value={
                                                                serviceData.idService
                                                            }
                                                            onChange={
                                                                handleInputChange
                                                            }
                                                        />
                                                    </Form.Item>
                                                </div>
                                                <div className="col-12">
                                                    <label
                                                        htmlFor=""
                                                        className="mb-2"
                                                    >
                                                        Tên dịch vụ:{" "}
                                                        <span
                                                            style={{
                                                                color: "#FF9138",
                                                            }}
                                                        >
                                                            *
                                                        </span>
                                                    </label>
                                                    <Form.Item className="">
                                                        <Input
                                                            name="name"
                                                            placeholder="Nhập tên dịch vụ"
                                                            value={
                                                                serviceData.name
                                                            }
                                                            onChange={
                                                                handleInputChange
                                                            }
                                                        />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <label htmlFor="" className="mb-2">
                                                Mô tả:
                                                <span
                                                    style={{ color: "#FF9138" }}
                                                >
                                                    *
                                                </span>
                                            </label>
                                            <Form.Item className="">
                                                <TextArea
                                                    maxLength={2000}
                                                    rows={5}
                                                    name="description"
                                                    placeholder="Mô tả dịch vụ"
                                                    value={
                                                        serviceData.description
                                                    }
                                                    onChange={handleInputChange}
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <h6 style={{ color: "#FF9138" }}>
                                        Quy tắc cấp số
                                    </h6>

                                    <div>
                                        <Space wrap>
                                            <Checkbox className="blue-checkbox">
                                                Tăng tự động
                                            </Checkbox>
                                            <Input
                                                value="0001"
                                                className="w-24"
                                            />
                                            <p className="mx-2 mb-2">đến</p>
                                            <Input
                                                value="0009"
                                                className="w-24"
                                            />
                                        </Space>
                                    </div>

                                    <div style={{ margin: "10px 0" }}>
                                        <Space wrap>
                                            <Checkbox className="blue-checkbox">
                                                Prefix
                                            </Checkbox>
                                            <Input
                                                value="0001"
                                                className="w-24"
                                            />
                                        </Space>
                                    </div>

                                    <div style={{ margin: "10px 0" }}>
                                        <Space wrap>
                                            <Checkbox className="blue-checkbox">
                                                Suffix
                                            </Checkbox>
                                            <Input
                                                value="0001"
                                                className="w-24"
                                            />
                                        </Space>
                                    </div>

                                    <div>
                                        <Space wrap>
                                            <Checkbox className="blue-checkbox">
                                                Reset mỗi ngày
                                            </Checkbox>
                                        </Space>
                                    </div>

                                    <div className="mt-4 text-right">
                                        <span style={{ color: "#FF9138" }}>
                                            *
                                        </span>{" "}
                                        <small>
                                            Là trường hợp thông tin bắt buộc
                                        </small>
                                    </div>

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
                                                onClick={handleSubmit}
                                                htmlType="submit"
                                                type="primary"
                                                className="normal-button"
                                                style={{
                                                    backgroundColor: "#FF9138",
                                                    color: "#fff",
                                                    border: "1px solid #FF9138",
                                                }}
                                            >
                                                Thêm dịch vụ
                                            </Button>
                                        </Form.Item>
                                    </div>
                                </Form>
                            </Card>
                        </div>
                    </div>
                </Content>
            </Layout>
        </div>
    );
}

export default AddService;
