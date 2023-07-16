import React, { useEffect, useState } from "react";
import { BellFilled } from "@ant-design/icons";
import Avatar from "../../assets/images/avatar.jpg";
import { Divider, Popover, Space } from "antd";
import { Link } from "react-router-dom";
import { AccountData } from "../management/account/redux/AccountSlice";
import firebase from "firebase/compat/app";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
type HeaderProps = {
    headerContent?: React.ReactNode;
};

const Header: React.FC<HeaderProps> = ({ headerContent }) => {
    const [showNotification, setShowNotification] = useState(false);
    const [user, setUser] = useState<AccountData>({} as AccountData);
    const userInfo = localStorage.getItem("userInfo");
    useEffect(() => {
        const fetchUser = async () => {
            const userRef = await firebase
                .firestore()
                .collection("accounts")
                .doc(userInfo as any);

            const userSnapshot = await userRef.get();

            if (userSnapshot.exists) {
                const userData = userSnapshot.data() as any;
                setUser(userData);
            }
        };
        fetchUser();
    }, [userInfo]);

    const handleNotificationClick = () => {
        setShowNotification(!showNotification);
    };

    const listpro = useSelector((state: RootState) => state.progressive.data);

    const notificationContent = (
        <div
            style={{
                width: "360px",
                height: "526px",
                overflowX: "hidden",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <h3
                style={{
                    color: "#fff",
                    backgroundColor: "#ff9138",
                    padding: "8px 16px",
                    margin: "0",
                    borderTopLeftRadius: "4px",
                    borderTopRightRadius: "4px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                Thông báo
            </h3>
            <div className="container mt-2">
                {listpro.map((item: any) => {
                    const grantTime = item.grantTime.toDate();
                    const formattedgrantTime = `${grantTime
                        .getHours()
                        .toString()
                        .padStart(2, "0")}:${grantTime
                        .getMinutes()
                        .toString()
                        .padStart(2, "0")}`;

                    const grantTimeToDate = `${grantTime
                        .getDate()
                        .toString()
                        .padStart(2, "0")}/${(grantTime.getMonth() + 1)
                        .toString()
                        .padStart(2, "0")}/${grantTime.getFullYear()}`;
                    return (
                        <div>
                            <Space direction="vertical" size={-8}>
                                <strong
                                    className="mb-0"
                                    style={{ color: "#ff9138" }}
                                >
                                    Người dùng: {item.name}
                                </strong>
                                <span className="mb-0">
                                    Thời gian nhận số: {formattedgrantTime} ngày{" "}
                                    {grantTimeToDate}
                                </span>
                            </Space>

                            <Divider
                                style={{
                                    margin: "8px 0",
                                    fontWeight: "bold",
                                    borderStyle: "solid",
                                    borderWidth: "2px",
                                }}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
    return (
        <>
            <div
                className="header d-flex justify-content-between align-items-center"
                style={{ height: "88px", width: "100%" }}
            >
                {headerContent ? (
                    <div className="header_left ">{headerContent}</div>
                ) : (
                    <h3 className="ms-5" style={{ color: "#ff9138" }}>
                        Thông tin cá nhân
                    </h3>
                )}

                <div className="header_right d-flex align-items-center justify-content-end me-5">
                    <span
                        className="rounded-circle d-flex align-items-center justify-content-center shadow-lg"
                        style={{
                            backgroundColor: "#FFF2E7",
                            width: 32,
                            height: 32,
                        }}
                    >
                        <Popover
                            content={notificationContent}
                            trigger="click"
                            className=""
                        >
                            <BellFilled
                                className="mainColor"
                                style={{ fontSize: 20 }}
                                onClick={handleNotificationClick}
                            />
                        </Popover>
                    </span>
                    <Link to="/profile">
                        <img
                            src={Avatar}
                            className="rounded-circle mx-3"
                            style={{ height: 40, width: 40 }}
                            alt=""
                        />
                    </Link>
                    <div className="sub m-0">
                        <p className="font-extralight text-sm leading-2">
                            Xin chào
                        </p>
                        <p className="font-bold text-xl leading-3">
                            {user.fullName}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
