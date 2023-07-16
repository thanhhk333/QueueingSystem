import {
    Badge,
    Breadcrumb,
    Button,
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
    PlusOutlined,
} from "@ant-design/icons";
import Header from "../Components/Header";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import FixedCard from "../Components/FixedCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

import deviceSlice, { DataType, fetchDevice } from "./redux/deviceSlice";

const Divice = () => {
    const dispatch = useDispatch();
    const deviceData = useSelector((state: RootState) => state.device.data);
    const loading = useSelector((state: RootState) => state.device.loading);

    useEffect(() => {
        dispatch(fetchDevice() as any);
    }, [dispatch]);

    const columns: ColumnsType<DataType> = [
        {
            title: "Mã thiết bị",
            dataIndex: "idDevice",
            key: "idDevice",
        },
        {
            title: "Tên thiết bị",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Địa chỉ IP",
            dataIndex: "IpAddress",
            key: "IpAddress",
        },
        {
            title: "Trạng thái hoạt động",
            dataIndex: "status",
            key: "status",
            render: (status: string) => {
                const badgeStatus =
                    status === "Hoạt động" ? "success" : "error";
                return <Badge status={badgeStatus} text={status} />;
            },
        },

        {
            title: "Trạng thái kết nối",
            dataIndex: "statusWork",
            key: "statusWork",
            render: (statusWork: string) => {
                const badgeStatus =
                    statusWork === "Kết nối" ? "success" : "error";
                return <Badge status={badgeStatus} text={statusWork} />;
            },
        },

        {
            title: "Dịch vụ sử dụng",
            dataIndex: "service",
            key: "service",
        },

        {
            dataIndex: "detail",
            key: "detail",
            render: (detail: string, record: DataType) => {
                return (
                    <Space size="middle">
                        <Link to={`/detailDivice/${record.id}`}>
                            <span className="underline text-primary">
                                Chi tiết
                            </span>
                        </Link>
                    </Space>
                );
            },
        },
        {
            dataIndex: "update",
            key: "update",
            render: (update: string, record: DataType) => {
                return (
                    <Space size="middle">
                        <Link to={`/updateDivice/${record.id}`}>
                            <span className="underline text-primary">
                                Cập nhật
                            </span>
                        </Link>
                    </Space>
                );
            },
        },
    ];
    const [status, setStatus] = useState("Tất cả");
    const [statusWork, setStatusWork] = useState("Tất cả");
    const [search, setSearch] = useState("");
    const handleChangeSelect = (value: any, name: any) => {
        if (name === "status") {
            setStatus(value);
        } else {
            setStatusWork(value);
        }
    };
    const handleSearch = (e: any) => {
        setSearch(e.target.value);
    };

    const dataFiltered = deviceData.filter((item) => {
        const statusFilter =
            status === "Tất cả" ? true : item.status === status;
        const statusWorkFilter =
            statusWork === "Tất cả" ? true : item.statusWork === statusWork;
        const searchFilter =
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.idDevice
                .toString()
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            item.IpAddress.toString()
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            item.service
                .toString()
                .toLowerCase()
                .includes(search.toLowerCase());

        return statusFilter && statusWorkFilter && searchFilter;
    });

    return (
        <>
            <div className="flex_home " style={{ background: "#EAEAEC" }}>
                <div className="menu " style={{ background: "#fff" }}>
                    <LeftMenu />
                </div>
                <div className="w-full">
                    <Header
                        headerContent={
                            <Breadcrumb className="custom-breadcrumb ms-4 ">
                                <Breadcrumb.Item>Thiết bị</Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    <span style={{ color: "#ff9138" }}>
                                        Danh sách thiết bị
                                    </span>
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        }
                    />
                    <h2 className="ms-4 mainColor">Danh sách thiết bị </h2>
                    <div
                        className="row row-cols-4 "
                        style={{ margin: "30px 0px 10px 10px" }}
                    >
                        <div className="col d-flex flex-col">
                            <p className="fw-bold">Trạng thái hoạt động</p>

                            <Select
                                suffixIcon={
                                    <CaretDownOutlined className="mainColor" />
                                }
                                size="large"
                                style={{ width: "100%" }}
                                value={status || "Tất cả"}
                                options={
                                    [
                                        { value: "Tất cả", label: "Tất cả" },
                                        {
                                            value: "Hoạt động",
                                            label: "Hoạt động",
                                        },
                                        {
                                            value: "Ngưng hoạt động",
                                            label: "Ngưng hoạt động",
                                        },
                                    ] as any
                                }
                                onChange={handleChangeSelect}
                            />
                        </div>

                        <div className="col d-flex flex-col">
                            <p className="fw-bold">Trạng thái kết nối</p>
                            <Select
                                suffixIcon={
                                    <CaretDownOutlined className="mainColor" />
                                }
                                size="large"
                                style={{ width: "100%" }}
                                value={statusWork || "Tất cả"}
                                options={
                                    [
                                        { value: "Tất cả", label: "Tất cả" },
                                        {
                                            value: "Kết nối",
                                            label: "Kết nối",
                                        },
                                        {
                                            value: "Mất kết nối",
                                            label: "Mất kết nối",
                                        },
                                    ] as any
                                }
                                onChange={handleChangeSelect}
                            />
                        </div>
                        <div className="col offset-2 d-flex flex-col ">
                            <p className="fw-bold">Từ khóa</p>
                            <Input
                                onChange={handleSearch}
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
                            />
                        </div>
                    </div>

                    <div className="row_btn flex ">
                        <div
                            className="form h-fit rounded-md "
                            id="form"
                            style={{ background: "#fff" }}
                        >
                            <Table
                                columns={columns}
                                dataSource={dataFiltered}
                                loading={loading}
                                className="table-striped"
                            />
                        </div>
                        <FixedCard
                            title={"Thêm mới"}
                            href={"/addDivice"}
                            icon={<PlusOutlined style={{ fontSize: "20px" }} />}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Divice;
