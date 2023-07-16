import React, { useEffect, useState } from "react";
import {
    Breadcrumb,
    Button,
    Card,
    Dropdown,
    Form,
    Layout,
    Space,
    Select,
} from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import LeftMenu from "../Components/Leftmenu";
import Header from "../Components/Header";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import firebase from "firebase/compat/app";
import { fetchService } from "../service/redux/serviceSilece";
import { createProgressive } from "./redux/progressiveSlice";

import { Modal, Row, Col, Input } from "antd";
import { AccountData } from "../management/account/redux/AccountSlice";
import { createUserLog } from "../management/user/userLogSlice";
const { Content } = Layout;
interface MenuItem {
    label: string;
    key: string;
}
interface MenuServiceProps {
    items: MenuItem[];
}

const menuService: MenuServiceProps = {
    items: [],
};
function AddPro() {
    const [modalPro, setModalPro] = React.useState(false);
    const [modalForm, setModalForm] = React.useState(false);

    const dispatch = useDispatch();
    const dataService = useSelector((state: RootState) => state.service.data);
    // const isLoggedIn = useSelector(
    //     (state: RootState) => state.account.isLoggedIn
    // );
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    menuService.items = dataService.map((service: any) => ({
        label: service.name,
        key: service.id,
        value: service.id,
        onClick: () => handleNameServiceChange(service.name),
    }));

    let currentTime = firebase.firestore.Timestamp.now();

    useEffect(() => {
        dispatch(fetchService() as any);
    }, [dispatch]);

    const [selectednameService, setSelectednameService] = React.useState("");
    const handleNameServiceChange = (key: any) => {
        setSelectednameService(key);
        setPro((prevPro) => ({
            ...prevPro,
            nameService: key,
        }));
    };
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
        action: "Thêm cấp số mới",
    };

    console.log(userLog);
    const [pro, setPro] = React.useState({
        name: "",
        nameService: "",
        grantTime: currentTime,
        exp: firebase.firestore.Timestamp.fromMillis(
            currentTime.toMillis() + 2 * 60 * 60 * 1000
        ),
        status: "Đang chờ",
        source: isLoggedIn === "true" ? "Hệ thống" : "Kiosk",
        stt: "43978434",
        phone: "",
        email: "",
    });
    const handleFormSubmit = () => {
        setPro({
            ...pro,
            grantTime: currentTime,
            exp: firebase.firestore.Timestamp.fromMillis(
                currentTime.toMillis() + 2 * 60 * 60 * 1000
            ),
        });
        dispatch(createProgressive(pro as any) as any);
        dispatch(createUserLog(userLog) as any);
        setModalPro(true);
    };
    console.log(pro);

    const handleCheck = () => {
        if (isLoggedIn === "true") {
            const updatedPro = {
                ...pro,
                name: user.fullName,
                phone: user.phone,
                email: user.email,
                grantTime: currentTime,
                exp: firebase.firestore.Timestamp.fromMillis(
                    currentTime.toMillis() + 2 * 60 * 60 * 1000
                ),
            };
            setPro(updatedPro);
            setModalPro(true);
        } else {
            setModalForm(true);
        }
    };

    useEffect(() => {
        if (isLoggedIn === "true") {
            dispatch(createProgressive(pro as any) as any);
            dispatch(createUserLog(userLog) as any);
        }
    }, [pro, isLoggedIn, dispatch]);

    const grantTime = pro.grantTime.toDate();
    const exp = pro.exp.toDate();
    const isFormValid = pro.name && pro.phone && pro.email;
    const handleModalClose = () => {
        if (isFormValid) {
            setModalForm(false);
        }
    };
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setPro({ ...pro, [name]: value });
    };

    return (
        <div className="flex">
            <LeftMenu />

            <Layout>
                <Layout>
                    <Content>
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <Header
                                        headerContent={
                                            <Breadcrumb className="custom-breadcrumb">
                                                <Breadcrumb.Item>
                                                    Cấp số
                                                </Breadcrumb.Item>
                                                <Breadcrumb.Item>
                                                    Danh sách cấp số
                                                </Breadcrumb.Item>
                                                <Breadcrumb.Item>
                                                    <span
                                                        style={{
                                                            color: "#ff9138",
                                                        }}
                                                    >
                                                        {" "}
                                                        Cấp số mới{" "}
                                                    </span>
                                                </Breadcrumb.Item>
                                            </Breadcrumb>
                                        }
                                    />
                                </div>
                            </div>
                            <div className="pt-5">
                                <h2 style={{ color: "#ff9138" }}>
                                    Quản lý cấp số
                                </h2>
                            </div>
                            <div className="mt-3">
                                <Card>
                                    <h1
                                        className="text-center my-16 fw-bold"
                                        style={{ color: "#FF9138" }}
                                    >
                                        CẤP SỐ MỚI
                                    </h1>
                                    <p className="text-center fw-bold">
                                        Dịch vụ khách hàng lựa chọn
                                    </p>
                                    <p className="text-center">
                                        <Form>
                                            <Form.Item>
                                                {/* <Dropdown menu={menuService}>
                                                    <Button
                                                        onChange={(
                                                            value: any
                                                        ) => {
                                                            handleInputChange({
                                                                target: {
                                                                    name: "nameService",
                                                                    value: value,
                                                                },
                                                            });
                                                        }}
                                                        style={{
                                                            background: "#fff",
                                                            width: "30%",
                                                            border: "2px solid rgba(212, 212, 215, 1)",
                                                            fontSize: "16px",
                                                            lineHeight: "16px",
                                                            padding:
                                                                "10px, 12px, 10px, 12px",
                                                            color: "black",
                                                            borderRadius: "8px",
                                                        }}
                                                        size="large"
                                                    >
                                                        <Space className="flex justify-between mx-3">
                                                            {selectednameService ||
                                                                "Chọn dịch vụ"}
                                                            <CaretDownOutlined
                                                                style={{
                                                                    color: "#ff9138",
                                                                }}
                                                            />
                                                        </Space>
                                                    </Button>
                                                </Dropdown> */}
                                                <Select
                                                    style={{ width: "30%" }}
                                                    size="large"
                                                    placeholder="Chọn dịch vụ"
                                                    onChange={(value: any) => {
                                                        handleInputChange({
                                                            target: {
                                                                name: "nameService",
                                                                value: value,
                                                            },
                                                        });
                                                    }}
                                                    suffixIcon={
                                                        <CaretDownOutlined className="text-[#FF7506]" />
                                                    }
                                                    options={dataService.map(
                                                        (service: any) => ({
                                                            value: service.id,
                                                            label: service.name,
                                                        })
                                                    )}
                                                />
                                            </Form.Item>
                                            <div className="col-6 text-center offset-3 mt-5">
                                                <Form.Item>
                                                    <Button
                                                        htmlType="submit"
                                                        type="primary"
                                                        className="normal-button mr-5 px-10"
                                                        style={{
                                                            backgroundColor:
                                                                "white",
                                                            color: "#FF9138",
                                                            border: "1px solid #FF9138",
                                                        }}
                                                    >
                                                        Hủy
                                                    </Button>
                                                    <Button
                                                        htmlType="submit"
                                                        onClick={() =>
                                                            // setModalForm(true)
                                                            handleCheck()
                                                        }
                                                        type="primary"
                                                        className="normal-button px-10"
                                                        style={{
                                                            backgroundColor:
                                                                "#FF9138",
                                                            color: "#fff",
                                                            border: "1px solid #FF9138",
                                                        }}
                                                    >
                                                        In số
                                                    </Button>
                                                </Form.Item>
                                            </div>

                                            <Modal
                                                className="w-[500px]"
                                                centered
                                                open={modalForm}
                                                footer={null}
                                                closable={false}
                                            >
                                                <Form
                                                    layout="vertical"
                                                    className=" my-4"
                                                    onFinish={handleFormSubmit}
                                                >
                                                    <div className=" container flex flex-col items-center">
                                                        <h1 className="mainColor mb-12 text-2xl font-bold">
                                                            Vui lòng nhập thông
                                                            tin
                                                        </h1>
                                                        <Form.Item
                                                            className="w-[90%]"
                                                            label={
                                                                <span className="text-base font-semibold">
                                                                    Tên khách
                                                                    hàng:{" "}
                                                                </span>
                                                            }
                                                            name="name"
                                                            rules={[
                                                                {
                                                                    required:
                                                                        true,
                                                                    message:
                                                                        "Vui lòng nhập tên khách hàng!",
                                                                },
                                                            ]}
                                                        >
                                                            <Input
                                                                size="large"
                                                                name="name"
                                                                onChange={
                                                                    handleInputChange
                                                                }
                                                                value={pro.name}
                                                            />
                                                        </Form.Item>
                                                        <Form.Item
                                                            className="w-[90%]"
                                                            label={
                                                                <span className="text-base font-semibold">
                                                                    Số điện
                                                                    thoại:{" "}
                                                                </span>
                                                            }
                                                            name="phone"
                                                            rules={[
                                                                {
                                                                    required:
                                                                        true,
                                                                    message:
                                                                        "Vui lòng nhập số điện thoại!",
                                                                },
                                                            ]}
                                                        >
                                                            <Input
                                                                size="large"
                                                                className=""
                                                                name="phone"
                                                                onChange={
                                                                    handleInputChange
                                                                }
                                                                value={
                                                                    pro.phone
                                                                }
                                                            />
                                                        </Form.Item>
                                                        <Form.Item
                                                            className="w-[90%]"
                                                            label={
                                                                <span className="text-base font-semibold">
                                                                    Email:
                                                                </span>
                                                            }
                                                            name="email"
                                                            rules={[
                                                                {
                                                                    required:
                                                                        true,
                                                                    message:
                                                                        "Vui lòng nhập email!",
                                                                },
                                                            ]}
                                                        >
                                                            <Input
                                                                size="large"
                                                                className="p-3"
                                                                name="email"
                                                                onChange={
                                                                    handleInputChange
                                                                }
                                                                value={
                                                                    pro.email
                                                                }
                                                            />
                                                        </Form.Item>
                                                    </div>
                                                    <Row className="mb-6">
                                                        <Col span={24}>
                                                            <p className="text-sm font-normal ml-10">
                                                                <span className="text-danger">
                                                                    *
                                                                </span>
                                                                Là trường thông
                                                                tin bắt buộc
                                                            </p>
                                                        </Col>
                                                    </Row>
                                                    <Row
                                                        className="flex justify-center items-center"
                                                        gutter={32}
                                                    >
                                                        <Col>
                                                            <Button
                                                                onClick={() =>
                                                                    setModalForm(
                                                                        false
                                                                    )
                                                                }
                                                                className="bg-white h-full focus:border-[#FF9138] border-[#FF9138] px-5 py-3 w-36"
                                                            >
                                                                <span className="text-base text-[#FF9138] font-light">
                                                                    Huỷ bỏ
                                                                </span>
                                                            </Button>
                                                        </Col>
                                                        <Col>
                                                            <Button
                                                                htmlType="submit"
                                                                onClick={
                                                                    handleModalClose
                                                                }
                                                                className=" h-full focus:border-[#FF9138] border-[#mainColor] px-5 py-3 w-36"
                                                                style={{
                                                                    backgroundColor:
                                                                        "#FF9138",
                                                                }}
                                                            >
                                                                <span className="text-base text-white font-light">
                                                                    In số
                                                                </span>
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </Modal>
                                        </Form>
                                    </p>
                                </Card>
                                <Modal
                                    className="w-[500px]"
                                    centered
                                    onCancel={() => setModalPro(false)}
                                    open={modalPro}
                                    footer={
                                        <div className="flex items-center justify-center">
                                            <Space direction="vertical">
                                                <Space>
                                                    <div className="text-white pr-3 pb-3 text-2xl leading-8 font-bold">
                                                        Thời gian cấp:
                                                    </div>
                                                    <div className="text-white pb-3 text-2xl leading-8 font-bold">
                                                        {grantTime
                                                            .getHours()
                                                            .toString()
                                                            .padStart(2, "0")}
                                                        :
                                                        {grantTime
                                                            .getMinutes()
                                                            .toString()
                                                            .padStart(
                                                                2,
                                                                "0"
                                                            )}{" "}
                                                        -{" "}
                                                        {grantTime
                                                            .getDate()
                                                            .toString()
                                                            .padStart(2, "0")}
                                                        /
                                                        {(
                                                            grantTime.getMonth() +
                                                            1
                                                        )
                                                            .toString()
                                                            .padStart(2, "0")}
                                                        /
                                                        {grantTime.getFullYear()}
                                                    </div>
                                                </Space>
                                                <Space>
                                                    <div className="text-white pr-3 text-2xl leading-8 font-bold">
                                                        Hạn sử dụng:
                                                    </div>
                                                    <div className="text-white text-2xl leading-8 font-bold">
                                                        {exp
                                                            .getHours()
                                                            .toString()
                                                            .padStart(2, "0")}
                                                        :
                                                        {exp
                                                            .getMinutes()
                                                            .toString()
                                                            .padStart(
                                                                2,
                                                                "0"
                                                            )}{" "}
                                                        -{" "}
                                                        {exp
                                                            .getDate()
                                                            .toString()
                                                            .padStart(2, "0")}
                                                        /
                                                        {(exp.getMonth() + 1)
                                                            .toString()
                                                            .padStart(2, "0")}
                                                        /{exp.getFullYear()}
                                                    </div>
                                                </Space>
                                            </Space>
                                        </div>
                                    }
                                >
                                    <div className="flex flex-col items-center mt-7 mb-5">
                                        <h2 className=" text-4xl font-bold leading-10">
                                            Số thứ tự được cấp
                                        </h2>
                                        <h1 className=" text-6xl font-extrabold leading-10 my-10 mainColor">
                                            43978434
                                        </h1>

                                        <h4 className=" text-lg font-normal leading-7">
                                            DV:{" "}
                                            {dataService.map((item) => {
                                                if (item.id === pro.nameService)
                                                    return item.name;
                                            })}
                                            <strong> ( tại quầy số 1 )</strong>
                                        </h4>
                                    </div>
                                </Modal>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
}

export default AddPro;
