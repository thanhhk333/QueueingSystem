import React from 'react';
import { Breadcrumb, Button, Card, Checkbox, Form, Input, Layout, Space } from 'antd';

import TextArea from 'antd/es/input/TextArea';
import Header from '@view/Components/Header';
import LeftMenu from '@view/Components/Leftmenu';
const { Content } = Layout;

function UpdateServices() {
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
                        <span style={{ color: '#ff9138' }}>Cập nhật dịch vụ</span>
                      </Breadcrumb.Item>
                    </Breadcrumb>
                  }
                />
              </div>
            </div>
            <div>
              <h4 style={{ color: '#FF7506' }}>Quản lý dịch vụ</h4>
            </div>
            <div className="mt-3">
              <Card style={{ width: 1140 }}>
                <h6 style={{ color: '#FF7506' }}>Thông tin dịch vụ</h6>
                <Form className="mt-3">
                  <div className="row">
                    <div className="col-6">
                      <div className="row">
                        <div className="col-12">
                          <label htmlFor="" className="mb-2">
                            Mã dịch vụ: <span style={{ color: '#FF7506' }}>*</span>
                          </label>
                          <Form.Item className="">
                            <Input placeholder="203" />
                          </Form.Item>
                        </div>
                        <div className="col-12">
                          <label htmlFor="" className="mb-2">
                            Tên dịch vụ: <span style={{ color: '#FF7506' }}>*</span>
                          </label>
                          <Form.Item className="">
                            <Input placeholder="Khám tim mạch" />
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <label htmlFor="" className="mb-2">
                        Mô tả: <span style={{ color: '#FF7506' }}>*</span>
                      </label>
                      <Form.Item className="">
                        <TextArea rows={5} placeholder="Mô tả dịch vụ" maxLength={6} />
                      </Form.Item>
                    </div>
                  </div>
                </Form>
                <h6 style={{ color: '#FF7506' }}>Quy tắc cấp số</h6>
                <div>
                  <Space wrap>
                    <Checkbox className="blue-checkbox">Tăng tự động</Checkbox>
                    <Input value="0001" className="w-24" />
                    <p className="mx-2 mb-2">đến</p>
                    <Input value="0009" className="w-24" />
                  </Space>
                </div>

                <div style={{ margin: '10px 0' }}>
                  <Space wrap>
                    <Checkbox className="blue-checkbox">Prefix</Checkbox>
                    <Input value="0001" className="w-24" />
                  </Space>
                </div>

                <div style={{ margin: '10px 0' }}>
                  <Space wrap>
                    <Checkbox className="blue-checkbox">Suffix</Checkbox>
                    <Input value="0001" className="w-24" />
                  </Space>
                </div>

                <div>
                  <Space wrap>
                    <Checkbox className="blue-checkbox">Reset mỗi ngày</Checkbox>
                  </Space>
                </div>
                <div className="mt-4 text-right">
                  <span style={{ color: '#FF7506' }}>*</span>{' '}
                  <small>Là trường hợp thông tin bắt buộc</small>
                </div>
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
                    Cập nhật dịch vụ
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

export default UpdateServices;
