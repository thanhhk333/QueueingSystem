import { PlusSquareFilled } from '@ant-design/icons';
import { Card } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

export default function FixedCard({ href, title, icon, className }) {
  const cardClassName = `fixed-card text-center${className ? ` ${className}` : ''}`;

  return (
    <div>
      <Link to={href}>
        <Card className={cardClassName.trim()}>
          <span style={{ fontSize: 24 }}>{icon}</span>
          <p className="fw-bold" style={{ fontSize: 9 }}>
            {title}
          </p>
        </Card>
      </Link>
    </div>
  );
}
