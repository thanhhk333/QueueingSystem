/* eslint-disable @typescript-eslint/indent */
import React, { useEffect } from "react";
import {
    Badge,
    Breadcrumb,
    Button,
    Card,
    Col,
    DatePicker,
    Dropdown,
    Form,
    Input,
    Layout,
    MenuProps,
    Pagination,
    Row,
    Space,
    Table,
} from "antd";
import {
    CalendarOutlined,
    CaretDownOutlined,
    CaretRightFilled,
    SearchOutlined,
} from "@ant-design/icons";

import Column from "antd/es/table/Column";
import LeftMenu from "../Components/Leftmenu";
import Header from "../Components/Header";
import DoubleFixedCard from "../Components/DoubleFixedCard";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getServiceDetail } from "./redux/serviceSilece";
import { RootState } from "../../store";
const { Content } = Layout;
const items: MenuProps["items"] = [
    {
        label: "Tất cả",
        key: "1",
    },
    {
        label: "Đã hoạt động",
        key: "2",
    },
    {
        label: "Ngưng hoạt động",
        key: "3",
    },
    {
        label: "vắng",
        key: "4",
    },
];

const menuProps = {
    items,
};

const data = [
    { id: 1, isActive: true, isAbsent: false },
    { id: 2, isActive: false, isAbsent: false },
    { id: 3, isActive: false, isAbsent: true },
    { id: 4, isActive: true, isAbsent: false },
    { id: 5, isActive: true, isAbsent: false },
    { id: 6, isActive: false, isAbsent: true },
];
const DetailService: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const serviceId: string = id || ""; // Set a default value of an empty string if id is undefined

    const service = useSelector((state: RootState) =>
        state.service.data.find((r: any) => r.id === serviceId)
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getServiceDetail(id as any) as any);
    }, [dispatch, id]);

    console.log(service);
    return (
        <div className="flex">
            <LeftMenu />

            <Layout>
                <Content>
                    <div className="container">
                        <div className="row ">
                            <div className="col ">
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
                                                    Chi tiết
                                                </span>
                                            </Breadcrumb.Item>
                                        </Breadcrumb>
                                    }
                                />
                            </div>
                        </div>
                        <div className="pt-5">
                            <h2 style={{ color: "#ff9138" }}>
                                Quản lý dịch vụ
                            </h2>
                        </div>
                        <div className="row mt-3">
                            <div className="col-4 mt-3">
                                <Card style={{ height: 530 }}>
                                    <h3 style={{ color: "#ff9138" }}>
                                        Thông tin dịch vụ
                                    </h3>
                                    <Form className="mt-3">
                                        <Space
                                            direction="vertical"
                                            className="custom-space"
                                        >
                                            <div>
                                                <label className="fw-bold">
                                                    Mã dịch vụ:
                                                </label>
                                                <label className="ms-3">
                                                    <small>
                                                        {service?.idService}
                                                    </small>
                                                </label>
                                            </div>
                                            <div>
                                                <label className="fw-bold">
                                                    Tên dịch vụ:
                                                </label>
                                                <label className="ms-3">
                                                    <small>
                                                        {service?.name}
                                                    </small>
                                                </label>
                                            </div>
                                            <div>
                                                <label className="fw-bold">
                                                    Mô tả:
                                                </label>
                                                <label className="ms-3">
                                                    <small>
                                                        {service?.description}
                                                    </small>
                                                </label>
                                            </div>
                                        </Space>
                                    </Form>
                                    <h3 style={{ color: "#ff9138" }}>
                                        Quy tắc cấp số
                                    </h3>

                                    <Row>
                                        <Col span={24}>
                                            <Space
                                                direction="horizontal"
                                                align="center"
                                                style={{ marginBottom: 5 }}
                                            >
                                                <label className="fw-bold">
                                                    Tăng tự động
                                                </label>
                                                <Input
                                                    value="0001"
                                                    style={{ width: "60px" }}
                                                />
                                                <p className="mx-2">đến</p>
                                                <Input
                                                    value="0009"
                                                    style={{ width: "60px" }}
                                                />
                                            </Space>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={24}>
                                            <Space
                                                direction="horizontal"
                                                style={{ marginBottom: 5 }}
                                            >
                                                <label className="fw-bold">
                                                    Prefix
                                                </label>
                                                <Input
                                                    value="0001"
                                                    style={{
                                                        width: "60px",
                                                        marginLeft: "46px",
                                                    }}
                                                />
                                            </Space>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={24}>
                                            <Space
                                                direction="horizontal"
                                                style={{ marginBottom: 5 }}
                                            >
                                                <label className="fw-bold">
                                                    Reset mỗi ngày
                                                </label>
                                            </Space>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={24}>
                                            <Space
                                                direction="horizontal"
                                                style={{ marginBottom: 5 }}
                                            >
                                                <label>
                                                    <small>
                                                        Ví dụ: 201-2001
                                                    </small>
                                                </label>
                                            </Space>
                                        </Col>
                                    </Row>
                                </Card>
                            </div>
                            <div className="col-7 mt-3">
                                <Card style={{ height: 530 }}>
                                    <div className="row">
                                        <div className="col-3">
                                            <div className="row">
                                                <div className="col-12">
                                                    <label className="fw-bold">
                                                        Trạng thái
                                                    </label>
                                                </div>
                                                <div className="col-12">
                                                    <Dropdown menu={menuProps}>
                                                        <Button
                                                            style={{
                                                                width: "100%",
                                                                background:
                                                                    "#fff",
                                                                border: "1px solid rgba(212, 212, 215, 1)",
                                                                fontSize:
                                                                    "14px",
                                                                lineHeight:
                                                                    "16px",
                                                                padding:
                                                                    "10px, 12px, 10px, 12px",
                                                                color: "black",
                                                                borderRadius:
                                                                    "8px",
                                                            }}
                                                            size="large"
                                                        >
                                                            <Space className="flex justify-between mx-1">
                                                                Tất cả
                                                                <CaretDownOutlined
                                                                    style={{
                                                                        color: "#ff9138",
                                                                    }}
                                                                />
                                                            </Space>
                                                        </Button>
                                                    </Dropdown>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-5 ">
                                            <div className="row">
                                                <div className="col-12">
                                                    <label className="fw-bold">
                                                        Chọn thời gian
                                                    </label>
                                                </div>
                                                <div className=" flex  items-center">
                                                    <DatePicker
                                                        suffixIcon={
                                                            <CalendarOutlined
                                                                style={{
                                                                    color: "#ff9138",
                                                                }}
                                                            />
                                                        }
                                                        size="large"
                                                    />
                                                    <CaretRightFilled
                                                        style={{
                                                            color: "#ff9138",
                                                            marginLeft: "5px",
                                                        }}
                                                    />

                                                    <DatePicker
                                                        suffixIcon={
                                                            <CalendarOutlined
                                                                style={{
                                                                    color: "#ff9138",
                                                                }}
                                                            />
                                                        }
                                                        size="large"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-4">
                                            <div className="row">
                                                <div className="col-12">
                                                    <label className="fw-bold">
                                                        Từ khóa
                                                    </label>
                                                </div>
                                                <div className="col-12">
                                                    <Input
                                                        size="large"
                                                        placeholder="nhập từ khóa"
                                                        suffix={
                                                            <SearchOutlined
                                                                style={{
                                                                    marginLeft:
                                                                        "8px",
                                                                    color: "#ff9138",
                                                                }}
                                                            />
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <Table
                                            dataSource={data}
                                            pagination={false}
                                            size="small"
                                            className="custom-table mb-4 pb-3 table-striped"
                                        >
                                            <Column
                                                title={
                                                    <span className="table-title">
                                                        Số thứ tự
                                                    </span>
                                                }
                                                dataIndex="id"
                                                key="id"
                                                render={(text: string) => (
                                                    <span>{text}</span>
                                                )}
                                            />
                                            <Column
                                                title={
                                                    <span className="table-title">
                                                        Trạng thái
                                                    </span>
                                                }
                                                dataIndex="isActive"
                                                key="isActive"
                                                render={(
                                                    isActive: boolean,
                                                    record: any
                                                ) => (
                                                    <Badge
                                                        color={
                                                            record.isAbsent
                                                                ? "#FF6A6A"
                                                                : "#4277FF"
                                                        }
                                                        text={
                                                            record.isAbsent
                                                                ? "Vắng"
                                                                : isActive
                                                                ? "Đã hoàn thành"
                                                                : "Đang thực hiện"
                                                        }
                                                    />
                                                )}
                                            />
                                        </Table>
                                    </div>
                                    <Pagination
                                        total={100}
                                        showSizeChanger={false}
                                        style={{ textAlign: "right" }}
                                    />
                                </Card>
                            </div>
                            <div className="col-1">
                                <DoubleFixedCard href1={"fd"} href2={"df"} />
                            </div>
                        </div>
                    </div>
                </Content>
            </Layout>
        </div>
    );
};

export default DetailService;
