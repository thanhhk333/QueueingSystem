import React, { useState } from 'react';
import { AppstoreOutlined, BellFilled, MailOutlined, SettingOutlined } from '@ant-design/icons';
import Avatar from '../../shared/assets/images/avatar.jpg';
type HeaderProps = {
  headerContent?: React.ReactNode;
};

const Header: React.FC<HeaderProps> = ({ headerContent }) => {
  return (
    <>
      <div
        className="header flex justify-between items-center"
        style={{ height: '88px', width: '100%' }}
      >
        {headerContent ? (
          <div className="header_left ml-5">{headerContent}</div>
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
            <BellFilled className="text-orange-500" style={{ fontSize: 14 }} />
          </span>

          <img
            src={Avatar}
            className="rounded-circle mx-3"
            alt=""
            style={{ height: 40, width: 40 }}
          />
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
