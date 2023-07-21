import React, { useEffect, useState } from "react";
import {
    Badge,
    Breadcrumb,
    Button,
    DatePicker,
    Dropdown,
    Input,
    Layout,
    Pagination,
    Select,
    Space,
    Table,
} from "antd";
import {
    CalendarOutlined,
    CaretDownOutlined,
    CaretRightOutlined,
    PlusSquareFilled,
    RightOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import Column from "antd/es/table/Column";
import { Link } from "react-router-dom";
import LeftMenu from "../Components/Leftmenu";
import Header from "../Components/Header";

import FixedCard from "../Components/FixedCard";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Root } from "postcss";
import { RootState } from "../../store";
import { fetchProgressive } from "./redux/progressiveSlice";
import { fetchService } from "../service/redux/serviceSilece";
import firebase from "firebase/compat/app";
import { start } from "repl";
import dayjs from "dayjs";
const { Content } = Layout;

function ListProgressives() {
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
    const [source, setSource] = useState("Tất cả");
    const [service, setService] = useState("Tất cả");
    const [status, setStatus] = useState("Tất cả");

    const [searchString, setSearchString] = useState("");
    const handleSearch = (e: any) => {
        setSearchString(e.target.value);
    };
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

    const nameSvs = listpro.map((item) => {
        const nameRole = services.find(
            (name) => item.nameService.id === name.id
        );
        return nameRole?.name ?? "";
    });
    const dataFiltered = data.filter((item: any, index: any) => {
        const splitGrantTime = item.grantTime.split(" - ")[1];
        const nameSV = nameSvs[index];
        const keywordMatch =
            item.email
                .toString()
                .toLowerCase()
                .includes(searchString.toLowerCase()) ||
            item.name
                .toString()
                .toLowerCase()
                .includes(searchString.toLowerCase()) ||
            item.phone
                .toString()
                .toLowerCase()
                .includes(searchString.toLowerCase()) ||
            item.status
                .toString()
                .toLowerCase()
                .includes(searchString.toLowerCase()) ||
            item.source
                .toString()
                .toLowerCase()
                .includes(searchString.toLowerCase()) ||
            nameSV
                .toString()
                .toLowerCase()
                .includes(searchString.toLowerCase());

        let dateMath = startDate
            ? endDate
                ? splitGrantTime >= startDate && splitGrantTime <= endDate
                : splitGrantTime >= startDate
            : true;

        let serviceMath =
            service === "Tất cả" ? true : item.nameService === service;
        let sourceMath = source === "Tất cả" ? true : item.source === source;
        let statusMath = status === "Tất cả" ? true : item.status === status;

        return (
            keywordMatch && dateMath && serviceMath && sourceMath && statusMath
        );
    });

    // const finalData = dataFiltered;
    const handleChangSelect = (value: any, name: any) => {
        if (name === "source") {
            setSource(value);
        } else if (name === "service") {
            setService(value);
        } else if (name === "status") {
            setStatus(value);
        }
    };
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
                                        <Breadcrumb
                                            className="custom-breadcrumb"
                                            separator={
                                                <RightOutlined className="text-[#ff9138]" />
                                            }
                                            items={[
                                                {
                                                    key: "capso",
                                                    title: "Cấp số",
                                                },
                                                {
                                                    key: "danhsachcapso",
                                                    title: (
                                                        <span
                                                            style={{
                                                                color: "#ff9138",
                                                            }}
                                                        >
                                                            Danh sách cấp số
                                                        </span>
                                                    ),
                                                },
                                            ]}
                                        />
                                    }
                                />
                            </div>
                        </div>
                        <div className="pt-5">
                            <h3 style={{ color: "#FF7506" }}>Quản lý cấp số</h3>
                        </div>
                        <div className="row mt-3 justify-content-center">
                            <div className="col-2">
                                <div className="row">
                                    <div className="col-12">
                                        <p className="fw-bold">Tên dịch vụ</p>

                                        <Select
                                            size="large"
                                            defaultValue={service}
                                            style={{ width: "100%" }}
                                            onChange={(value) =>
                                                handleChangSelect(
                                                    value,
                                                    "service"
                                                )
                                            }
                                            suffixIcon={
                                                <CaretDownOutlined
                                                    style={{
                                                        color: "#ff9138",
                                                    }}
                                                />
                                            }
                                            options={[
                                                {
                                                    label: "Tất cả",
                                                    value: "Tất cả",
                                                },
                                                ...services.map(
                                                    (item: any) => ({
                                                        label: item.name,
                                                        value: item.id,
                                                    })
                                                ),
                                            ]}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-2 text-start">
                                <div className="row">
                                    <div className="col-12">
                                        <label className="fw-bold">
                                            Tình trạng
                                        </label>
                                    </div>
                                    <div className="col-12">
                                        <Select
                                            size="large"
                                            defaultValue={status}
                                            style={{ width: "100%" }}
                                            onChange={(value) =>
                                                handleChangSelect(
                                                    value,
                                                    "status"
                                                )
                                            }
                                            suffixIcon={
                                                <CaretDownOutlined
                                                    style={{
                                                        color: "#ff9138",
                                                    }}
                                                />
                                            }
                                            options={[
                                                {
                                                    label: "Tất cả",
                                                    value: "Tất cả",
                                                },
                                                {
                                                    label: "Đang chờ",
                                                    value: "Đang chờ",
                                                },
                                                {
                                                    value: "Đã sử dụng",
                                                    label: "Đã sử dụng",
                                                },
                                                {
                                                    value: "Bỏ qua",
                                                    label: "Bỏ qua",
                                                },
                                            ]}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-2 text-start">
                                <div className="row">
                                    <div className="col-12">
                                        <p className="fw-bold">Nguồn cấp</p>
                                    </div>
                                    <div className="col-12">
                                        <Select
                                            size="large"
                                            defaultValue={source}
                                            style={{ width: "100%" }}
                                            onChange={(value) =>
                                                handleChangSelect(
                                                    value,
                                                    "source"
                                                )
                                            }
                                            suffixIcon={
                                                <CaretDownOutlined
                                                    style={{ color: "#ff9138" }}
                                                />
                                            }
                                            options={[
                                                {
                                                    value: "Tất cả",
                                                    label: "Tất cả",
                                                },
                                                {
                                                    value: "Kiosk",
                                                    label: "Kiosk",
                                                },
                                                {
                                                    value: "Hệ thống",
                                                    label: "Hệ thống",
                                                },
                                            ]}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-3 text-start">
                                <div className="row">
                                    <div className="col-12">
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
                            <div className="col-3">
                                <div className="row" style={{ width: 200 }}>
                                    <div className="col-12">
                                        <p className="fw-bold">Từ khóa</p>
                                        <Input
                                            size="large"
                                            placeholder="nhập từ khóa"
                                            onChange={handleSearch}
                                            value={searchString}
                                            suffix={
                                                <SearchOutlined
                                                    style={{
                                                        marginLeft: "8px",
                                                        color: "#ff9138",
                                                    }}
                                                />
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-11 mt-3">
                                <Table
                                    dataSource={dataFiltered}
                                    bordered
                                    className="mb-3 table-striped"
                                    pagination={{
                                        pageSize: 7,
                                        total: dataFiltered.length,
                                        showSizeChanger: false,
                                    }}
                                >
                                    <Column
                                        title={
                                            <span className="table-title">
                                                STT
                                            </span>
                                        }
                                        dataIndex="stt"
                                        key="stt"
                                        render={(text: string) => (
                                            <span>{text}</span>
                                        )}
                                    />
                                    <Column
                                        title={
                                            <span className="table-title">
                                                Tên khách hàng
                                            </span>
                                        }
                                        dataIndex="name"
                                        key="name"
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
                                        render={(nameService: string) => {
                                            const serviceData = services.find(
                                                (item) =>
                                                    item.id === nameService
                                            );
                                            return (
                                                <span>{serviceData?.name}</span>
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
                                        key="gran"
                                        render={(text: string) => (
                                            <span>{text}</span>
                                        )}
                                    />
                                    <Column
                                        title={
                                            <span className="table-title">
                                                Hạn sử dụng
                                            </span>
                                        }
                                        dataIndex="exp"
                                        key="exp"
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
                                        dataIndex="status"
                                        key="status"
                                        render={(status: string) => (
                                            <Badge
                                                status={
                                                    status === "Đang chờ"
                                                        ? "processing"
                                                        : status ===
                                                          "Đã sử dụng"
                                                        ? "default"
                                                        : "error"
                                                }
                                                text={status}
                                            />
                                        )}
                                    />

                                    <Column
                                        title={
                                            <span className="table-title">
                                                Nguồn cấp
                                            </span>
                                        }
                                        dataIndex="source"
                                        key="source"
                                        render={(text: string) => (
                                            <span>{text}</span>
                                        )}
                                    />
                                    <Column
                                        title=""
                                        dataIndex="detail"
                                        key="detail"
                                        render={(
                                            _: any,
                                            record: { id: string }
                                        ) => (
                                            <>
                                                <Link
                                                    to={`/detailPro/${record.id}`}
                                                >
                                                    <span className="underline text-primary">
                                                        Chi tiết
                                                    </span>
                                                </Link>
                                            </>
                                        )}
                                    />
                                </Table>
                            </div>
                            <div className="col-1 mt-3">
                                <FixedCard
                                    href={"/addPro"}
                                    title={"Thêm mới"}
                                    icon={<PlusSquareFilled />}
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

export default ListProgressives;
