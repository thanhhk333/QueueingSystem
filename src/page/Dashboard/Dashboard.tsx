import React, { useEffect, useState } from "react";
import { Layout, Space, Tag, Select, Progress, Badge } from "antd";
import {
    CalendarOutlined,
    ArrowUpOutlined,
    CarryOutOutlined,
    ArrowDownOutlined,
    CaretDownOutlined,
    StopOutlined,
    FileSyncOutlined,
    DesktopOutlined,
    CodepenOutlined,
} from "@ant-design/icons";
import LeftMenu from "../Components/Leftmenu";
import Header from "../Components/Header";
import { parseDate } from "@internationalized/date";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { fetchService } from "../service/redux/serviceSilece";

import { Area } from "@ant-design/charts";

import { Row, Col, Card } from "antd";
import { fetchProgressive } from "../progressive/redux/progressiveSlice";
import { fetchDevice } from "../device/redux/deviceSlice";
import { Link } from "react-router-dom";
import { RangeCalendar } from "@adobe/react-spectrum";

import { Calendar } from "@adobe/react-spectrum";
import { start } from "repl";
const { Content } = Layout;

function Dashboard() {
    const dispatch = useDispatch<ThunkDispatch<RootState, null, any>>();
    const listpro = useSelector((state: RootState) => state.progressive.data);
    const services = useSelector((state: RootState) => state.service.data);
    const devices = useSelector((state: RootState) => state.device.data);

    const [selectedOption, setSelectedOption] = React.useState("Ngày");

    function generateListDayInMonthAndWeekInMonth(daysInMonth: number) {
        const listDayInMonth = [];
        const listWeekInMonth = [];

        for (let i = 1; i <= daysInMonth; i++) {
            listDayInMonth.push(i);

            if (i % 7 === 0) {
                const week = Math.ceil(i / 7);
                listWeekInMonth.push(week);
            }
        }

        return { listDayInMonth, listWeekInMonth };
    }

    function generateListMonthInYear() {
        const listMonthInYear = [];

        for (let i = 1; i <= 12; i++) {
            listMonthInYear.push(i);
        }

        return listMonthInYear;
    }

    function countTicketsInDateWeekMonth(listpro: any[], today: Date) {
        const listproInDateCount: Record<string, any> = {};
        const listproInWeekCount: Record<string, any> = {};
        const listproInMonthCount: Record<string, any> = {};

        listpro.forEach((item: any) => {
            const grantTime = item.grantTime.toDate();
            const formattedGrantTime = `${grantTime
                .getDate()
                .toString()
                .padStart(2, "0")}/${(grantTime.getMonth() + 1)
                .toString()
                .padStart(2, "0")}`;

            const date = parseInt(formattedGrantTime.split("/")[0]);
            const month = formattedGrantTime.split("/")[1];
            const year = today.getFullYear();

            const dateMonthYear = `Ngày ${date} Tháng ${month} Năm ${year}`;
            listproInDateCount[dateMonthYear] =
                (listproInDateCount[dateMonthYear] || 0) + 1;

            const week = Math.ceil(date / 7);
            const weekMonthYear = `Tuần ${week} Tháng ${month} Năm ${year}`;
            listproInWeekCount[weekMonthYear] =
                (listproInWeekCount[weekMonthYear] || 0) + 1;

            const monthYear = `Tháng ${month} Năm ${year}`;
            listproInMonthCount[monthYear] =
                (listproInMonthCount[monthYear] || 0) + 1;
        });

        return {
            date: listproInDateCount,
            week: listproInWeekCount,
            month: listproInMonthCount,
        };
    }

    // Sử dụng các hàm trên để thực hiện công việc

    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

    const { listDayInMonth, listWeekInMonth } =
        generateListDayInMonthAndWeekInMonth(daysInMonth);
    const listMonthInYear = generateListMonthInYear();

    const {
        date: listproInDateCount,
        week: listproInWeekCount,
        month: listproInMonthCount,
    } = countTicketsInDateWeekMonth(listpro, today);

    const chartDayData = listDayInMonth.map((item: any) => {
        const date = item.toString().padStart(2, "0");
        return {
            label: `${date}`,
            data:
                listproInDateCount[
                    `Ngày ${date} Tháng ${currentMonth
                        .toString()
                        .padStart(2, "0")} Năm ${currentYear}`
                ] || 0,
        };
    });
    const chartWeekData = listWeekInMonth.map((item: any) => {
        return {
            label: `Tuần ${item}`,
            data:
                listproInWeekCount[
                    `Tuần ${item} Tháng ${currentMonth
                        .toString()
                        .padStart(2, "0")} Năm ${currentYear}`
                ] || 0,
        };
    });
    const chartMonthData = listMonthInYear.map((item: any) => {
        const month = item.toString().padStart(2, "0");

        return {
            label: `Tháng ${month}`,
            data: listproInMonthCount[`Tháng ${month} Năm ${currentYear}`] || 0,
        };
    });

    interface ChartDataItem {
        label: string;
        data: number;
    }
    const filteredChartData: ChartDataItem[] = (() => {
        let data: ChartDataItem[] = [];
        if (selectedOption === "Ngày") {
            data = chartDayData;
        } else if (selectedOption === "Tuần") {
            data = chartWeekData;
        } else if (selectedOption === "Tháng") {
            data = chartMonthData;
        }
        return data;
    })();

    const config = {
        data: filteredChartData,
        autoFit: true,
        xField: "label",
        yField: "data",
        smooth: true,
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        yAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        color: "#6493f9",
    };
    // count Progessive
    const [totalCount, setTotalCount] = useState(0);
    const [totalUsed, setTotalUsed] = useState(0);
    const [totalWaitting, setTotalWaitting] = useState(0);
    const [totalCancel, setTotalCancel] = useState(0);
    useEffect(() => {
        let countTotal = 0;
        let countUsed = 0;
        let countWaitting = 0;
        let countCancel = 0;

        listpro.forEach((item) => {
            countTotal++;
            if (item.status === "Đã sử dụng") {
                countUsed++;
            } else if (item.status === "Đang chờ") {
                countWaitting++;
            } else if (item.status === "Bỏ qua") {
                countCancel++;
            }
        });
        setTotalCount(countTotal);
        setTotalUsed(countUsed);
        setTotalWaitting(countWaitting);
        setTotalCancel(countCancel);
    }, [listpro]);

    // count service
    const [totalService, setTotalService] = useState(0);
    const [serviceActive, setServiceActive] = useState(0);
    const [serviceDeactive, setServiceDeactive] = useState(0);

    useEffect(() => {
        let countTotal = 0;
        let countActive = 0;
        let countDeactive = 0;

        services.forEach((item) => {
            countTotal++;
            if (item.status === "Hoạt động") {
                countActive++;
            } else if (item.status === "Ngưng hoạt động") {
                countDeactive++;
            }
        });
        setTotalService(countTotal);
        setServiceActive(countActive);
        setServiceDeactive(countDeactive);
    }, [services]);

    // count device
    const [totalDevice, setTotalDevice] = useState(0);
    const [deviceActive, setDeviceActive] = useState(0);
    const [deviceDeactive, setDeviceDeactive] = useState(0);

    useEffect(() => {
        let countTotal = 0;
        let countActive = 0;
        let countDeactive = 0;

        devices.forEach((item) => {
            countTotal++;
            if (item.status === "Hoạt động") {
                countActive++;
            } else if (item.status === "Ngưng hoạt động") {
                countDeactive++;
            }
        });
        setTotalDevice(countTotal);
        setDeviceActive(countActive);
        setDeviceDeactive(countDeactive);
    }, [devices]);
    useEffect(() => {
        dispatch(fetchService());
        dispatch(fetchDevice());
        dispatch(fetchProgressive());
    }, [dispatch]);

    const dates = `${new Date().getFullYear().toString()}-${(
        new Date().getMonth() + 1
    )
        .toString()
        .padStart(2, "0")}-${new Date().getDate().toString().padStart(2, "0")}`;

    const [date, setDate] = React.useState({
        start: parseDate(dates),
        end: parseDate(dates),
    });
    return (
        <div className="flex h-full">
            <LeftMenu />

            <Layout>
                <Content>
                    <Row className="h-full w-full">
                        <Col span={16}>
                            <Row className="mx-3 flex flex-col">
                                <p className="fw-bold my-8 mainColor text-xl">
                                    Dashboard
                                </p>
                                <p className="fw-bold mb-4 mainColor text-2xl">
                                    Biểu đồ cấp số
                                </p>
                            </Row>
                            <Row className="mx-3">
                                <Col span={6}>
                                    <Card className="shadow-md rounded-xl">
                                        <Space>
                                            <CalendarOutlined className="icon-center bg-[#e8effe] text-[#6493f9]" />
                                            <p className="font-bold leading-5 text-sm ">
                                                Số thứ tự đã cấp
                                            </p>
                                        </Space>
                                        <Space className="mt-4 flex justify-between">
                                            <p className="font-bold  text-3xl">
                                                {totalCount}
                                            </p>
                                            <Tag
                                                className=" mainColor border-none rounded-lg text-[8px]"
                                                style={{
                                                    backgroundColor: "#ffefda",
                                                }}
                                            >
                                                <ArrowUpOutlined />
                                                32.41 %
                                            </Tag>
                                        </Space>
                                    </Card>
                                </Col>
                                <Col span={6}>
                                    <Card className="ms-2 shadow-md rounded-xl">
                                        <Space>
                                            <CarryOutOutlined className="icon-center bg-[#e1f7e6] text-[#35C75A]" />
                                            <p className="font-bold leading-5 text-sm w-[80px]">
                                                Số thứ tự đã sử dụng
                                            </p>
                                        </Space>
                                        <Space className="mt-4 flex justify-between">
                                            <p className="font-bold text-3xl ">
                                                {totalUsed}
                                            </p>
                                            <Tag
                                                className=" mainColor border-none rounded-lg text-[8px]"
                                                style={{
                                                    backgroundColor: "#ffefda",
                                                }}
                                            >
                                                <ArrowDownOutlined />
                                                32.41 %
                                            </Tag>
                                        </Space>
                                    </Card>
                                </Col>
                                <Col span={6}>
                                    <Card className="mx-2 shadow-md rounded-xl">
                                        <Space>
                                            <FileSyncOutlined className="icon-center bg-[#ffefda] mainColor" />
                                            <p className="font-bold leading-5 text-sm w-[80px]">
                                                Số thứ tự đang chờ
                                            </p>
                                        </Space>
                                        <Space className="mt-4 flex justify-between">
                                            <p className="font-bold text-3xl ">
                                                {totalWaitting}
                                            </p>
                                            <Tag
                                                className=" mainColor border-none rounded-lg text-[8px]"
                                                style={{
                                                    backgroundColor: "#ffefda",
                                                }}
                                            >
                                                <ArrowUpOutlined />
                                                56.41 %
                                            </Tag>
                                        </Space>
                                    </Card>
                                </Col>
                                <Col span={6}>
                                    <Card className="shadow-md rounded-xl">
                                        <Space>
                                            <StopOutlined className="icon-center bg-[#fbe2e1] text-[#F86D6D]" />
                                            <p className="font-bold leading-5 text-sm w-[80px]">
                                                Số thứ tự đã bỏ qua
                                            </p>
                                        </Space>
                                        <Space className="mt-4 flex justify-between">
                                            <p className="font-bold text-3xl ">
                                                {totalCancel}
                                            </p>
                                            <Tag
                                                className=" mainColor border-none rounded-lg text-[8px]"
                                                style={{
                                                    backgroundColor: "#ffefda",
                                                }}
                                            >
                                                <ArrowDownOutlined />
                                                23.41 %
                                            </Tag>
                                        </Space>
                                    </Card>
                                </Col>
                            </Row>
                            <Row className="w-full mt-8">
                                <Card className=" shadow-md w-full p-0">
                                    <Space
                                        direction="horizontal"
                                        align="center"
                                        className="flex justify-between w-full"
                                    >
                                        <div>
                                            <Space
                                                direction="vertical"
                                                size={8}
                                            >
                                                <h1 className=" fw-bold">
                                                    Bảng thống kê theo
                                                    <span className=" ms-2 fw-bold text-md font-light">
                                                        {selectedOption}
                                                    </span>
                                                </h1>
                                                <p className="text-sm">
                                                    Tháng 07/2023
                                                </p>
                                            </Space>
                                        </div>

                                        <div>
                                            <Space direction="horizontal">
                                                <p className="text-base font-light">
                                                    Xem theo
                                                </p>
                                                <Select
                                                    size="large"
                                                    defaultValue="Ngày"
                                                    suffixIcon={
                                                        <CaretDownOutlined className="mainColor" />
                                                    }
                                                    options={[
                                                        {
                                                            value: "Ngày",
                                                            label: "Ngày",
                                                        },
                                                        {
                                                            value: "Tuần",
                                                            label: "Tuần",
                                                        },
                                                        {
                                                            value: "Tháng",
                                                            label: "Tháng",
                                                        },
                                                    ]}
                                                    onChange={(value) =>
                                                        setSelectedOption(value)
                                                    }
                                                />
                                            </Space>
                                        </div>
                                    </Space>
                                    <div className="mt-6">
                                        <Area {...config} />
                                    </div>
                                </Card>
                            </Row>
                        </Col>
                        <Col span={8} className="bg-white">
                            <div className="w-[90%] h-full mx-4">
                                <Row>
                                    <Header headerContent={<></>} />
                                </Row>
                                <p className="mainColor text-3xl fw-bold my-3">
                                    Tổng quan
                                </p>
                                <Link to="/device">
                                    <Row className="mt-4">
                                        <div className="flex items-center justify-center w-full ">
                                            <Card className="shadow-xl w-full">
                                                <Row align="middle">
                                                    <Col
                                                        span={5}
                                                        className="relative flex justify-center items-center h-full"
                                                    >
                                                        <Progress
                                                            type="circle"
                                                            strokeColor={
                                                                "#FF7506"
                                                            }
                                                            percent={Math.floor(
                                                                (deviceActive *
                                                                    100) /
                                                                    totalDevice
                                                            )}
                                                            size={70}
                                                        />

                                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                            <Progress
                                                                type="circle"
                                                                showInfo={false}
                                                                strokeColor={
                                                                    "#7E7D88"
                                                                }
                                                                percent={Math.floor(
                                                                    (deviceDeactive *
                                                                        100) /
                                                                        totalDevice
                                                                )}
                                                                size={50}
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col span={7}>
                                                        <Space
                                                            direction="vertical"
                                                            className="ml-3"
                                                        >
                                                            <p className="font-bold leading-4 text-4xl">
                                                                {totalDevice}
                                                            </p>
                                                            <Space align="center">
                                                                <DesktopOutlined className="mainColor font-bold" />
                                                                <p className="mainColor mt-2">
                                                                    Thiết bị
                                                                </p>
                                                            </Space>
                                                        </Space>
                                                    </Col>
                                                    <Col span={11}>
                                                        <Space direction="vertical">
                                                            <Badge
                                                                color="#FFAC6A"
                                                                text="Đang hoạt động"
                                                            />
                                                            <Badge
                                                                color="gray"
                                                                text="Ngừng hoạt động"
                                                            />
                                                        </Space>
                                                    </Col>
                                                    <Col span={1}>
                                                        <Space direction="vertical">
                                                            <p>
                                                                {deviceActive}
                                                            </p>
                                                            <p>
                                                                {deviceDeactive}
                                                            </p>
                                                        </Space>
                                                    </Col>
                                                </Row>
                                            </Card>
                                        </div>
                                    </Row>
                                </Link>
                                <Link to="/services">
                                    <Row className="mt-4">
                                        <div className="flex items-center justify-center w-full ">
                                            <Card className="shadow-xl w-full">
                                                <Row align="middle">
                                                    <Col
                                                        span={5}
                                                        className="relative flex justify-center items-center h-full"
                                                    >
                                                        <Progress
                                                            type="circle"
                                                            strokeColor={
                                                                "4277FF"
                                                            }
                                                            percent={Math.floor(
                                                                (serviceActive *
                                                                    100) /
                                                                    totalService
                                                            )}
                                                            size={70}
                                                        />

                                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                            <Progress
                                                                type="circle"
                                                                showInfo={false}
                                                                strokeColor={
                                                                    "#7E7D88"
                                                                }
                                                                percent={Math.floor(
                                                                    (serviceDeactive *
                                                                        100) /
                                                                        totalService
                                                                )}
                                                                size={50}
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col span={7}>
                                                        <Space
                                                            direction="vertical"
                                                            className="ml-3"
                                                        >
                                                            <p className="font-bold leading-4 text-4xl">
                                                                {totalService}
                                                            </p>
                                                            <Space
                                                                align="center"
                                                                className="text-[#4277FF]"
                                                            >
                                                                <DesktopOutlined className=" font-bold" />
                                                                <p className=" mt-2">
                                                                    Dịch vụ
                                                                </p>
                                                            </Space>
                                                        </Space>
                                                    </Col>
                                                    <Col span={11}>
                                                        <Space direction="vertical">
                                                            <Badge
                                                                color="#4277FF"
                                                                text="Đang hoạt động"
                                                            />
                                                            <Badge
                                                                color="gray"
                                                                text="Ngừng hoạt động"
                                                            />
                                                        </Space>
                                                    </Col>
                                                    <Col span={1}>
                                                        <Space direction="vertical">
                                                            <p>
                                                                {serviceActive}
                                                            </p>
                                                            <p>
                                                                {
                                                                    serviceDeactive
                                                                }
                                                            </p>
                                                        </Space>
                                                    </Col>
                                                </Row>
                                            </Card>
                                        </div>
                                    </Row>
                                </Link>
                                <Link to="/progressive">
                                    <Row className="mt-4">
                                        <div className="flex items-center justify-center w-full ">
                                            <Card className="shadow-xl w-full">
                                                <Row align="middle">
                                                    <Col
                                                        span={5}
                                                        className="relative flex justify-center items-center h-full"
                                                    >
                                                        <Progress
                                                            type="circle"
                                                            strokeColor={
                                                                "#35C75A"
                                                            }
                                                            percent={Math.floor(
                                                                (totalWaitting *
                                                                    100) /
                                                                    totalCount
                                                            )}
                                                            size={70}
                                                        />

                                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                            <Progress
                                                                type="circle"
                                                                showInfo={false}
                                                                strokeColor={
                                                                    "gray"
                                                                }
                                                                percent={Math.floor(
                                                                    (totalUsed *
                                                                        100) /
                                                                        totalCount
                                                                )}
                                                                size={55}
                                                            />
                                                        </div>
                                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                            <Progress
                                                                type="circle"
                                                                showInfo={false}
                                                                strokeColor={
                                                                    "#FF7506"
                                                                }
                                                                percent={Math.floor(
                                                                    (totalCancel *
                                                                        100) /
                                                                        totalCount
                                                                )}
                                                                size={40}
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col span={7}>
                                                        <Space
                                                            direction="vertical"
                                                            className="ml-3"
                                                        >
                                                            <p className="font-bold leading-4 text-4xl">
                                                                {totalCount}
                                                            </p>
                                                            <Space
                                                                align="center"
                                                                className="text-[#35C75A]"
                                                            >
                                                                <CodepenOutlined className=" font-bold" />
                                                                <p className=" mt-2">
                                                                    Cấp số
                                                                </p>
                                                            </Space>
                                                        </Space>
                                                    </Col>
                                                    <Col span={11}>
                                                        <Space direction="vertical">
                                                            <Badge
                                                                color="#35C75A"
                                                                text="Đang chờ"
                                                            />
                                                            <Badge
                                                                color="gray"
                                                                text="Đã sử dụng"
                                                            />
                                                            <Badge
                                                                color="#FF7506"
                                                                text="Bỏ qua"
                                                            />
                                                        </Space>
                                                    </Col>
                                                    <Col span={1}>
                                                        <Space direction="vertical">
                                                            <p>
                                                                {totalWaitting}
                                                            </p>
                                                            <p>{totalUsed}</p>
                                                            <p>{totalCancel}</p>
                                                        </Space>
                                                    </Col>
                                                </Row>
                                            </Card>
                                        </div>
                                    </Row>
                                </Link>

                                <Row className="w-full flex items-center justify-center mt-5">
                                    <RangeCalendar
                                        aria-label="Date (controlled)"
                                        value={date}
                                        onChange={setDate}
                                    />
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </div>
    );
}

export default Dashboard;
