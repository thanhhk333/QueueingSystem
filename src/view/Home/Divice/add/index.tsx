import React from 'react';
import { Breadcrumb, Button, Card, Form, Input, Layout, Select } from 'antd';
import LeftMenu from '@view/Components/Leftmenu';
import Header from '@view/Components/Header';

const { Content } = Layout;

function AddDevices() {
  return (
    <div className="d-flex">
      <LeftMenu />
      <Layout>
        <Content style={{}}>
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
            <div className="pt-5">
              <h4 style={{ color: '#FF7506' }}>Quản lý thiết bị</h4>
            </div>
            <div className="mt-3">
              <Card style={{ width: 1140 }}>
                <h6 style={{ color: '#FF7506' }}>Thông tin thiết bị</h6>
                <Form className="mt-3">
                  <div className="row">
                    <div className="col-6">
                      <label htmlFor="" className="mb-2">
                        Mã thiết bị: <span style={{ color: '#FF7506' }}>*</span>
                      </label>
                      <Form.Item className="">
                        <Input placeholder="Nhập mã thiết bị" />
                      </Form.Item>
                    </div>
                    <div className="col-6">
                      <label htmlFor="" className="mb-2">
                        Loại thiết bị: <span style={{ color: '#FF7506' }}>*</span>
                      </label>
                      <Form.Item>
                        <Select defaultValue="all">
                          <Select.Option value="all">Chọn loại thiết bị</Select.Option>
                          <Select.Option value="connected">Kết nối</Select.Option>
                          <Select.Option value="disconnected">Mất kết nối</Select.Option>
                        </Select>
                      </Form.Item>
                    </div>
                    <div className="col-6">
                      <label htmlFor="" className="mb-2">
                        Tên thiết bị: <span style={{ color: '#FF7506' }}>*</span>
                      </label>
                      <Form.Item className="">
                        <Input placeholder="Nhập tên thiết bị" />
                      </Form.Item>
                    </div>
                    <div className="col-6">
                      <label htmlFor="" className="mb-2">
                        Tên đăng nhập: <span style={{ color: '#FF7506' }}>*</span>
                      </label>
                      <Form.Item className="">
                        <Input placeholder="Nhập tài khoản" />
                      </Form.Item>
                    </div>
                    <div className="col-6">
                      <label htmlFor="" className="mb-2">
                        Địa chỉ IP: <span style={{ color: '#FF7506' }}>*</span>
                      </label>
                      <Form.Item className="">
                        <Input placeholder="Nhập địa chỉ IP" />
                      </Form.Item>
                    </div>
                    <div className="col-6">
                      <label htmlFor="" className="mb-2">
                        Mật khẩu: <span style={{ color: '#FF7506' }}>*</span>
                      </label>
                      <Form.Item className="">
                        <Input placeholder="Nhập mật khẩu" />
                      </Form.Item>
                    </div>
                    <div className="col-12">
                      <label htmlFor="" className="mb-2">
                        Dịch vụ sử dụng: <span style={{ color: '#FF7506' }}>*</span>
                      </label>
                      <Form.Item className="">
                        <Input placeholder="Nhập dịch vụ sử dụng" />
                      </Form.Item>
                    </div>
                    <div className="col-4 mb-5 pb-1 text-right">
                      <span style={{ color: '#FF7506' }}>*</span>{' '}
                      <small>Là trường hợp thông tin bắt buộc</small>
                    </div>
                  </div>
                </Form>
              </Card>
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
          </div>
        </Content>
      </Layout>
    </div>
  );
}

export default AddDevices;
