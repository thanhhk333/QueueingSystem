import React from 'react';
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  Input,
  Layout,
  MenuProps,
  Row,
  Space,
} from 'antd';
import LeftMenu from '@view/Components/Leftmenu';
import Header from '@view/Components/Header';
import { CaretDownOutlined } from '@ant-design/icons';

const { Content } = Layout;

function AddDevices() {
  const items: MenuProps['items'] = [
    {
      label: 'Kiosk',
      key: '1',
    },
    {
      label: 'Display counter',
      key: '2',
    },
  ];

  const menuProps = {
    items,
  };
  return (
    <div className="d-flex">
      <LeftMenu />
      <Layout>
        <Content>
          <div className="container">
            <div className="row ">
              <div className="col ">
                <Header
                  headerContent={
                    <Breadcrumb className="custom-breadcrumb">
                      <Breadcrumb.Item>Thiết bị</Breadcrumb.Item>
                      <Breadcrumb.Item> Danh sách thiết bị</Breadcrumb.Item>
                      <Breadcrumb.Item>
                        <span style={{ color: '#ff9138' }}>Thêm thiết bị</span>
                      </Breadcrumb.Item>
                    </Breadcrumb>
                  }
                />
              </div>
            </div>

            <h2 style={{ color: '#FF7506' }}>Quản lý thiết bị</h2>

            <div className="mt-3">
              <Card style={{ width: 1140 }}>
                <h4 style={{ color: '#FF7506' }}>Thông tin thiết bị</h4>
                <Form className="mt-3">
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <label className="mb-2">
                        Họ tên: <span className="text-danger">*</span>
                      </label>
                      <Form.Item>
                        <Input placeholder="Nhập mã thiết bị" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <label className="mb-2">
                        Loại thiết bị: <span className="text-danger">*</span>
                      </label>
                      <Form.Item>
                        <Dropdown menu={menuProps}>
                          <Button
                            style={{
                              width: '100%',
                              fontSize: '16px',
                              lineHeight: '16px',
                              padding: '10px, 12px, 10px, 12px',
                              color: 'black',
                              borderRadius: '8px',
                            }}
                            size="middle"
                          >
                            <Space className="flex justify-between mx-3">
                              Kiosk
                              <CaretDownOutlined style={{ color: '#ff9138' }} />
                            </Space>
                          </Button>
                        </Dropdown>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <label className="mb-2">
                        Tên thiết bị: <span className="text-danger">*</span>
                      </label>
                      <Form.Item>
                        <Input placeholder="Nhập tên thiết bị" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <label className="mb-2">
                        Tên đăng nhập: <span className="text-danger">*</span>
                      </label>
                      <Form.Item>
                        <Input placeholder="Nhập tài khoản" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <label className="mb-2">
                        Địa chỉ IP: <span className="text-danger">*</span>
                      </label>
                      <Form.Item>
                        <Input placeholder="Nhập địa chỉ IP" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <label className="mb-2">
                        Mật khẩu: <span className="text-danger">*</span>
                      </label>
                      <Form.Item>
                        <Input placeholder="Nhập mật khẩu" />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <label className="mb-2">
                        Dịch vụ sử dụng: <span className="text-danger">*</span>
                      </label>
                      <Form.Item>
                        <Input placeholder="Nhập dịch vụ sử dụng" />
                      </Form.Item>
                    </Col>
                    <Col span={24} className="text-right">
                      <span className="text-danger">*</span>
                      <small>Là trường hợp thông tin bắt buộc</small>
                    </Col>
                  </Row>
                </Form>
              </Card>
            </div>
            <div className="col-6 text-center offset-3 mt-3">
              <Form.Item>
                <Button
                  htmlType="submit"
                  type="primary"
                  className="normal-button mr-5 "
                  style={{
                    backgroundColor: 'white',
                    color: '#FF9138',
                    border: '1px solid #FF9138',
                  }}
                >
                  Hủy
                </Button>
                <Button
                  htmlType="submit"
                  type="primary"
                  className="normal-button"
                  style={{
                    backgroundColor: '#FF9138',
                    color: '#fff',
                    border: '1px solid #FF9138',
                  }}
                >
                  Thêm thiết bị
                </Button>
              </Form.Item>
            </div>
          </div>
        </Content>
      </Layout>
    </div>
  );
}

export default AddDevices;
