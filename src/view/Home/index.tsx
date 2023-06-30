import React from 'react';
import { Badge, Button, Card, Layout, Popover, Progress, Statistic, Tag } from 'antd';
import { ArrowUpOutlined, BellFilled, CalendarOutlined, PicRightOutlined } from '@ant-design/icons';

import Sider from 'antd/es/layout/Sider';
import { Link } from 'react-router-dom';
import LeftMenu from '../Components/Leftmenu';

const { Content } = Layout;
const popoverContent = (
  <Card title="Thông báo" className="p-0 m-0" bordered={false} style={{ width: 270 }}></Card>
);

function Dashboard() {
  return (
    <div className="flex">
      <LeftMenu />
      <Layout className="layout">
        <Layout>
          <Content style={{ margin: '16px' }}>
            <div className="container">
              <div className="row mt-2">
                <div className="col">
                  <p className="fs-5" style={{ color: '#FF7506' }}>
                    Thông tin đăng nhập
                  </p>
                </div>
              </div>
              <div className="pt-5">
                <h4 style={{ color: '#FF7506' }}>Biểu đồ cấp số </h4>
                <div className="row row-cols-4 mt-4">
                  <div className="col">
                    <Card className="shadow" style={{ width: 170, height: 130 }}>
                      <div className="row align-items-center">
                        <div className="col-4 p-0">
                          <Button
                            style={{ width: 45, height: 45 }}
                            type="primary"
                            shape="circle"
                            icon={<CalendarOutlined style={{ fontSize: 24 }} />}
                          />
                        </div>
                        <div className="col-6 ps-2">
                          <span style={{ fontSize: 12 }} className="">
                            Số thứ tự đã cấp
                          </span>
                        </div>

                        <div className="col-6 p-0 my-3 pt-1 text-start">
                          <h4 style={{ fontSize: 25 }}>3.452</h4>
                        </div>
                        <div className="col-6 ps-4 my-3 text-end">
                          <Tag style={{ background: '#FF950126', borderRadius: 30 }}>
                            <Statistic
                              value={11.28}
                              precision={2}
                              valueStyle={{ color: '#FF9138', fontSize: 7 }}
                              prefix={<ArrowUpOutlined style={{ fontSize: 7 }} />}
                              suffix="%"
                            />
                          </Tag>
                        </div>
                      </div>
                    </Card>
                  </div>
                  <div className="col">
                    <Card className="shadow" style={{ width: 170, height: 130 }}>
                      <div className="row align-items-center">
                        <div className="col-4 p-0">
                          <Button
                            style={{ width: 45, height: 45 }}
                            type="primary"
                            shape="circle"
                            icon={<CalendarOutlined style={{ fontSize: 24 }} />}
                          />
                        </div>
                        <div className="col-6 ps-2 p-0">
                          <span style={{ fontSize: 12 }} className="">
                            Số thứ tự đã sử dụng
                          </span>
                        </div>

                        <div className="col-6 p-0 my-3 pt-1 text-start">
                          <h4 style={{ fontSize: 25 }}>3.452</h4>
                        </div>
                        <div className="col-6 ps-4 my-3 text-end">
                          <Tag style={{ background: '#FF950126', borderRadius: 30 }}>
                            <Statistic
                              value={11.28}
                              precision={2}
                              valueStyle={{ color: '#FF9138', fontSize: 7 }}
                              prefix={<ArrowUpOutlined style={{ fontSize: 7 }} />}
                              suffix="%"
                            />
                          </Tag>
                        </div>
                      </div>
                    </Card>
                  </div>
                  <div className="col">
                    <Card className="shadow" style={{ width: 170, height: 130 }}>
                      <div className="row align-items-center">
                        <div className="col-4 p-0">
                          <Button
                            style={{ width: 45, height: 45 }}
                            type="primary"
                            shape="circle"
                            icon={<CalendarOutlined style={{ fontSize: 24 }} />}
                          />
                        </div>
                        <div className="col-6 ps-2 p-0">
                          <span style={{ fontSize: 12 }} className="">
                            Số thứ tự đang chờ
                          </span>
                        </div>

                        <div className="col-6 p-0 my-3 pt-1 text-start">
                          <h4 style={{ fontSize: 25 }}>3.452</h4>
                        </div>
                        <div className="col-6 ps-4 my-3 text-end">
                          <Tag style={{ background: '#FF950126', borderRadius: 30 }}>
                            <Statistic
                              value={11.28}
                              precision={2}
                              valueStyle={{ color: '#FF9138', fontSize: 7 }}
                              prefix={<ArrowUpOutlined style={{ fontSize: 7 }} />}
                              suffix="%"
                            />
                          </Tag>
                        </div>
                      </div>
                    </Card>
                  </div>
                  <div className="col">
                    <Card className="shadow" style={{ width: 170, height: 130 }}>
                      <div className="row align-items-center">
                        <div className="col-4 p-0">
                          <Button
                            style={{ width: 45, height: 45 }}
                            shape="circle"
                            icon={<CalendarOutlined style={{ fontSize: 24 }} />}
                          />
                        </div>
                        <div className="col-6 ps-2 p-0">
                          <span style={{ fontSize: 12 }} className="">
                            Số thứ tự đã bỏ qua
                          </span>
                        </div>

                        <div className="col-6 p-0 my-3 pt-1 text-start">
                          <h4 style={{ fontSize: 25 }}>3.452</h4>
                        </div>
                        <div className="col-6 ps-4 my-3 text-end">
                          <Tag style={{ background: '#FF950126', borderRadius: 30 }}>
                            <Statistic
                              value={11.28}
                              precision={2}
                              valueStyle={{ color: '#FF9138', fontSize: 7 }}
                              prefix={<ArrowUpOutlined style={{ fontSize: 7 }} />}
                              suffix="%"
                            />
                          </Tag>
                        </div>
                      </div>
                    </Card>
                  </div>
                  <div className="col-12 mt-4">
                    <Card className="shadow">Bieu do</Card>
                  </div>
                </div>
              </div>
            </div>
          </Content>
          <Sider width={410} theme="light">
            <div className="row mt-2">
              <div className="col-12">
                <span className="d-flex align-items-center justify-content-center">
                  <Button style={{ background: '#FFF2E7' }} type="ghost" shape="circle">
                    <Popover placement="bottomLeft" content={popoverContent} trigger="click">
                      <BellFilled
                        style={{ color: '#FF7506' }}
                        className="fs-5 d-flex align-items-center justify-content-center"
                      />
                    </Popover>
                  </Button>
                  <Link to={'/admin'}>
                    <img
                      style={{
                        width: 50,
                        height: 50,
                        marginLeft: 10,
                        borderRadius: '50%',
                      }}
                      src="./assets/image/logo.jpg"
                      alt=""
                    />
                  </Link>

                  <span className="ms-2">
                    <Link to={'/admin'} className="text-decoration-none" style={{ color: 'black' }}>
                      <p className="mb-0">Xin chào</p>
                      <p className="mb-0 fw-bold">Thạch Lê Trung Hiếu</p>
                    </Link>
                  </span>
                </span>
              </div>
              <div className="col mt-4 pt-2 ms-3">
                <h4 style={{ color: '#FF7506' }}>Tổng quan</h4>
              </div>
              <div className="col-12">
                <Card
                  className="shadow mx-3 d-flex align-items-center justify-content-center"
                  style={{ height: 80 }}
                >
                  <div className="row">
                    <div className="col-3">
                      <Progress type="circle" size={60} percent={90} />
                    </div>
                    <div className="col-3 p-0">
                      <div className="row ">
                        <div className="col-12 p-0">
                          <h4 className="ms-3 me-2 mt-1 fw-bold" style={{ fontSize: 20 }}>
                            4.221
                          </h4>
                        </div>
                        <div className="col-12 p-0">
                          <span
                            style={{ fontSize: 12, color: '#FF7506' }}
                            className="me-4 pe-2 d-flex align-items-center justify-content-center"
                          >
                            <PicRightOutlined className="p-1" />
                            Thiết bị
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-5 p-0">
                      <div className="row">
                        <div className="col-9 my-1 p-0">
                          <Badge color="#FFD130" text="Đang hoạt động" />{' '}
                        </div>
                        <div className="col-3 my-1">
                          <span className="text-end fw-bold" style={{ color: '#FF7506' }}>
                            276
                          </span>
                        </div>
                        <div className="col-9 p-0">
                          <Badge color="#7E7D88" text="Ngưng hoạt động" />{' '}
                        </div>
                        <div className="col-3">
                          <span className="text-end fw-bold" style={{ color: '#FF7506' }}>
                            4.221
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="col-12 my-3">
                <Card className="shadow mx-3 d-flex align-items-center" style={{ height: 80 }}>
                  <div className="row">
                    <div className="col-3">
                      <Progress type="circle" size={60} percent={76} />
                    </div>
                    <div className="col-3 p-0">
                      <div className="row">
                        <div className="col-12 p-0">
                          <h4 className="ms-3 me-2 mt-1 fw-bold" style={{ fontSize: 20 }}>
                            4.324
                          </h4>
                        </div>
                        <div className="col-12 p-0">
                          <span
                            style={{ fontSize: 12, color: '#4277FF' }}
                            className="me-4 pe-2 d-flex align-items-center justify-content-center"
                          >
                            <PicRightOutlined className="p-1" />
                            Dịch vụ
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-5 p-0">
                      <div className="row">
                        <div className="col-9 my-1 p-0">
                          <Badge color="#4277FF" text="Đang hoạt động" />{' '}
                        </div>
                        <div className="col-3 my-1">
                          <span className="text-end fw-bold" style={{ color: '#FF7506' }}>
                            3.444
                          </span>
                        </div>
                        <div className="col-9 p-0">
                          <Badge color="#4277FF" text="Ngưng hoạt động" />{' '}
                        </div>
                        <div className="col-3">
                          <span className="text-end fw-bold" style={{ color: '#FF7506' }}>
                            3.44
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="col-12">
                <Card className="shadow mx-3 d-flex align-items-center" style={{ height: 80 }}>
                  <div className="row">
                    <div className="col-3">
                      <Progress type="circle" size={60} percent={86} />
                    </div>
                    <div className="col-3 p-0">
                      <div className="row">
                        <div className="col-12 p-0">
                          <h4 className="ms-3 me-2 mt-1 fw-bold" style={{ fontSize: 20 }}>
                            4.324
                          </h4>
                        </div>
                        <div className="col-12 p-0">
                          <span
                            style={{ fontSize: 12, color: '#35C75A' }}
                            className="me-4 pe-2 d-flex align-items-center justify-content-center"
                          >
                            <PicRightOutlined className="p-1" />
                            Cấp số
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-5 p-0">
                      <div className="row">
                        <div className="col-9 p-0">
                          <Badge color="#35C75A" text="Đang chờ" />{' '}
                        </div>
                        <div className="col-3 ">
                          <span className="text-end fw-bold" style={{ color: '#FF7506' }}>
                            3.444
                          </span>
                        </div>
                        <div className="col-9 p-0">
                          <Badge color="#35C75A" text="Đã sử dụng" />{' '}
                        </div>
                        <div className="col-3">
                          <span className="text-end fw-bold" style={{ color: '#FF7506' }}>
                            3.444
                          </span>
                        </div>
                        <div className="col-9 p-0">
                          <Badge color="#35C75A" text="Bỏ qua" />{' '}
                        </div>
                        <div className="col-3">
                          <span className="text-end fw-bold" style={{ color: '#FF7506' }}>
                            3.44
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="col">
                <Card className="shadow mx-3 mt-4 d-flex align-items-center" style={{ height: 80 }}>
                  Lich
                </Card>
              </div>
            </div>
          </Sider>
        </Layout>
      </Layout>
    </div>
  );
}

export default Dashboard;
