import React, { useEffect } from "react";
import { Breadcrumb, Card, Layout, Space, Row, Col } from "antd";
import { EditFilled } from "@ant-design/icons";

import LeftMenu from "../Components/Leftmenu";
import Header from "../Components/Header";

import FixedCard from "../Components/FixedCard";
import { RootState } from "../../store";
import { getDeviceDetail } from "./redux/deviceSlice";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const { Content } = Layout;

const DetaiDevice: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const deviceId: string = id || ""; // Set a default value of an empty string if id is undefined

    const device = useSelector((state: RootState) =>
        state.device.data.find((r: any) => r.id === deviceId)
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDeviceDetail(id as any) as any);
    }, [dispatch, id]);
    console.log(device);
    return (
        <div className="d-flex">
            <LeftMenu />
            <Layout>
                <Layout>
                    <Content>
                        <div className="container">
                            <div className="row mt-2">
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
                                                    Chi tiết thiết bị
                                                </span>
                                            </Breadcrumb.Item>
                                        </Breadcrumb>
                                    }
                                />
                            </div>
                            <div className="pt-5">
                                <h4 style={{ color: "#ff9138" }}>
                                    Quản lý thiết bị
                                </h4>
                            </div>
                            <div className="row">
                                <div className="col-10 mt-3">
                                    <Card style={{ width: 1050 }}>
                                        <h6
                                            style={{
                                                color: "#ff9138",
                                                fontSize: "20px",
                                                marginBottom: "20px",
                                            }}
                                        >
                                            Thông tin thiết bị
                                        </h6>
                                        <div className="row">
                                            <div className="col">
                                                <Row>
                                                    <Col span={12}>
                                                        <Space direction="vertical">
                                                            <p>
                                                                <span className="fw-bold">
                                                                    Mã thiết bị:
                                                                </span>
                                                                {
                                                                    device?.idDevice
                                                                }
                                                            </p>
                                                            <p>
                                                                <span className="fw-bold">
                                                                    Tên thiết
                                                                    bị:
                                                                </span>{" "}
                                                                {device?.name}
                                                            </p>
                                                            <p>
                                                                <span className="fw-bold">
                                                                    Địa chỉ IP:
                                                                </span>{" "}
                                                                {
                                                                    device?.IpAddress
                                                                }
                                                            </p>
                                                        </Space>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Space direction="vertical">
                                                            <p>
                                                                <span className="fw-bold">
                                                                    Loại thiết
                                                                    bị:
                                                                </span>{" "}
                                                                {device?.type}
                                                            </p>
                                                            <p>
                                                                <span className="fw-bold">
                                                                    Tên đăng
                                                                    nhập:
                                                                </span>{" "}
                                                                {
                                                                    device?.userName
                                                                }
                                                            </p>
                                                            <p>
                                                                <span className="fw-bold">
                                                                    Mật khẩu:
                                                                </span>{" "}
                                                                {
                                                                    device?.password
                                                                }
                                                            </p>
                                                        </Space>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <div className="col-12">
                                                <p className="fw-bold">
                                                    Dịch vụ sử dụng:
                                                </p>
                                                <span>{device?.service}</span>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                                <div className="col-2 mt-3">
                                    <FixedCard
                                        href={`/updateDivice/${id}`}
                                        title={"Cập nhật"}
                                        icon={<EditFilled />}
                                        className={undefined}
                                    />
                                </div>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
};

export default DetaiDevice;
