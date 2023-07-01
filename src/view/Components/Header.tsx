import React, { useState } from 'react';
import { BellFilled } from '@ant-design/icons';
import Avatar from '../../shared/assets/images/avatar.jpg';
import { Divider, Popover, Space } from 'antd';
import { Link } from 'react-router-dom';
type HeaderProps = {
  headerContent?: React.ReactNode;
};

const Header: React.FC<HeaderProps> = ({ headerContent }) => {
  const [showNotification, setShowNotification] = useState(false);

  const handleNotificationClick = () => {
    setShowNotification(!showNotification);
  };

  const notificationContent = (
    <div
      style={{
        width: '360px',
        height: '526px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h3
        style={{
          color: '#fff',
          backgroundColor: '#ff9138',
          padding: '8px 16px',
          margin: '0',
          borderTopLeftRadius: '4px',
          borderTopRightRadius: '4px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        Thông báo
      </h3>
      <div className="container mt-2">
        <div>
          <Space direction="vertical" size={-8}>
            <strong className="mb-0" style={{ color: '#ff9138' }}>
              Thông báo 1:
            </strong>
            <span className="mb-0">Nội dung thông báo 1</span>
          </Space>
        </div>
        <Divider
          style={{ margin: '8px 0', fontWeight: 'bold', borderStyle: 'solid', borderWidth: '2px' }}
        />
        <div>
          <Space direction="vertical" size={-8}>
            <strong style={{ color: '#ff9138' }}>Thông báo 2:</strong>
            <span className="mb-0">Nội dung thông báo 2</span>
          </Space>
        </div>
        <div>
          <Space direction="vertical" size={-8}>
            <strong className="mb-0" style={{ color: '#ff9138' }}>
              Thông báo 1:
            </strong>
            <span className="mb-0">Nội dung thông báo 1</span>
          </Space>
        </div>
        <Divider
          style={{ margin: '8px 0', fontWeight: 'bold', borderStyle: 'solid', borderWidth: '2px' }}
        />
        <div>
          <Space direction="vertical" size={-8}>
            <strong style={{ color: '#ff9138' }}>Thông báo 2:</strong>
            <span className="mb-0">Nội dung thông báo 2</span>
          </Space>
        </div>
        <div>
          <Space direction="vertical" size={-8}>
            <strong className="mb-0" style={{ color: '#ff9138' }}>
              Thông báo 1:
            </strong>
            <span className="mb-0">Nội dung thông báo 1</span>
          </Space>
        </div>
        <Divider
          style={{ margin: '8px 0', fontWeight: 'bold', borderStyle: 'solid', borderWidth: '2px' }}
        />
        <div>
          <Space direction="vertical" size={-8}>
            <strong style={{ color: '#ff9138' }}>Thông báo 2:</strong>
            <span className="mb-0">Nội dung thông báo 2</span>
          </Space>
        </div>
      </div>
    </div>
  );
  return (
    <>
      <div
        className="header flex justify-between items-center"
        style={{ height: '88px', width: '100%' }}
      >
        {headerContent ? (
          <div className="header_left ">{headerContent}</div>
        ) : (
          <h3 className="ml-5" style={{ color: '#ff9138' }}>
            Thông tin cá nhân
          </h3>
        )}

        <div className="header_right flex items-center justify-end mr-28">
          <span
            className="rounded-circle flex items-center justify-center"
            style={{ backgroundColor: '#FFF2E7', width: 32, height: 32 }}
          >
            <Popover content={notificationContent} trigger="click">
              <BellFilled
                className="text-orange-500"
                style={{ fontSize: 20 }}
                onClick={handleNotificationClick}
              />
            </Popover>
          </span>
          <Link to="/profile">
            <img src={Avatar} className="rounded-circle mx-3" style={{ height: 40, width: 40 }} />
          </Link>
          <div className="sub space-x-1">
            <p className="">Xin chào</p>
            <h3 className="">Nguyễn Đức Thanh</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
