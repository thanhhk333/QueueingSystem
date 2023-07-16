import React, { useState, useEffect } from "react";
import {
    AppstoreOutlined,
    CommentOutlined,
    DesktopOutlined,
    FileTextOutlined,
    GroupOutlined,
    LogoutOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import { useDispatch } from "react-redux";
import { getLogout } from "../management/account/redux/AccountSlice";
const LeftMenu: React.FC = () => {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const [selectedKey, setSelectedKey] = useState<string | null>(null);

    type MenuItem = Required<MenuProps>["items"][number];

    function getItem(
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        onClick?: () => void,
        children?: MenuItem[],
        type?: "group"
    ): MenuItem {
        return {
            key,
            icon,
            children,
            label,
            type,
            onClick: onClick ? onClick : undefined,
        };
    }
    const items: MenuItem[] = [];

    if (isLoggedIn === "true") {
        items.push(
            getItem("Dashboard", "1", <AppstoreOutlined />, () => {
                navigate("/");
            }),
            getItem("Thiết bị", "2", <DesktopOutlined />, () => {
                navigate("/device");
            }),
            getItem("Dịch vụ", "3", <CommentOutlined />, () => {
                navigate("/service");
            }),
            getItem("Cấp số", "4", <GroupOutlined />, () => {
                navigate("/progressive");
            }),
            getItem("Báo cáo", "5", <FileTextOutlined />, () => {
                navigate("/report");
            }),
            getItem(
                "Cài đặt hệ thống",
                "setting",
                <SettingOutlined />,
                undefined,
                [
                    getItem("Quản lý vai trò", "9", undefined, () => {
                        navigate("/role");
                    }),
                    getItem("Quản lý tài khoản", "10", undefined, () => {
                        navigate("/account");
                    }),
                    getItem("Quản lý người dùng", "11", undefined, () => {
                        navigate("/user");
                    }),
                ]
            )
        );
    } else {
        items.push(
            getItem("Cấp số", "4", <GroupOutlined />, () => {
                navigate("/addPro");
            })
        );
    }

    // Sử dụng biến items trong giao diện hoặc xử lý logic khác

    const handleClick = (e: any) => {
        const key = e.key;
        setSelectedKey(key);
        localStorage.setItem("selectedKey", key);
    };

    useEffect(() => {
        const storedKey = localStorage.getItem("selectedKey");
        if (storedKey) {
            setSelectedKey(storedKey);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("selectedKey", selectedKey || "");
    }, [selectedKey]);

    //set loguot function
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(getLogout() as any);
    };

    return (
        <div
            className="slidebar"
            style={{ width: 200, height: "100 vh", background: "#fff" }}
        >
            <div className="flex items-center justify-center py-10">
                <div className="logo">
                    <img src={Logo} alt="" />
                </div>
            </div>

            <div className="menu-wrapper">
                <Menu
                    defaultOpenKeys={["sub1"]}
                    mode="vertical"
                    theme="light"
                    items={items}
                    selectedKeys={[selectedKey || "1"]}
                    onClick={handleClick}
                />
            </div>

            <div className="flex items-bottom justify-center mt-20">
                {/* <Button
                    onClick={handleLogout}
                    className=""
                    style={{
                        color: "#ff9138",
                        background: "#fff2e7",
                        outline: "none",
                        border: "none",
                    }}
                >
                    <LogoutOutlined /> Đăng xuất
                </Button> */}

                {isLoggedIn === "true" ? (
                    <Button
                        onClick={handleLogout}
                        className=""
                        style={{
                            color: "#ff9138",
                            background: "#fff2e7",
                            outline: "none",
                            border: "none",
                        }}
                    >
                        <LogoutOutlined /> Đăng xuất
                    </Button>
                ) : (
                    <Button
                        onClick={() => navigate("/login")}
                        className=""
                        style={{
                            color: "#ff9138",
                            background: "#fff2e7",
                            outline: "none",
                            border: "none",
                        }}
                    >
                        <LogoutOutlined /> Đăng nhập
                    </Button>
                )}
            </div>
        </div>
    );
};

export default LeftMenu;
