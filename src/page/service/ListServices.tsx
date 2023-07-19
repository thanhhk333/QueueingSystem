import {
    Badge,
    Breadcrumb,
    Button,
    Card,
    DatePicker,
    Dropdown,
    Input,
    MenuProps,
    Space,
    Table,
    Select,
} from "antd";
import React, { useEffect, useState } from "react";

import LeftMenu from "../Components/Leftmenu";

import {
    CaretDownOutlined,
    SearchOutlined,
    PlusSquareFilled,
    CalendarOutlined,
    CaretRightOutlined,
} from "@ant-design/icons";
import Header from "../Components/Header";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import FixedCard from "../Components/FixedCard";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { ServiceType, fetchService } from "./redux/serviceSilece";

const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

const columns: ColumnsType<ServiceType> = [
    {
        title: " Mã dịch vụ",
        dataIndex: "idService",
        key: "idService",
    },
    {
        title: " Tên dịch vụ ",
        dataIndex: "name",
        key: "name",
    },
    {
        title: " Mô tả ",
        dataIndex: "description",
        key: "description",
    },
    {
        title: " Trạng thái hoạt động",
        dataIndex: "status",
        key: "status",
        render: (status: string) => {
            return (
                <Space size="middle">
                    <Badge
                        status={status === "Hoạt động" ? "success" : "error"}
                        text={status}
                    />
                </Space>
            );
        },
    },

    {
        title: " Mô tả",
        dataIndex: "des",
        key: "des",
        render: (des: string, record: ServiceType) => {
            return (
                <Space size="middle">
                    <Link to={`/detailService/${record.id}`}>
                        <span className="underline text-primary">Chi tiết</span>
                    </Link>
                </Space>
            );
        },
    },
    {
        title: " Cập nhật",
        dataIndex: "update",
        key: "update",
        render: (update: string, record: ServiceType) => {
            return (
                <Space size="middle">
                    <Link to={`/editService/${record.id}`}>
                        <span className="underline text-primary">Cập nhật</span>
                    </Link>
                </Space>
            );
        },
    },
];

const Service = () => {
    const dispatch = useDispatch();
    const data = useSelector((state: RootState) => state.service.data);

    useEffect(() => {
        dispatch(fetchService() as any);
    }, [dispatch]);
    const [searchKeyword, setSearchKeyword] = useState<string>("");

    useEffect(() => {
        setSearchKeyword(""); // Reset search keyword when data changes
    }, [data]);
    const [status, setStatus] = useState("Tất cả");
    const handleChangeStatus = (e: any) => {
        setStatus(e);
    };
    const filteredData = data.filter((item) => {
        // Xử lý tìm kiếm theo từ khóa
        const keywordMatch =
            item.idService
                .toLowerCase()
                .includes(searchKeyword.toLowerCase()) ||
            item.name.toLowerCase().includes(searchKeyword.toLowerCase());
        item.status.toLowerCase().includes(searchKeyword.toLowerCase());
        const statusMatch = status === "Tất cả" || item.status === status;

        return keywordMatch && statusMatch;
    });
    return (
        <>
            <div
                className="flex"
                style={{ background: "#EAEAEC", width: "100%" }}
            >
                <div className="menu " style={{ background: "#fff" }}>
                    <LeftMenu />
                </div>

                <div className="w-[100%]">
                    <Card className="h-[100%]">
                        <Header
                            headerContent={
                                <Breadcrumb className="custom-breadcrumb">
                                    <Breadcrumb.Item>Dịch vụ</Breadcrumb.Item>
                                    <Breadcrumb.Item>
                                        <span style={{ color: "#ff9138" }}>
                                            Danh sách Dịch vụ
                                        </span>
                                    </Breadcrumb.Item>
                                </Breadcrumb>
                            }
                        />

                        <h2 style={{ color: "#ff9138", margin: "20px 0" }}>
                            Danh sách dich vụ{" "}
                        </h2>
                        <div className="row row-cols-4 ">
                            <div className="col d-flex flex-col">
                                <p className="fw-bold">Trạng thái hoạt động</p>

                                <Select
                                    suffixIcon={
                                        <CaretDownOutlined
                                            style={{ color: "#ff9138" }}
                                        />
                                    }
                                    onChange={handleChangeStatus}
                                    style={{ width: "100%" }}
                                    size="large"
                                    value={status || "Tất cả"}
                                    options={
                                        [
                                            {
                                                label: "Tất cả",
                                                value: "Tất cả",
                                            },
                                            {
                                                label: "Hoạt động",
                                                value: "Hoạt động",
                                            },
                                            {
                                                label: "Ngưng hoạt động",
                                                value: "Ngưng hoạt động",
                                            },
                                        ] as any
                                    }
                                />
                            </div>
                            <div className="col-4 flex flex-col">
                                <p className="fw-bold">Chọn thời gian</p>
                                <div className="time flex items-center">
                                    <DatePicker
                                        size="large"
                                        suffixIcon={
                                            <CalendarOutlined
                                                style={{
                                                    color: "#ff9138",
                                                    padding: "13px",
                                                    borderRadius: "20px",
                                                }}
                                            />
                                        }
                                        className="ant-input-sm"
                                        defaultValue={dayjs(
                                            "30/06/2023",
                                            dateFormatList[0]
                                        )}
                                        format={dateFormatList}
                                    />
                                    <CaretRightOutlined
                                        style={{ color: "#ff9138" }}
                                    />
                                    <DatePicker
                                        size="large"
                                        suffixIcon={
                                            <CalendarOutlined
                                                style={{
                                                    color: "#ff9138",
                                                    padding: "13px",
                                                    borderRadius: "20px",
                                                }}
                                            />
                                        }
                                        className="ant-input-sm"
                                        defaultValue={dayjs(
                                            "30/06/2023",
                                            dateFormatList[0]
                                        )}
                                        format={dateFormatList}
                                    />
                                </div>
                            </div>

                            <div className="col offset-1 d-flex flex-col ">
                                <p className="fw-bold">Từ khóa</p>
                                <Input
                                    size="large"
                                    placeholder="nhập từ khóa"
                                    suffix={
                                        <SearchOutlined
                                            style={{
                                                marginLeft: "8px",
                                                color: "#ff9138",
                                            }}
                                        />
                                    }
                                    value={searchKeyword}
                                    onChange={(e) =>
                                        setSearchKeyword(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div
                                    className=" mt-3"
                                    style={{ width: "1080px" }}
                                >
                                    <Table
                                        columns={columns}
                                        dataSource={filteredData}
                                        className="table-striped "
                                        pagination={{
                                            pageSize: 7,
                                            total: filteredData.length,
                                            showSizeChanger: false,
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-1">
                                <FixedCard
                                    title={"Thêm mới"}
                                    href={"/addService"}
                                    icon={<PlusSquareFilled />}
                                    className={""}
                                />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
};
export default Service;
