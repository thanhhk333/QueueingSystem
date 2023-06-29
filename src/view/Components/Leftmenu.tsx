import React, { useState } from 'react';
import '../Auth/styles.scss';
import {
  AppstoreOutlined,
  CommentOutlined,
  DesktopOutlined,
  FileTextOutlined,
  GroupOutlined,
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu, Row } from 'antd';
import Logo from '@view/Auth/components/Logo';
import { useNavigate } from 'react-router-dom';
import { routerHome } from '@view/Home/router';
import { routerDivice } from '@view/Home/Divice/router';
import { routerLogin } from '@view/Auth/Login/router';
import { routerProfile } from '@view/Auth/Profiles/router';

const LeftMenu: React.FC = () => {
  const [activeKey, setActiveKey] = useState<string>('2');

  const navigate = useNavigate();
  type MenuItem = Required<MenuProps>['items'][number];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    onClick?: () => void,
    children?: MenuItem[],
    type?: 'group',
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
    getItem('Dashboard', '1', <AppstoreOutlined />, () => {
      navigate(routerHome.path);
    }),
    getItem('Thiết bị', '2', <DesktopOutlined />, () => {
      navigate(routerDivice.path);
    }),
    getItem('Dịch vụ', '3', <CommentOutlined />, () => {
      navigate(routerProfile.path);
    }),
    getItem('Cấp số', '4', <GroupOutlined />, () => {
      navigate(routerHome.path);
    }),
    getItem('Báo cáo', '5', <FileTextOutlined />, () => {
      navigate(routerHome.path);
    }),

    getItem('Cài đặt hệ thống', 'sub5', <SettingOutlined />, undefined, [
      getItem('Quản lý vai trò', '9'),
      getItem('Quản lý tài khoản', '10'),
      getItem('Quản lý người dùng', '11'),
    ]),
  ];
  return (
    <div className="slidebar" style={{ width: 200, height: '100 vh', background: '#fff' }}>
      <div className="flex align-center justify-center py-24">
        <div className="logo" style={{ width: 80, height: 64 }}>
          <Logo />
        </div>
      </div>

      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="vertical"
        theme="light"
        items={items}
        className="bg_custom"
      />
      <div className="flex items-bottom justify-center">
        <Button
          className=""
          style={{ color: '#ff9138', background: '#fff2e7', outline: 'none', border: 'none' }}
        >
          <LogoutOutlined /> Đăng xuất
        </Button>
      </div>
    </div>
  );
};

export default LeftMenu;
