import React, { useEffect, useState } from "react";
import {
    Breadcrumb,
    Button,
    Card,
    Col,
    Dropdown,
    Form,
    Input,
    Layout,
    Menu,
    Row,
    Select,
    Space,
} from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { addDevice } from "./redux/deviceSlice";
import LeftMenu from "../Components/Leftmenu";
import Header from "../Components/Header";
import { AccountData } from "../management/account/redux/AccountSlice";
import firebase from "firebase/compat/app";
import { createUserLog } from "../management/user/userLogSlice";

const { Content } = Layout;
const { Option } = Select;

const tagsData = [
    "Khám tim mạch",
    "Khám sản - Phụ khoa",
    "Khám răng hàm mặt",
    "Khám tai mũi họng",
    "Khám hô hấp",
    "Khám tổng quát",
];

interface DeviceFormValues {
    id: string;
    idDevice: string;
    name: string;
    IpAddress: string;
    status: any;
    statusWork: any;
    service: string;
    userName: string;
    password: string;
    type: string;
}

const AddDevices: React.FC = () => {
    const items = [
        {
            label: "Kiosk",
            value: "Kiosk",
        },
        {
            label: "Display counter",
            value: "Display counter",
        },
    ];

    const dispatch = useDispatch();

    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [deviceFormValues, setDeviceFormValues] = useState<DeviceFormValues>({
        id: "",
        idDevice: "",
        name: "",
        IpAddress: "",
        status: "Hoạt động",
        statusWork: "Kết nối",
        service: "",
        userName: "",
        password: "",
        type: "",
    });

    const handleChange = (values: string[]) => {
        setSelectedTags(values);
        setDeviceFormValues((prevState) => ({
            ...prevState,
            service: values.join(", "),
        }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDeviceFormValues((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleTypeChange = (value: string) => {
        setDeviceFormValues((prevState) => ({
            ...prevState,
            type: value,
        }));
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
        action: "Thêm thiết bị",
    };
    const handleAddDevice = () => {
        dispatch(addDevice(deviceFormValues) as any);
        dispatch(createUserLog(userLog) as any);
        // Reset form values
        setDeviceFormValues({
            id: "",
            idDevice: "",
            name: "",
            IpAddress: "",
            status: "",
            statusWork: "",
            service: "",
            userName: "",
            password: "",
            type: "",
        });
        setSelectedTags([]);
    };

    return (
        <div className="d-flex">
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
                                                Thiết bị
                                            </Breadcrumb.Item>
                                            <Breadcrumb.Item>
                                                Danh sách thiết bị
                                            </Breadcrumb.Item>
                                            <Breadcrumb.Item>
                                                <span
                                                    style={{ color: "#ff9138" }}
                                                >
                                                    Thêm thiết bị
                                                </span>
                                            </Breadcrumb.Item>
                                        </Breadcrumb>
                                    }
                                />
                            </div>
                        </div>
                        <h2 style={{ color: "#FF7506" }}>Quản lý thiết bị</h2>

                        <div className="mt-3">
                            <Card style={{ width: 1140 }}>
                                <h4 style={{ color: "#FF7506" }}>
                                    Thông tin thiết bị
                                </h4>
                                <Form className="mt-3">
                                    <Row gutter={[16, 16]}>
                                        <Col span={12}>
                                            <label className="mb-2">
                                                Mã thiết bị:
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </label>
                                            <Form.Item>
                                                <Input
                                                    placeholder="Nhập mã thiết bị"
                                                    name="idDevice"
                                                    value={
                                                        deviceFormValues.idDevice
                                                    }
                                                    onChange={handleInputChange}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <label className="mb-2">
                                                Loại thiết bị:{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </label>
                                            <Form.Item>
                                                <Select
                                                    defaultValue={
                                                        deviceFormValues.type
                                                    }
                                                    onChange={handleTypeChange}
                                                >
                                                    {items.map((item) => (
                                                        <Option
                                                            key={item.value}
                                                            value={item.value}
                                                        >
                                                            {item.label}
                                                        </Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <label className="mb-2">
                                                Tên thiết bị:{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </label>
                                            <Form.Item>
                                                <Input
                                                    placeholder="Nhập tên thiết bị"
                                                    name="name"
                                                    value={
                                                        deviceFormValues.name
                                                    }
                                                    onChange={handleInputChange}
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
                                                    placeholder="Nhập tài khoản"
                                                    name="userName"
                                                    value={
                                                        deviceFormValues.userName
                                                    }
                                                    onChange={handleInputChange}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <label className="mb-2">
                                                Địa chỉ IP:{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </label>
                                            <Form.Item>
                                                <Input
                                                    placeholder="Nhập địa chỉ IP"
                                                    name="IpAddress"
                                                    value={
                                                        deviceFormValues.IpAddress
                                                    }
                                                    onChange={handleInputChange}
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
                                                <Input
                                                    placeholder="Nhập mật khẩu"
                                                    name="password"
                                                    value={
                                                        deviceFormValues.password
                                                    }
                                                    onChange={handleInputChange}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <label className="mb-2">
                                                Dịch vụ sử dụng:{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </label>
                                            <Form.Item>
                                                <Select
                                                    mode="tags"
                                                    placeholder="Select tags"
                                                    onChange={handleChange}
                                                    value={selectedTags}
                                                    style={{ color: "#FF7506" }}
                                                >
                                                    {tagsData.map((tag) => (
                                                        <Option key={tag}>
                                                            {tag}
                                                        </Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={24} className="text-right">
                                            <span className="text-danger">
                                                *
                                            </span>
                                            <small>
                                                Là trường hợp thông tin bắt buộc
                                            </small>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card>
                        </div>
                        <div className="col-6 text-center offset-3 mt-3">
                            <Form.Item>
                                <Button
                                    htmlType="submit"
                                    type="primary"
                                    className="normal-button mr-5"
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
                                    type="primary"
                                    className="normal-button"
                                    style={{
                                        backgroundColor: "#FF9138",
                                        color: "#fff",
                                        border: "1px solid #FF9138",
                                    }}
                                    onClick={handleAddDevice}
                                >
                                    Thêm thiết bị
                                </Button>
                            </Form.Item>
                        </div>
                    </div>
                </Content>
            </Layout>
        </div>
    );
};

export default AddDevices;
