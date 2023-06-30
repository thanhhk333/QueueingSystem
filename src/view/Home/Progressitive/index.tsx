import React from 'react';
import {
  Badge,
  Breadcrumb,
  Button,
  DatePicker,
  Dropdown,
  Input,
  Layout,
  Pagination,
  Space,
  Table,
} from 'antd';
import {
  CalendarOutlined,
  CaretDownOutlined,
  CaretRightOutlined,
  PlusSquareFilled,
  SearchOutlined,
} from '@ant-design/icons';
import Column from 'antd/es/table/Column';
import { Link } from 'react-router-dom';
import LeftMenu from '@view/Components/Leftmenu';
import Header from '@view/Components/Header';

import FixedCard from '@view/Components/FixedCard';
const { Content } = Layout;
interface MenuItem {
  label: string;
  key: string;
}

interface MenuServiceProps {
  items: MenuItem[];
}

interface MenuSourceProps {
  items: MenuItem[];
}

interface MenuStatusProps {
  items: MenuItem[];
}

const menuService: MenuServiceProps = {
  items: [
    {
      label: 'Tất cả',
      key: '1',
    },
    {
      label: 'Khám sản - Phụ khoa',
      key: '2',
    },
    {
      label: 'Khám răng hàm mặt',
      key: '3',
    },
    {
      label: 'Khám tai mũi họng',
      key: '4',
    },
  ],
};

const menuSource: MenuSourceProps = {
  items: [
    {
      label: 'Tất cả',
      key: '1',
    },
    {
      label: 'Kiosk',
      key: '2',
    },
    {
      label: 'Hệ thống',
      key: '3',
    },
  ],
};

const menuStatus: MenuStatusProps = {
  items: [
    {
      label: 'Tất cả',
      key: '1',
    },
    {
      label: 'Đang chờ',
      key: '2',
    },
    {
      label: 'Đã sử dụng',
      key: '3',
    },
    {
      label: 'Bỏ qua',
      key: '4',
    },
  ],
};

const data = [
  {
    id: 1,
    name: 'Khách hàng 1',
    nameService: 'Dịch vụ 1',
    grantTime: 'Thời gian cấp 1',
    exp: '14:00 10/10/2023',
    status: 'Đã bỏ qua',
    source: 'Nguồn cấp 1',
    detail: 'chi tiết',
  },
  {
    id: 2,
    name: 'Khách hàng 1',
    nameService: 'Dịch vụ 1',
    grantTime: 'Thời gian cấp 1',
    exp: '14:00 10/10/2023',
    status: 'Đã bỏ qua',
    source: 'Nguồn cấp 1',
    detail: 'chi tiết',
  },
  {
    id: 3,
    name: 'Khách hàng 1',
    nameService: 'Dịch vụ 1',
    grantTime: 'Thời gian cấp 1',
    exp: '14:00 10/10/2023',
    status: 'Đã bỏ qua',
    source: 'Nguồn cấp 1',
    detail: 'chi tiết',
  },
  {
    id: 4,
    name: 'Khách hàng 1',
    nameService: 'Dịch vụ 1',
    grantTime: 'Thời gian cấp 1',
    exp: '14:00 10/10/2023',
    status: 'Đã bỏ qua',
    source: 'Nguồn cấp 1',
    detail: 'chi tiết',
  },
  {
    id: 5,
    name: 'Khách hàng 1',
    nameService: 'Dịch vụ 1',
    grantTime: 'Thời gian cấp 1',
    exp: '14:00 10/10/2023',
    status: 'Đã bỏ qua',
    source: 'Nguồn cấp 1',
    detail: 'chi tiết',
  },
  {
    id: 6,
    name: 'Khách hàng 1',
    nameService: 'Dịch vụ 1',
    grantTime: 'Thời gian cấp 1',
    exp: '14:00 10/10/2023',
    status: 'Đã bỏ qua',
    source: 'Nguồn cấp 1',
    detail: 'chi tiết',
  },
];

const renderStatus = (status: string) => {
  let color = '';
  let text = '';

  if (status === 'Đã bỏ qua') {
    color = '#FF0000';
    text = 'Đã bỏ qua';
  } else if (status === 'Đang chờ') {
    color = '#FFA500';
    text = 'Đang chờ';
  } else if (status === 'Đã sử dụng') {
    color = '#008000';
    text = 'Đã sử dụng';
  }

  return <Badge color={color} text={text} />;
};

