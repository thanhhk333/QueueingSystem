import React, { useEffect, useState } from "react";
import { Badge, Breadcrumb, DatePicker, Layout, Pagination, Table } from "antd";
import Column from "antd/es/table/Column";
import LeftMenu from "../Components/Leftmenu";
import Header from "../Components/Header";
import {
    CalendarOutlined,
    RightOutlined,
    LeftOutlined,
    CaretRightOutlined,
    VerticalAlignBottomOutlined,
} from "@ant-design/icons";
import FixedCard from "../Components/FixedCard";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { fetchProgressive } from "../progressive/redux/progressiveSlice";
import { fetchService } from "../service/redux/serviceSilece";
import dayjs from "dayjs";
import tableExport from "antd-table-export";
const { Content } = Layout;

function ListReport() {
    const getStatusBadgeProps = (status: string) => {
        switch (status) {
            case "Đang chờ":
                return { status: "processing" as const, text: "Đang chờ" };
            case "Bỏ qua":
                return { status: "error" as const, text: "Bỏ qua" };
            case "Đã sử dụng":
                return { status: "default" as const, text: "Đã sử dụng" };
            default:
                return { status: "default" as const, text: "" };
        }
    };

    const dispatch = useDispatch<ThunkDispatch<RootState, null, any>>();
    const listpro = useSelector((state: RootState) => state.progressive.data);
    const services = useSelector((state: RootState) => state.service.data) as {
        id: string;
        name: string;
    }[];

    useEffect(() => {
        dispatch(fetchProgressive());
        dispatch(fetchService());
    }, [dispatch]);

    const data = listpro.map((item: any) => {
        const exp = item.exp.toDate();
        const grantTime = item.grantTime.toDate();

        const formatedExp = `${exp.getHours().toString().padStart(2, "0")}:${exp
            .getMinutes()
            .toString()
            .padStart(2, "0")} - ${exp
            .getDate()
            .toString()
            .padStart(2, "0")}/${(exp.getMonth() + 1)
            .toString()
            .padStart(2, "0")}/${exp.getFullYear()}`;

        const formatedGrantTime = `${grantTime
            .getHours()
            .toString()
            .padStart(2, "0")}:${grantTime
            .getMinutes()
            .toString()
            .padStart(2, "0")} - ${grantTime
            .getDate()
            .toString()
            .padStart(2, "0")}/${(grantTime.getMonth() + 1)
            .toString()
            .padStart(2, "0")}/${grantTime.getFullYear()}`;
        return {
            ...item,
            nameService: item.nameService.id,
            exp: formatedExp,
            grantTime: formatedGrantTime,
        };
    });
    const [startDate, setStartDate] = useState<any>();
    const [endDate, setEndDate] = useState<any>();

    const handleStartDate = (date: any, dateString: any) =>
        dateString === "" ? setStartDate(null) : setStartDate(dateString);

    const handleEndDate = (date: any, dateString: any) => {
        if (dateString === "") {
            setEndDate(null);
        } else if (startDate && startDate < dateString) {
            setEndDate(dateString);
        }
    };

    const filteredData = data.filter((item: any) => {
        const dateStrng = item.grantTime.split(" - ")[1];

        let dateMath = startDate
            ? endDate
                ? dateStrng >= startDate && dateStrng <= endDate
                : dateStrng >= startDate
            : true;
        return dateMath;
    });
    const columns = [
        {
            title: "Tên dịch vụ",
            dataIndex: "nameService",
            key: "nameService",
        },
        {
            title: "Thời gian cấp",
            dataIndex: "grantTime",
            key: "grantTime",
        },
        {
            title: "Thời gian hết hạn",
            dataIndex: "exp",
            key: "exp",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Nguồn cấp",
            dataIndex: "source",
            key: "source",
        },
    ];

    const handleExport = () => {
        const exportInstance = new tableExport(filteredData, columns);
        exportInstance.download("xlsx", "Báo cáo");
    };

    return (
        <div className="flex">
            <LeftMenu />

            <Layout className="layout">
                <Layout>
                    <Content>
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <Header
                                        headerContent={
                                            <Breadcrumb className="custom-breadcrumb">
                                                <Breadcrumb.Item>
                                                    Báo cáo
                                                </Breadcrumb.Item>
                                                <Breadcrumb.Item>
                                                    <span
                                                        style={{
                                                            color: "#ff9138",
                                                        }}
                                                    >
                                                        Danh sách báo cáo
                                                    </span>
                                                </Breadcrumb.Item>
                                            </Breadcrumb>
                                        }
                                    />
                                </div>
                            </div>
                            <div className="row mt-3 justify-content-center">
                                <div className="col text-start">
                                    <div className="row">
                                        <div className="col-4 flex flex-col">
                                            <p className="fw-bold">
                                                Chọn thời gian
                                            </p>
                                            <div className="time flex items-center">
                                                <DatePicker
                                                    size="large"
                                                    format="DD/MM/YYYY"
                                                    nextIcon={
                                                        <RightOutlined className="mainColor" />
                                                    }
                                                    prevIcon={
                                                        <LeftOutlined className="mainColor" />
                                                    }
                                                    superNextIcon={null}
                                                    superPrevIcon={null}
                                                    suffixIcon={
                                                        <CalendarOutlined
                                                            style={{
                                                                color: "#ff9138",
                                                            }}
                                                        />
                                                    }
                                                    onChange={handleStartDate}
                                                    value={
                                                        startDate
                                                            ? dayjs(
                                                                  startDate,
                                                                  "DD-MM-YYYY"
                                                              )
                                                            : null
                                                    }
                                                />
                                                <CaretRightOutlined
                                                    style={{ color: "#ff9138" }}
                                                />
                                                <DatePicker
                                                    format="DD/MM/YYYY"
                                                    nextIcon={
                                                        <RightOutlined className="mainColor" />
                                                    }
                                                    prevIcon={
                                                        <LeftOutlined className="mainColor" />
                                                    }
                                                    superNextIcon={null}
                                                    superPrevIcon={null}
                                                    size="large"
                                                    suffixIcon={
                                                        <CalendarOutlined
                                                            style={{
                                                                color: "#ff9138",
                                                            }}
                                                        />
                                                    }
                                                    onChange={handleEndDate}
                                                    value={
                                                        endDate
                                                            ? dayjs(
                                                                  endDate,
                                                                  "DD-MM-YYYY"
                                                              )
                                                            : null
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-11 mt-3">
                                    <Table
                                        dataSource={filteredData}
                                        pagination={{
                                            pageSize: 7,
                                            total: filteredData.length,
                                            showSizeChanger: false,
                                        }}
                                        bordered
                                        className="mb-3 table-striped"
                                    >
                                        <Column
                                            title={
                                                <span className="table-title">
                                                    Số thứ tự
                                                </span>
                                            }
                                            dataIndex="stt"
                                            key="stt"
                                            sorter={(
                                                a: { id: string },
                                                b: { id: string }
                                            ) => a.id.localeCompare(b.id)}
                                            sortDirections={[
                                                "ascend",
                                                "descend",
                                            ]}
                                            render={(text: string) => (
                                                <span>{text}</span>
                                            )}
                                        />
                                        <Column
                                            title={
                                                <span className="table-title">
                                                    Tên dịch vụ
                                                </span>
                                            }
                                            dataIndex="nameService"
                                            key="nameService"
                                            sorter={(
                                                a: { name: string },
                                                b: { name: string }
                                            ) => a.name.localeCompare(b.name)}
                                            sortDirections={[
                                                "ascend",
                                                "descend",
                                            ]}
                                            render={(nameService: string) => {
                                                const serviceData =
                                                    services.find(
                                                        (item) =>
                                                            item.id ===
                                                            nameService
                                                    );
                                                return (
                                                    <span>
                                                        {serviceData?.name}
                                                    </span>
                                                );
                                            }}
                                        />
                                        <Column
                                            title={
                                                <span className="table-title">
                                                    Thời gian cấp
                                                </span>
                                            }
                                            dataIndex="grantTime"
                                            key="grantTime"
                                            sorter={(
                                                a: { time: string },
                                                b: { time: string }
                                            ) => a.time.localeCompare(b.time)}
                                            sortDirections={[
                                                "ascend",
                                                "descend",
                                            ]}
                                            render={(text: string) => (
                                                <span>{text}</span>
                                            )}
                                        />
                                        <Column
                                            title={
                                                <span className="table-title">
                                                    Tình trạng
                                                </span>
                                            }
                                            dataIndex="status"
                                            key="status"
                                            sorter={(
                                                a: { status: boolean },
                                                b: { status: boolean }
                                            ) => (a.status ? -1 : 1)}
                                            sortDirections={[
                                                "descend",
                                                "ascend",
                                            ]}
                                            render={(status: string) => (
                                                <Badge
                                                    {...getStatusBadgeProps(
                                                        status
                                                    )}
                                                />
                                            )}
                                        />
                                        <Column
                                            title={
                                                <span className="table-title">
                                                    Nguồn cấp
                                                </span>
                                            }
                                            dataIndex="srouce"
                                            key="srouce"
                                            sorter={(
                                                a: { srouce: string },
                                                b: { srouce: string }
                                            ) =>
                                                a.srouce.localeCompare(b.srouce)
                                            }
                                            sortDirections={[
                                                "ascend",
                                                "descend",
                                            ]}
                                            render={(text: string) => (
                                                <span>Hệ thống</span>
                                            )}
                                        />
                                    </Table>
                                </div>
                                <div className="col-1 mt-3">
                                    <FixedCard
                                        onClick={handleExport}
                                        href={""}
                                        icon={
                                            <VerticalAlignBottomOutlined className="fw-bold fs-1" />
                                        }
                                        title={"tải về"}
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
}

export default ListReport;
