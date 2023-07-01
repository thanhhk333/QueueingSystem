import {
  Badge,
  Breadcrumb,
  Button,
  DatePicker,
  Dropdown,
  Input,
  MenuProps,
  Space,
  Table,
} from 'antd';
import React from 'react';
import './mod.scss';
import LeftMenu from '@view/Components/Leftmenu';

import {
  CaretDownOutlined,
  SearchOutlined,
  PlusSquareFilled,
  CalendarOutlined,
  CaretRightOutlined,
} from '@ant-design/icons';
import Header from '@view/Components/Header';
import { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import FixedCard from './../../Components/FixedCard';
import dayjs from 'dayjs';

interface DataType {
  key: string;
  id: string;
  name: string;
  description: string;
  status: string;
  des?: string | React.ReactNode;
  update?: string | React.ReactNode;
}
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

const data: DataType[] = [
  {
    key: '1',
    id: 'KIO_01',
    name: 'Kiosk',
    description: 'Mô tả dịch vụ 1',
    status: 'success',
    des: <Link to="/detailService">chi tiết </Link>,
    update: <Link to="/updateService">Cập nhật</Link>,
  },
  {
    key: '1',
    id: 'KIO_01',
    name: 'Kiosk',
    description: 'Mô tả dịch vụ 1',
    status: 'success',
    des: <Link to="/detailService">chi tiết </Link>,
    update: <Link to="/updateService">Cập nhật</Link>,
  },
  {
    key: '1',
    id: 'KIO_01',
    name: 'Kiosk',
    description: 'Mô tả dịch vụ 1',
    status: 'success',
    des: <Link to="/detailService">chi tiết </Link>,
    update: <Link to="/updateService">Cập nhật</Link>,
  },
  {
    key: '1',
    id: 'KIO_01',
    name: 'Kiosk',
    description: 'Mô tả dịch vụ 1',
    status: 'success',
    des: <Link to="/detailService">chi tiết </Link>,
    update: <Link to="/updateService">Cập nhật</Link>,
  },
];
const columns: ColumnsType<DataType> = [
  {
    title: ' Mã dịch vụ',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: ' Tên dịch vụ ',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: ' Mô tả ',
    dataIndex: 'description',
    key: 'description',
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
      <div className="flex" style={{ background: '#EAEAEC', width: '100%' }}>
        <div className="menu " style={{ background: '#fff' }}>
          <LeftMenu />
        </div>
        <div className="w-full">
          <Header
            headerContent={
              <Breadcrumb className="custom-breadcrumb">
                <Breadcrumb.Item>Dịch vụ</Breadcrumb.Item>
                <Breadcrumb.Item>
                  <span style={{ color: '#ff9138' }}>Danh sách Dịch vụ</span>
                </Breadcrumb.Item>
              </Breadcrumb>
            }
          />

          <h2 style={{ color: '#ff9138', marginLeft: '30px' }}>Danh sách dich vụ </h2>
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
                  size="large"
                >
                  <Space className="flex justify-between mx-3">
                    Tất cả
                    <CaretDownOutlined style={{ color: '#ff9138' }} />
                  </Space>
                </Button>
              </Dropdown>
            </div>
            <div className="col-4 flex flex-col">
              <h4>Chọn thời gian</h4>
              <div className="time flex">
                <DatePicker
                  suffixIcon={<CalendarOutlined style={{ color: '#ff9138' }} />}
                  className="ant-input-sm"
                  defaultValue={dayjs('30/06/2023', dateFormatList[0])}
                  format={dateFormatList}
                />
                <CaretRightOutlined style={{ color: '#ff9138' }} />
                <DatePicker
                  suffixIcon={<CalendarOutlined style={{ color: '#ff9138' }} />}
                  className="ant-input-sm"
                  defaultValue={dayjs('30/06/2023', dateFormatList[0])}
                  format={dateFormatList}
                />
              </div>
              <FixedCard
                title={'Thêm mới'}
                href={'/addService'}
                icon={<PlusSquareFilled />}
                className={'mod'}
              />
            </div>

            <div className="col offset-1 d-flex flex-col ">
              <h4>Từ khóa</h4>
              <Input
                size="large"
                placeholder="nhập từ khóa"
                suffix={<SearchOutlined style={{ marginLeft: '8px', color: '#ff9138' }} />}
              />
            </div>
            <div className="" style={{ width: '1080px' }}>
              <Table columns={columns} dataSource={data} className="table-striped" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Divice;
