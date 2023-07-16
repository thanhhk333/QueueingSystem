import { EditFilled, RollbackOutlined } from "@ant-design/icons";
import { Card, Divider } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export default function DoubleFixedCard({
    href1,
    href2,
}: {
    href1: string;
    href2: string;
}) {
    return (
        <div>
            <Card className="fixed-card-service text-center">
                <Link
                    to={href1}
                    className="text-decoration-none"
                    style={{ color: "#FF7506" }}
                >
                    <EditFilled className="fs-4" />
                    <p className=" fw-bold ">Cập nhật</p>
                </Link>
                <Divider className="px-4" />
                <Link
                    to={href2}
                    className="text-decoration-none"
                    style={{ color: "#FF7506" }}
                >
                    <RollbackOutlined className="fs-4" />
                    <p className="fw-bold ">Quay lại</p>
                </Link>
            </Card>
        </div>
    );
}
