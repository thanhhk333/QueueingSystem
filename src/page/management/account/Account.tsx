import {
    Badge,
    Breadcrumb,
    Input,
    MenuProps,
    Space,
    Table,
    Select,
} from "antd";
import React, { useEffect, useState } from "react";

import LeftMenu from "../../Components/Leftmenu";
import {
    CaretDownOutlined,
    SearchOutlined,
    PlusSquareFilled,
} from "@ant-design/icons";
import Header from "../../Components/Header";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import FixedCard from "../../Components/FixedCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { AccountData, fetchAccount } from "./redux/AccountSlice";
import { fetchRoleManagement } from "../role/redux/roleManagementSlice";

const Account = () => {
    const dispatch = useDispatch();
    const data = useSelector((state: RootState) => state.account.data);
    const roles = useSelector(
        (state: RootState) => state.roleManagement.data
    ) as { id: string; name: string }[];
    const dataPro = data.map((item) => {
        return {
            ...item,
            role: item.role.id,
        };
    });
    useEffect(() => {
        dispatch(fetchAccount() as any);
        dispatch(fetchRoleManagement() as any);
    }, [dispatch]);
    const [selectedRole, setSelectedRole] = React.useState<string>("");

    const [searchKeyword, setSearchKeyword] = React.useState<string>("");

    const handleChangeRole = (value: string) => {
        setSelectedRole(value);
    };
    const roleNames = dataPro.map((item) => {
        const nameRole = roles.find((role) => item.role === role.id);
        return nameRole?.name ?? "";
    });
    console.log(roleNames);

    const filteredData = dataPro.filter((item, index) => {
        const nameRole = roleNames[index];
        const keywordMatch =
            item.userName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            item.fullName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            item.phone.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            nameRole.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            item.status.toLowerCase().includes(searchKeyword.toLowerCase());
        const roleMatch = selectedRole === "" || nameRole === selectedRole;
        return keywordMatch && roleMatch;
    });

    const columns: ColumnsType<AccountData> = [
        {
            title: " Tên đăng nhập",
            dataIndex: "userName",
            key: "userName",
        },
        {
            title: " Họ tên ",
            dataIndex: "fullName",
            key: "fullName",
        },
        {
            title: " Số điện thoại ",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: " Vai trò",
            dataIndex: "role",
            key: "role",
            render: (role: string) => {
                const nameRole = roles.find((item) => item.id === role);

                return <span>{nameRole?.name}</span>;
            },
        },
        {
            title: " Trạng thái hoạt động",
            dataIndex: "status",
            key: "status",
            render: (status: string) => {
                if (status === "Hoạt động") {
                    return <Badge status="success" text="Hoạt động" />;
                } else if (status === "Ngưng hoạt động") {
                    return <Badge status="error" text="Ngưng hoạt động" />;
                }
            },
        },

        {
            title: " Cập nhật",
            dataIndex: "update",
            key: "update",
            render: (update: string, record: AccountData) => {
                return (
                    <Space size="middle">
                        <Link to={`/updateAccount/${record.id}`}>
                            <span className="underline text-primary">
                                Cập nhật
                            </span>
                        </Link>
                    </Space>
                );
            },
        },
    ];

    return (
        <>
            <div className="flex_home " style={{ background: "#EAEAEC" }}>
                <div className="menu " style={{ background: "#fff" }}>
                    <LeftMenu />
                </div>
                <div className="w-full">
                    <Header
                        headerContent={
                            <Breadcrumb className="custom-breadcrumb">
                                <Breadcrumb.Item>
                                    Cài đặt hệ thống
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    <span style={{ color: "#ff9138" }}>
                                        Quản lý tài khoản
                                    </span>
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        }
                    />
                    <h2 style={{ color: "#ff9138", marginLeft: "20px" }}>
                        Quản lý tài khoản{" "}
                    </h2>
                    <div
                        className="row row-cols-4 "
                        style={{ margin: "30px 0px 10px 20px" }}
                    >
                        <div className="col d-flex flex-col">
                            <h4>Tên vai trò</h4>

                            <Select
                                size="large"
                                style={{ width: "100%" }}
                                placeholder="Chọn vai trò"
                                onChange={(value) => handleChangeRole(value)}
                                value={selectedRole}
                                suffixIcon={
                                    <CaretDownOutlined
                                        style={{ color: "#ff9138" }}
                                    />
                                }
                                options={[
                                    {
                                        label: "Tất cả",
                                        value: "",
                                    },
                                    ...roles.map((item) => {
                                        return {
                                            label: item.name,
                                            value: item.name,
                                        };
                                    }),
                                ]}
                            />
                        </div>

                        <div className="col offset-5 d-flex flex-col ">
                            <h4>Từ khóa</h4>
                            <Input
                                onChange={(e) =>
                                    setSearchKeyword(e.target.value)
                                }
                                value={searchKeyword}
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
                                dataSource={filteredData}
                                className="table-striped"
                                pagination={{
                                    pageSize: 7,
                                    total: filteredData.length,
                                    showSizeChanger: false,
                                }}
                            />
                        </div>
                        <FixedCard
                            title={"Thêm mới"}
                            href={"/addAcount"}
                            icon={<PlusSquareFilled />}
                            className={undefined}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
export default Account;
