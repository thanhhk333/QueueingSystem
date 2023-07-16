import React, { useState, useEffect } from "react";
import { GroupOutlined, LogoutOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
const MenuWithoutLogin: React.FC = () => {
    const navigate = useNavigate();

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

    const items: MenuItem[] = [
        getItem("Cấp số", "4", <GroupOutlined />, () => {
            navigate("/addPro");
        }),
    ];

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

            <div className="flex items-bottom justify-center">
                <Button
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
            </div>
        </div>
    );
};

export default MenuWithoutLogin;
