import React from 'react';
import { Badge, Breadcrumb, Card, Col, Layout, Row, Space } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';

import LeftMenu from '@view/Components/Leftmenu';
import FixedCard from '@view/Components/FixedCard';
import Header from '@view/Components/Header';

const { Content } = Layout;

function DetailProgressives() {
  const data = [
    {
      label: 'Họ tên:',
      value: 'Nguyễn đức thanh',
    },
    {
      label: 'Tên dịch vụ:',
      value: 'Khám tai mũi họng',
    },
    {
      label: 'Số thứ tự:',
      value: '038213',
    },
    {
      label: 'Thời gian cấp:',
      value: '10:10-10/10/2023',
    },
    {
      label: 'Hạn sử dụng:',
      value: '10:10-10/10/2023',
    },
  ];

  const renderData = data.map(item => (
    <p key={item.label}>
      <span className="me-5 fw-bold">{item.label}</span>
      {item.value}
    </p>
  ));
  return (
    <div className="flex">
      <LeftMenu />=
      <Layout>
        <Content>
          <div className="container">
            <div className="row ">
              <div className="col ">
                <Header
                  headerContent={
                    <Breadcrumb className="custom-breadcrumb">
                      <Breadcrumb.Item>Cấp số</Breadcrumb.Item>
                      <Breadcrumb.Item>Danh sách cấp số</Breadcrumb.Item>
                      <Breadcrumb.Item>
                        <span style={{ color: '#ff9138' }}> Chi tiết </span>
                      </Breadcrumb.Item>
                    </Breadcrumb>
                  }
                />
              </div>
            </div>
            <div className="pt-5">
              <h2 style={{ color: '#ff9138' }}>Quản lý cấp số</h2>
            </div>
            <div className="row " style={{ width: '90%' }}>
              <div className="col-10 mt-3">
                <Card>
                  <h3 style={{ color: '#ff9138', margin: '10px 0px' }}>Thông tin cấp số</h3>
                  <div className="row">
                    <div className="col">
                      <Row>
                        <Col span={12}>
                          <Space direction="vertical">{renderData}</Space>
                        </Col>
                        <Col span={12}>
                          <Space direction="vertical">
                            <p>
                              <span className="me-5 fw-bold">Nguồn cấp:</span> Kiosk
                            </p>
                            <p>
                              <span className="me-5 fw-bold">Trạng thái:</span>
                              <Badge status="processing" text="Đang chờ" />
                            </p>
                            <p>
                              <span className="me-5 fw-bold">Số điện thoại:</span> 03219837210
                            </p>
                            <p>
                              <span className="me-5 fw-bold">Địa chỉ Email:</span> abc@gmail.com
                            </p>
                          </Space>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="col-2 mt-3">
                <FixedCard
                  href={'/progressitive'}
                  icon={<RollbackOutlined className="fs-4" />}
                  title={'Quay lại'}
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

export default DetailProgressives;
