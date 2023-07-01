import React, { useState, useEffect } from 'react';
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
import { Button, Menu } from 'antd';
import Logo from '@view/Auth/components/Logo';
import { useNavigate, useLocation } from 'react-router-dom';
import { routerHome } from '@view/Home/router';
import { routerDivice } from '@view/Home/Divice/router';
import { routerService } from '@view/Home/Service/router';
import { routerPro } from '@view/Home/Progressitive/router';
import { routerReport } from '@view/Home/Report/router';
import { routerUser } from '@view/Home/Management/User/router';
import { routerRoleManagement } from '@view/Home/Management/Role/router';
import { routerUserLog } from '@view/Home/Management/UserLog/router';

const LeftMenu: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

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
      navigate(routerService.path);
    }),
    getItem('Cấp số', '4', <GroupOutlined />, () => {
      navigate(routerPro.path);
    }),
    getItem('Báo cáo', '5', <FileTextOutlined />, () => {
      navigate(routerReport.path);
    }),

    getItem('Cài đặt hệ thống', 'sub5', <SettingOutlined />, undefined, [
      getItem('Quản lý vai trò', '9', undefined, () => {
        navigate(routerRoleManagement.path);
      }),
      getItem('Quản lý tài khoản', '10', undefined, () => {
        navigate(routerUser.path);
      }),
      getItem('Quản lý người dùng', '11', undefined, () => {
        navigate(routerUserLog.path);
      }),
    ]),
  ];

  const handleClick = (e: any) => {
    const key = e.key;
    setSelectedKey(key);
    localStorage.setItem('selectedKey', key);
  };

  useEffect(() => {
    const storedKey = localStorage.getItem('selectedKey');
    if (storedKey) {
      setSelectedKey(storedKey);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedKey', selectedKey || '');
  }, [selectedKey]);

  return (
    <div className="slidebar" style={{ width: 200, height: '100 vh', background: '#fff' }}>
      <div className="flex align-center justify-center py-24">
        <div className="logo" style={{ width: 80, height: 64 }}>
          <Logo />
        </div>
      </div>

      <div className="menu-wrapper">
        <Menu
          defaultOpenKeys={['sub1']}
          mode="vertical"
          theme="light"
          items={items}
          selectedKeys={[selectedKey || '1']}
          onClick={handleClick}
        />
      </div>

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
