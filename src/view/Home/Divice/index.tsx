import { Badge, Breadcrumb, Button, Dropdown, Input, MenuProps, Space, Table } from 'antd';
import React from 'react';
import './divice.scss';

import LeftMenu from '@view/Components/Leftmenu';

import { CaretDownOutlined, SearchOutlined, PlusSquareFilled } from '@ant-design/icons';
import Header from '@view/Components/Header';
import { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import FixedCard from './../../Components/FixedCard';

interface DataType {
  key: string;
  id: string;
  name: string;
  IpAddress: string;
  status: string;
  statusWork: string;
  service: string;
  des?: string | React.ReactNode;
  update?: string | React.ReactNode;
}

const data: DataType[] = [
  {
    key: '1',
    id: 'KIO_01',
    name: 'Kiosk',
    IpAddress: '192.168.1.10',
    status: 'error',
    statusWork: 'success',
    service: 'Khám tim mạch, Khám mắt,....',
    des: <Link to="/detailDivice">chi tiết </Link>,
    update: <Link to="/updateDivice">Cập nhật</Link>,
  },
  {
    key: '1',
    id: 'KIO_01',
    name: 'Kiosk',
    IpAddress: '192.168.1.10',
    status: 'error',
    statusWork: 'success',
    service: 'Khám tim mạch, Khám mắt,....',
    des: <Link to="/detailDivice">chi tiết </Link>,
    update: <Link to="/updateDivice">Cập nhật</Link>,
  },
  {
    key: '1',
    id: 'KIO_01',
    name: 'Kiosk',
    IpAddress: '192.168.1.10',
    status: 'error',
    statusWork: 'success',
    service: 'Khám tim mạch, Khám mắt,....',
    des: <Link to="/detailDivice">chi tiết </Link>,
    update: <Link to="/updateDivice">Cập nhật</Link>,
  },
  {
    key: '1',
    id: 'KIO_01',
    name: 'Kiosk',
    IpAddress: '192.168.1.10',
    status: 'error',
    statusWork: 'success',
    service: 'Khám tim mạch, Khám mắt,....',
    des: <Link to="/detailDivice">chi tiết </Link>,
    update: <Link to="/updateDivice">Cập nhật</Link>,
  },
];
const columns: ColumnsType<DataType> = [
  {
    title: ' Mã thiết bị',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: ' Tên thiết bị ',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: ' Địa chỉ IP ',
    dataIndex: 'IpAddress',
    key: 'IpAddress',
  },
  {
    title: ' Trạng thái hoạt động',
    dataIndex: 'status',
    key: 'status',
    render: (statusWork: string) => {
      if (statusWork === 'success') {
        return <Badge status="processing" text="Hoạt động" />;
      } else if (statusWork === 'error') {
        return <Badge status="error" text="Ngưng hoạt động" />;
      }
    },
  },
  {
    title: ' Trạng thái kết nối',
    dataIndex: 'statusWork',
    key: 'statusWork',
    render: (statusWork: string) => {
      if (statusWork === 'success') {
        return <Badge status="processing" text="Hoạt động" />;
      } else if (statusWork === 'error') {
        return <Badge status="error" text="Ngưng hoạt động" />;
      }
    },
  },
  {
    title: ' Dịch vụ sử dụng',
    dataIndex: 'service',
    key: 'service',
  },
  {
    title: ' Mô tả',
    dataIndex: 'des',
    key: 'des',
  },
  {
    title: ' Cập nhật',
    dataIndex: 'update',
    key: 'update',
  },
];
const items: MenuProps['items'] = [
  {
    label: 'Tất cả',
    key: '1',
  },
  {
    label: 'Hoạt động',
    key: '2',
  },
  {
    label: 'Ngưng hoạt động',
    key: '3',
  },
];

const menuProps = {
  items,
};
const Divice = () => {
  return (
    <>
      <div className="flex_home " style={{ background: '#EAEAEC' }}>
        <div className="menu " style={{ background: '#fff' }}>
          <LeftMenu />
        </div>

        <div className="w-full">
          <Header
            headerContent={
              <Breadcrumb className="custom-breadcrumb">
                <Breadcrumb.Item>Thiết bị</Breadcrumb.Item>
                <Breadcrumb.Item>
                  <span style={{ color: '#ff9138' }}>Danh sách thiết bị</span>
                </Breadcrumb.Item>
              </Breadcrumb>
            }
          />
          <h2 style={{ color: '#ff9138', marginLeft: '20px' }}>Danh sách thiết bị </h2>
          <div className="row row-cols-4 " style={{ margin: '30px 0px 10px 20px' }}>
            <div className="col d-flex flex-col">
              <h4>Trạng thái hoạt động</h4>
              <Dropdown menu={menuProps}>
                <Button
                  style={{
                    background: '#fff',
                    border: '2px solid rgba(212, 212, 215, 1)',
                    fontSize: '16px',
                    lineHeight: '16px',
                    padding: '10px, 12px, 10px, 12px',
                    color: 'black',
                    borderRadius: '8px',
                  }}
                  size="middle"
                >
                  <Space className="flex justify-between mx-3">
                    Tất cả
                    <CaretDownOutlined style={{ color: '#ff9138' }} />
                  </Space>
                </Button>
              </Dropdown>
            </div>

            <div className="col d-flex flex-col">
              <h4>Trạng thái kết nối</h4>
              <Dropdown menu={menuProps}>
                <Button
                  style={{
                    background: '#fff',
                    border: '2px solid rgba(212, 212, 215, 1)',
                    fontSize: '16px',
                    lineHeight: '16px',
                    padding: '10px, 12px, 10px, 12px',
                    color: 'black',
                    borderRadius: '8px',
                  }}
                  size="middle"
                >
                  <Space className="flex justify-between mx-3">
                    Tất cả
                    <CaretDownOutlined style={{ color: '#ff9138' }} />
                  </Space>
                </Button>
              </Dropdown>
            </div>
            <div className="col offset-2 d-flex flex-col ">
              <h4>Từ khóa</h4>
              <Input
                size="middle"
                placeholder="nhập từ khóa"
                suffix={<SearchOutlined style={{ marginLeft: '8px', color: '#ff9138' }} />}
              />
            </div>
          </div>

          <div className="row_btn flex ">
            <div className="form h-fit rounded-md " id="form" style={{ background: '#fff' }}>
              <Table columns={columns} dataSource={data} className="table-striped" />
            </div>
            <FixedCard
              title={'Thêm mới'}
              href={'/addDivice'}
              icon={<PlusSquareFilled />}
              className={undefined}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Divice;
