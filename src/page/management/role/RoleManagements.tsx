import React, { useEffect, useState } from "react";
import { Breadcrumb, Input, Layout, Pagination, Table } from "antd";
import { PlusSquareFilled, SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import LeftMenu from "../../Components/Leftmenu";
import Header from "../../Components/Header";

import FixedCard from "../../Components/FixedCard";
import { useDispatch, useSelector } from "react-redux";
import Column from "antd/es/table/Column";

import { fetchRoleManagement } from "./redux/roleManagementSlice";
import { AppThunk, RootState } from "../../../store";

const { Content } = Layout;
interface RoleManagementData {
    id: string;
    name: string;
    used: number;
    des: string;
}
function ListRole() {
    const dispatch = useDispatch();
    const roleManagementData = useSelector(
        (state: RootState) => state.roleManagement.data
    );

    useEffect(() => {
        dispatch(fetchRoleManagement() as any);
    }, [dispatch]);
    const [searchKeyword, setSearchKeyword] = useState<string>("");

    return (
        <div className="d-flex">
            <LeftMenu />
            <Layout>
                <Content>
                    <div className="container">
                        <div className="row ">
                            <div className="col">
                                <Header
                                    headerContent={
                                        <Breadcrumb className="custom-breadcrumb">
                                            <Breadcrumb.Item>
                                                Cài đặt hệ thống
                                            </Breadcrumb.Item>
                                            <Breadcrumb.Item>
                                                <span
                                                    style={{ color: "#ff9138" }}
                                                >
                                                    Quản lý vai trò{" "}
                                                </span>
                                            </Breadcrumb.Item>
                                        </Breadcrumb>
                                    }
                                />
                            </div>
                        </div>
                        <div className="pt-5">
                            <h2 style={{ color: "#ff9138" }}>
                                Danh sách vai trò
                            </h2>
                        </div>
                        <div className="row mt-3 justify-end">
                            <div className="col-4">
                                <div className="align-items-center mr-40">
                                    <h4>Từ khóa</h4>
                                    <Input
                                        size="large"
                                        placeholder="Nhập từ khóa"
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
                        <div className="row">
                            <div className="col-11 mt-3">
                                <Table
                                    dataSource={roleManagementData}
                                    pagination={false}
                                    bordered
                                    className="mb-3 table-striped"
                                >
                                    <Column
                                        title={
                                            <span className="table-title">
                                                Tên vai trò
                                            </span>
                                        }
                                        key="name"
                                        dataIndex="name"
                                        render={(text: string) => (
                                            <span>{text}</span>
                                        )}
                                    />
                                    <Column
                                        title={
                                            <span className="table-title">
                                                Số người dùng
                                            </span>
                                        }
                                        key="used"
                                        dataIndex="used"
                                        render={(text: string) => (
                                            <span>6</span>
                                        )}
                                    />
                                    <Column
                                        title={
                                            <span className="table-title">
                                                Mô tả
                                            </span>
                                        }
                                        key="des"
                                        dataIndex="des"
                                        render={(text: string) => (
                                            <span>{text}</span>
                                        )}
                                    />
                                    <Column
                                        dataIndex="cập nhật"
                                        key="cập nhật"
                                        render={(
                                            _: any,
                                            record: { id: string }
                                        ) => (
                                            <>
                                                <Link
                                                    to={`/updateRoleManagement/${record.id}`}
                                                >
                                                    <span className="underline text-primary">
                                                        Cập nhật{" "}
                                                    </span>
                                                </Link>
                                            </>
                                        )}
                                    />
                                </Table>
                                <Pagination
                                    total={100}
                                    showSizeChanger={false}
                                    style={{ textAlign: "right" }}
                                />
                            </div>
                            <div className="col-1 mt-3">
                                <FixedCard
                                    href={"/addRoleManagement"}
                                    title={"Thêm mới"}
                                    icon={<PlusSquareFilled />}
                                />
                            </div>
                        </div>
                    </div>
                </Content>
            </Layout>
        </div>
    );
}
export default ListRole;
