import { Card } from "antd";
import React from "react";
import { Link } from "react-router-dom";

interface FixedCardProps {
    href: string;
    title: string;
    icon: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export default function FixedCard({
    href,
    title,
    icon,
    className,
    onClick,
}: FixedCardProps) {
    const cardClassName = `fixed-card text-center${
        className ? ` ${className}` : ""
    }`;

    return (
        <div>
            <Link to={href}>
                <Card className={cardClassName.trim()} onClick={onClick}>
                    <span style={{ fontSize: 24 }}>
                        {typeof icon === "string" ? (
                            <img src={icon} alt="Icon" />
                        ) : (
                            icon
                        )}
                    </span>
                    <p className="fw-bold" style={{ fontSize: 9 }}>
                        {title}
                    </p>
                </Card>
            </Link>
        </div>
    );
}
