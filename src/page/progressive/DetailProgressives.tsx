import React, { useEffect } from "react";
import { Badge, Breadcrumb, Card, Col, Layout, Row, Space } from "antd";
import { RollbackOutlined } from "@ant-design/icons";

import LeftMenu from "../Components/Leftmenu";
import FixedCard from "../Components/FixedCard";
import Header from "../Components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../store";
import { getProgressiveDetail } from "./redux/progressiveSlice";

const { Content } = Layout;

function DetailProgressive() {
    const dispatch = useDispatch();
    const { id } = useParams<{ id: string }>();
    const progressiveId: string = id || "";

    const data = useSelector((state: RootState) =>
        state.progressive.data.find((r: any) => r.id === progressiveId)
    );
    const services = useSelector((state: RootState) => state.service.data) as {
        id: string;
        name: string;
    }[];
    useEffect(() => {
        dispatch(getProgressiveDetail(id as any) as any);
    }, [dispatch, id]);

    const [pro, setPro] = React.useState<any>({
        ...data,
        nameService: data?.nameService.id,
        grantTime: data?.grantTime?.toDate().toLocaleDateString(),
        exp: data?.exp?.toDate().toLocaleDateString(),
    });
    const nameSV = services.find((r) => r.id === pro?.nameService)?.name;

    const dataL = [
        {
            label: "Họ tên:",
            value: pro?.name,
        },
        {
            label: "Tên dịch vụ:",
            value: nameSV,
        },
        {
            label: "Số thứ tự:",
            value: pro?.stt,
        },

        {
            label: "Thời gian cáp:",
            value: pro?.grantTime,
        },
        {
            label: "Thời gian sử dụng:",
            value: pro?.exp,
        },
    ];

    const dataR = [
        {
            label: "Nguồn cấp:",
            value: pro?.source,
        },
        {
            label: "Trạng thái:",
            value: <Badge status="processing" text={pro?.status} />,
        },
        {
            label: "Số điện thoại:",
            value: pro?.phone,
        },
        {
            label: "Địa chỉ email:",
            value: pro?.email,
        },
    ];

    const renderDataL = dataL.map((item) => (
        <p key={item.label}>
            <span className="me-5 fw-bold">{item.label}</span>
            {item.value}
        </p>
    ));
    const renderDataR = dataR.map((item) => (
        <p key={item.label}>
            <span className="me-5 fw-bold">{item.label}</span>
            {item.value}
        </p>
    ));

    return (
        <div className="flex">
            <LeftMenu />=
            <Layout>
                <Content>
                    <div className="container">
                        <div className="row ">
                            <div className="col ">
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
                                                    style={{ color: "#ff9138" }}
                                                >
                                                    {" "}
                                                    Chi tiết{" "}
                                                </span>
                                            </Breadcrumb.Item>
                                        </Breadcrumb>
                                    }
                                />
                            </div>
                        </div>
                        <div className="pt-5">
                            <h2 style={{ color: "#ff9138" }}>Quản lý cấp số</h2>
                        </div>
                        <div className="row " style={{ width: "90%" }}>
                            <div className="col-10 mt-3">
                                <Card>
                                    <h3
                                        style={{
                                            color: "#ff9138",
                                            margin: "10px 0px",
                                        }}
                                    >
                                        Thông tin cấp số
                                    </h3>
                                    <div className="row">
                                        <div className="col">
                                            <Row>
                                                <Col span={12}>
                                                    <Space direction="vertical">
                                                        {renderDataL}
                                                    </Space>
                                                </Col>
                                                <Col span={12}>
                                                    <Space
                                                        direction="vertical"
                                                        align="start"
                                                    >
                                                        {renderDataR}
                                                    </Space>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                            <div className="col-2 mt-3">
                                <FixedCard
                                    href={"/progressive"}
                                    icon={<RollbackOutlined className="fs-4" />}
                                    title={"Quay lại"}
                                    className={undefined}
                                />
                            </div>
                        </div>
                    </div>
                </Content>
            </Layout>
        </div>
    );
}

export default DetailProgressive;