function ListProgressives() {
  return (
    <div className="flex">
      <LeftMenu />

      <Layout>
        <Content>
          <div className="container">
            <div className="row ">
              <div className="col">
                <Header
                  headerContent={
                    <Breadcrumb className="custom-breadcrumb">
                      <Breadcrumb.Item>Cấp số</Breadcrumb.Item>

                      <Breadcrumb.Item>
                        <span style={{ color: '#ff9138' }}>Danh sách cấp số </span>
                      </Breadcrumb.Item>
                    </Breadcrumb>
                  }
                />
              </div>
            </div>
            <div className="pt-5">
              <h4 style={{ color: '#FF7506' }}>Quản lý cấp số</h4>
            </div>
            <div className="row mt-3 justify-content-center">
              <div className="col-2">
                <div className="row">
                  <div className="col-12">
                    <h4>Tên dịch vụ</h4>
                    <Dropdown menu={menuService}>
                      <Button
                        style={{
                          background: '#fff',
                          width: '100%',
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
                </div>
              </div>

              <div className="col-2 text-start">
                <div className="row">
                  <div className="col-12">
                    <label htmlFor="">Tình trạng</label>
                  </div>
                  <div className="col-12">
                    <Dropdown menu={menuStatus}>
                      <Button
                        style={{
                          background: '#fff',
                          width: '100%',
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
                </div>
              </div>

              <div className="col-2 text-start">
                <div className="row">
                  <div className="col-12">
                    <label htmlFor="">Nguồn cấp</label>
                  </div>
                  <div className="col-12">
                    <Dropdown menu={menuSource}>
                      <Button
                        style={{
                          background: '#fff',
                          width: '100%',
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
                </div>
              </div>
              <div className="col-3 text-start">
                <div className="row">
                  <div className="col-12">
                    <h4>Chọn thời gian</h4>
                    <div className="time flex">
                      <DatePicker suffixIcon={<CalendarOutlined style={{ color: '#ff9138' }} />} />
                      <CaretRightOutlined style={{ color: '#ff9138' }} />
                      <DatePicker suffixIcon={<CalendarOutlined style={{ color: '#ff9138' }} />} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div className="row" style={{ width: 200 }}>
                  <div className="col-12">
                    <h4>Từ khóa</h4>
                    <Input
                      size="large"
                      placeholder="nhập từ khóa"
                      suffix={<SearchOutlined style={{ marginLeft: '8px', color: '#ff9138' }} />}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-11 mt-3">
                <Table dataSource={data} pagination={false} bordered className="mb-3">
                  <Column
                    title={<span className="table-title">STT</span>}
                    dataIndex="id"
                    key="id"
                    render={(text: string) => <span>{text}</span>}
                  />
                  <Column
                    title={<span className="table-title">Tên khách hàng</span>}
                    dataIndex="name"
                    key="name"
                    render={(text: string) => <span>{text}</span>}
                  />
                  <Column
                    title={<span className="table-title">Tên dịch vụ</span>}
                    dataIndex="nameService"
                    key="nameService"
                    render={(text: string) => <span>{text}</span>}
                  />
                  <Column
                    title={<span className="table-title">Thời gian cấp</span>}
                    dataIndex="grantTime"
                    key="gran"
                    render={(text: string) => <span>{text}</span>}
                  />
                  <Column
                    title={<span className="table-title">Hạn sử dụng</span>}
                    dataIndex="exp"
                    key="exp"
                    render={(text: string) => <span>{text}</span>}
                  />
                  <Column
                    title={<span className="table-title">Trạng thái</span>}
                    dataIndex="status"
                    key="status"
                    render={(status: string) => renderStatus(status)}
                  />
                  <Column
                    title={<span className="table-title">Nguồn cấp</span>}
                    dataIndex="source"
                    key="source"
                    render={(text: string) => <span>{text}</span>}
                  />
                  <Column
                    title=""
                    dataIndex="detail"
                    key="detail"
                    render={(text: string) => <Link to={'/detailPro'}>{text}</Link>}
                  />
                </Table>
                <Pagination total={100} showSizeChanger={false} style={{ textAlign: 'right' }} />
              </div>
              <div className="col-1 mt-3">
                <FixedCard
                  href={'/addPro'}
                  title={'Thêm mới'}
                  icon={<PlusSquareFilled />}
                  className={undefined}
                />
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </div>
  );
}

export default ListProgressives;
