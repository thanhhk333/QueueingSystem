/* eslint-disable @typescript-eslint/indent */
import React from 'react';
import {
  Badge,
  Breadcrumb,
  Button,
  Card,
  Col,
  DatePicker,
  Dropdown,
  Form,
  Input,
  Layout,
  MenuProps,
  Pagination,
  Row,
  Space,
  Table,
} from 'antd';
import {
  CalendarOutlined,
  CaretDownOutlined,
  CaretRightFilled,
  SearchOutlined,
} from '@ant-design/icons';

import Column from 'antd/es/table/Column';
import LeftMenu from '@view/Components/Leftmenu';
import Header from '@view/Components/Header';
import DoubleFixedCard from '@view/Components/DoubleFixedCard';
const { Content } = Layout;
const items: MenuProps['items'] = [
  {
    label: 'Tất cả',
    key: '1',
  },
  {
    label: 'Đã hoạt động',
    key: '2',
  },
  {
    label: 'Ngưng hoạt động',
    key: '3',
  },
  {
    label: 'vắng',
    key: '4',
  },
];

const menuProps = {
  items,
};

const data = [
  { id: 1, isActive: true, isAbsent: false },
  { id: 2, isActive: false, isAbsent: false },
  { id: 3, isActive: false, isAbsent: true },
  { id: 4, isActive: true, isAbsent: false },
  { id: 5, isActive: true, isAbsent: false },
  { id: 6, isActive: false, isAbsent: true },
];
function DetailServices() {
  return (
    <div className="flex">
      <LeftMenu />

      <Layout>
        <Content>
          <div className="container">
            <div className="row ">
              <div className="col ">
                <Header
                  headerContent={
                    <Breadcrumb className="custom-breadcrumb">
                      <Breadcrumb.Item>Dịch vụ</Breadcrumb.Item>
                      <Breadcrumb.Item>Danh sách dịch vụ</Breadcrumb.Item>

                      <Breadcrumb.Item>
                        <span style={{ color: '#ff9138' }}>Chi tiết</span>
                      </Breadcrumb.Item>
                    </Breadcrumb>
                  }
                />
              </div>
            </div>
            <div className="pt-5">
              <h2 style={{ color: '#ff9138' }}>Quản lý dịch vụ</h2>
            </div>
            <div className="row mt-3">
              <div className="col-4 mt-3">
                <Card style={{ height: 530 }}>
                  <h3 style={{ color: '#ff9138' }}>Thông tin dịch vụ</h3>
                  <Form className="mt-3">
                    <Space direction="vertical" className="custom-space">
                      <div>
                        <label className="fw-bold">Mã dịch vụ:</label>
                        <label className="ms-3">
                          <small>308921</small>
                        </label>
                      </div>
                      <div>
                        <label className="fw-bold">Tên dịch vụ:</label>
                        <label className="ms-3">
                          <small>Khám tim mạch</small>
                        </label>
                      </div>
                      <div>
                        <label className="fw-bold">Mô tả:</label>
                        <label className="ms-3">
                          <small>Chuyên các bệnh lý về tim</small>
                        </label>
                      </div>
                    </Space>
                  </Form>
                  <h3 style={{ color: '#ff9138' }}>Quy tắc cấp số</h3>

                  <Row>
                    <Col span={24}>
                      <Space direction="horizontal" align="center" style={{ marginBottom: 5 }}>
                        <label className="fw-bold">Tăng tự động</label>
                        <Input value="0001" style={{ width: '60px' }} />
                        <p className="mx-2">đến</p>
                        <Input value="0009" style={{ width: '60px' }} />
                      </Space>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Space direction="horizontal" style={{ marginBottom: 5 }}>
                        <label className="fw-bold">Prefix</label>
                        <Input value="0001" style={{ width: '60px', marginLeft: '46px' }} />
                      </Space>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Space direction="horizontal" style={{ marginBottom: 5 }}>
                        <label className="fw-bold">Reset mỗi ngày</label>
                      </Space>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Space direction="horizontal" style={{ marginBottom: 5 }}>
                        <label>
                          <small>Ví dụ: 201-2001</small>
                        </label>
                      </Space>
                    </Col>
                  </Row>
                </Card>
              </div>
              <div className="col-7 mt-3">
                <Card style={{ height: 530 }}>
                  <div className="row">
                    <div className="col-3">
                      <div className="row">
                        <div className="col-12">
                          <label className="fw-bold">Trạng thái</label>
                        </div>
                        <div className="col-12">
                          <Dropdown menu={menuProps}>
                            <Button
                              style={{
                                background: '#fff',
                                border: '1px solid rgba(212, 212, 215, 1)',
                                fontSize: '14px',
                                lineHeight: '16px',
                                padding: '10px, 12px, 10px, 12px',
                                color: 'black',
                                borderRadius: '8px',
                              }}
                              size="middle"
                            >
                              <Space className="flex justify-between mx-1">
                                Tất cả
                                <CaretDownOutlined style={{ color: '#ff9138' }} />
                              </Space>
                            </Button>
                          </Dropdown>
                        </div>
                      </div>
                    </div>

                    <div className="col-5 ">
                      <div className="row">
                        <div className="col-12">
                          <label className="fw-bold">Chọn thời gian</label>
                        </div>
                        <div className="col-6 flex">
                          <DatePicker
                            suffixIcon={<CalendarOutlined style={{ color: '#ff9138' }} />}
                            size="small"
                          />
                          <CaretRightFilled style={{ color: '#ff9138', marginLeft: '5px' }} />
                        </div>
                        <div className="col-6">
                          <DatePicker
                            suffixIcon={<CalendarOutlined style={{ color: '#ff9138' }} />}
                            size="small"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-4">
                      <div className="row">
                        <div className="col-12">
                          <label className="fw-bold">Từ khóa</label>
                        </div>
                        <div className="col-12">
                          <Input
                            size="middle"
                            placeholder="nhập từ khóa"
                            suffix={
                              <SearchOutlined style={{ marginLeft: '8px', color: '#ff9138' }} />
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <Table
                      dataSource={data}
                      pagination={false}
                      size="small"
                      className="custom-table mb-4 pb-3"
                    >
                      <Column
                        title={<span className="table-title">Số thứ tự</span>}
                        dataIndex="id"
                        key="id"
                        render={(text: string) => <span>{text}</span>}
                      />
                      <Column
                        title={<span className="table-title">Trạng thái</span>}
                        dataIndex="isActive"
                        key="isActive"
                        render={(isActive: boolean, record: any) => (
                          <Badge
                            color={record.isAbsent ? '#FF6A6A' : '#4277FF'}
                            text={
                              record.isAbsent
                                ? 'Vắng'
                                : isActive
                                ? 'Đã hoàn thành'
                                : 'Đang thực hiện'
                            }
                          />
                        )}
                      />
                    </Table>
                  </div>
                  <Pagination total={100} showSizeChanger={false} style={{ textAlign: 'right' }} />
                </Card>
              </div>
              <div className="col-1">
                <DoubleFixedCard href1={'fd'} href2={'df'} />
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </div>
  );
}

export default DetailServices;
