import React from 'react';
import { Breadcrumb, Button, Card, Form, Input, Layout, Select, Tag } from 'antd';

import Header from '@view/Components/Header';
import LeftMenu from '@view/Components/Leftmenu';

const { Content } = Layout;

const tags = [
  'Khám tim mạch',
  'Khám sản phụ khoa',
  'Khám răng hàm mặt',
  'Khám tai mũi họng',
  'Khám hô hấp',
  'Khám tổng quát',
];
function UpdateDevices() {
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
                      <Breadcrumb.Item>Thiết bị</Breadcrumb.Item>
                      <Breadcrumb.Item> Danh sách thiết bị</Breadcrumb.Item>
                      <Breadcrumb.Item>
                        <span style={{ color: '#ff9138' }}>Cập nhật thiết bị</span>
                      </Breadcrumb.Item>
                    </Breadcrumb>
                  }
                />
              </div>
            </div>
            <div>
              <h4 style={{ color: '#FF7506' }}>Quản lý thiết bị</h4>
            </div>
            <div className="mt-3">
              <Card style={{ width: 1140, height: 500 }}>
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
                      <Input
                        style={{ height: 100, borderColor: '#FF9138' }}
                        readOnly
                        suffix={
                          <>
                            {tags.map(tag => (
                              <Tag
                                style={{
                                  background: '#FFAC6A',
                                  color: 'white',
                                }}
                                className=" align-items-center justify-end"
                                closable
                              >
                                {tag}
                              </Tag>
                            ))}
                          </>
                        }
                      />
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

export default UpdateDevices;
