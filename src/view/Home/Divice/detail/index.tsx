import React from 'react';
import { Breadcrumb, Card, Layout, Space, Row, Col } from 'antd';
import { EditFilled } from '@ant-design/icons';

import LeftMenu from '@view/Components/Leftmenu';
import Header from '@view/Components/Header';

import FixedCard from '@view/Components/FixedCard';

const { Content } = Layout;

function AddDevices() {
  return (
    <div className="d-flex">
      <LeftMenu />
      <Layout>
        <Layout>
          <Content>
            <div className="container">
              <div className="row mt-2">
                <Header
                  headerContent={
                    <Breadcrumb className="custom-breadcrumb">
                      <Breadcrumb.Item>Thiết bị</Breadcrumb.Item>
                      <Breadcrumb.Item> Danh sách thiết bị</Breadcrumb.Item>
                      <Breadcrumb.Item>
                        <span style={{ color: '#ff9138' }}>Chi tiết thiết bị</span>
                      </Breadcrumb.Item>
                    </Breadcrumb>
                  }
                />
              </div>
              <div className="pt-5">
                <h4 style={{ color: '#ff9138' }}>Quản lý thiết bị</h4>
              </div>
              <div className="row">
                <div className="col-10 mt-3">
                  <Card style={{ width: 1050 }}>
                    <h6 style={{ color: '#ff9138' }}>Thông tin thiết bị</h6>
                    <div className="row">
                      <div className="col">
                        <Row>
                          <Col span={12}>
                            <Space direction="vertical">
                              <p>
                                <span className="fw-bold">Mã thiết bị:</span> KOI_02
                              </p>
                              <p>
                                <span className="fw-bold">Tên thiết bị:</span> Kiosk
                              </p>
                              <p>
                                <span className="fw-bold">Địa chỉ IP:</span> 192.168.1.10
                              </p>
                            </Space>
                          </Col>
                          <Col span={12}>
                            <Space direction="vertical">
                              <p>
                                <span className="fw-bold">Loại thiết bị:</span> KOI_02
                              </p>
                              <p>
                                <span className="fw-bold">Tên đăng nhập:</span> Thanh nguyễn
                              </p>
                              <p>
                                <span className="fw-bold">Mật khẩu:</span> 1234
                              </p>
                            </Space>
                          </Col>
                        </Row>
                      </div>
                      <div className="col-12">
                        <p className="fw-bold">Dịch vụ sử dụng:</p>
                        <span>
                          Khám tim mạch, Khám sản - Phụ khoa, Khám răng hàm mặt, Khám tai mũi họng,
                          Khám hô hấp, Khám tổng quát.
                        </span>
                      </div>
                    </div>
                  </Card>
                </div>
                <div className="col-2 mt-3">
                  <FixedCard
                    href={'/editDivice'}
                    title={'Cập nhật'}
                    icon={<EditFilled />}
                    className={undefined}
                  />
                </div>
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default AddDevices;
