import React, { useEffect, useState } from "react";
import { Breadcrumb, DatePicker, Layout, Pagination, Table } from "antd";
import Column from "antd/es/table/Column";
import LeftMenu from "../../Components/Leftmenu";
import Header from "../../Components/Header";
import { CalendarOutlined, CaretRightOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { getUserLog } from "./userLogSlice";
import dayjs from "dayjs";
const { Content } = Layout;

const UserLog = () => {
    const dispatch = useDispatch();
    const userLogs = useSelector((state: RootState) => state.userLog.data);
    useEffect(() => {
        dispatch(getUserLog() as any);
    }, [dispatch]);
    const itemperpage = 10;
    const data = userLogs.map((item: any) => {
        const time = item.time.toDate();
        const formattedTime = `${time
            .getHours()
            .toString()
            .padStart(2, "0")}:${time
            .getMinutes()
            .toString()
            .padStart(2, "0")} - ${time
            .getDate()
            .toString()
            .padStart(2, "0")}/${(time.getMonth() + 1)
            .toString()
            .padStart(2, "0")}/${time.getFullYear()}`;
        return {
            key: item.id,
            userName: item.userName,
            ip: item.ip,
            action: item.action,
            time: formattedTime,
        };
    });
    const [startDate, setStartDate] = useState<any>();
    const [endDate, setEndDate] = useState<any>();

    const handleStartDate = (date: any, dateString: any) =>
        dateString === "" ? setStartDate(null) : setStartDate(dateString);

    const handleEndDate = (date: any, dateString: any) => {
        if (dateString === "") {
            setEndDate(null);
        } else if (startDate && startDate <= dateString) {
            setEndDate(dateString);
        }
    };

    const filteredData = data.filter((item: any) => {
        const siplitTime = item.time.split(" - ")[1];
        const dateMath =
            startDate && endDate
                ? siplitTime >= startDate && siplitTime <= endDate
                : true;
        return dateMath;
    });
    return (
        <div
            className="flex"
            style={{
                height: "100vh",
            }}
        >
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
                                                    Cài đặt hệ thống
                                                </Breadcrumb.Item>
                                                <Breadcrumb.Item>
                                                    <span
                                                        style={{
                                                            color: "#ff9138",
                                                        }}
                                                    >
                                                        Nhật kí hoạt động
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
                                                    format={"DD/MM/YYYY"}
                                                    size="large"
                                                    superNextIcon={false}
                                                    superPrevIcon={false}
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
                                                                  "DD/MM/YYYY"
                                                              )
                                                            : null
                                                    }
                                                />
                                                <CaretRightOutlined
                                                    style={{ color: "#ff9138" }}
                                                />
                                                <DatePicker
                                                    format={"DD/MM/YYYY"}
                                                    size="large"
                                                    superNextIcon={false}
                                                    superPrevIcon={false}
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
                                                                  "DD/MM/YYYY"
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
                                        pagination={false}
                                        bordered
                                        className="mb-3 table-striped"
                                    >
                                        <Column
                                            title={
                                                <span className="table-title">
                                                    Tên đăng nhập
                                                </span>
                                            }
                                            dataIndex="userName"
                                            key="userName"
                                            render={(text: string) => (
                                                <span>{text}</span>
                                            )}
                                        />
                                        <Column
                                            title={
                                                <span className="table-title">
                                                    Thời gian tác động
                                                </span>
                                            }
                                            dataIndex="time"
                                            key="time"
                                            render={(text: string) => (
                                                <span>{text}</span>
                                            )}
                                        />
                                        <Column
                                            title={
                                                <span className="table-title">
                                                    IP thực hiện
                                                </span>
                                            }
                                            dataIndex="ip"
                                            key="ip"
                                            render={(text: string) => (
                                                <span>{text}</span>
                                            )}
                                        />
                                        <Column
                                            title={
                                                <span className="table-title">
                                                    Thao tác thực hiện
                                                </span>
                                            }
                                            dataIndex="action"
                                            key="action"
                                            render={(text: string) => (
                                                <span>{text}</span>
                                            )}
                                        />
                                    </Table>
                                    <Pagination
                                        total={100}
                                        showSizeChanger={false}
                                        style={{ textAlign: "right" }}
                                        pageSize={itemperpage}
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

export default UserLog;
