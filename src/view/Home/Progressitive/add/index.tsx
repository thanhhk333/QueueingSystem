import React from 'react';
import { Breadcrumb, Button, Card, Dropdown, Form, Layout, Space } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';

import LeftMenu from '@view/Components/Leftmenu';
import Header from '@view/Components/Header';
const { Content } = Layout;
interface MenuItem {
  label: string;
  key: string;
}
interface MenuServiceProps {
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
function AddPro() {
  return (
    <div className="flex">
      <LeftMenu />

      <Layout>
        <Layout>
          <Content>
            <div className="container">
              <div className="row">
                <div className="col">
                  <Header
                    headerContent={
                      <Breadcrumb className="custom-breadcrumb">
                        <Breadcrumb.Item>Cấp số</Breadcrumb.Item>
                        <Breadcrumb.Item>Danh sách cấp số</Breadcrumb.Item>
                        <Breadcrumb.Item>
                          <span style={{ color: '#ff9138' }}> Cấp số mới </span>
                        </Breadcrumb.Item>
                      </Breadcrumb>
                    }
                  />
                </div>
              </div>
              <div className="pt-5">
                <h2 style={{ color: '#ff9138' }}>Quản lý cấp số</h2>
              </div>
              <div className="mt-3">
                <Card>
                  <h1 className="text-center my-16" style={{ color: '#FF9138' }}>
                    CẤP SỐ MỚI
                  </h1>
                  <p className="text-center fw-bold">Dịch vụ khách hàng lựa chọn</p>
                  <p className="text-center">
                    <Form>
                      <Form.Item>
                        <Dropdown menu={menuService}>
                          <Button
                            style={{
                              background: '#fff',
                              width: '30%',
                              border: '2px solid rgba(212, 212, 215, 1)',
                              fontSize: '16px',
                              lineHeight: '16px',
                              padding: '10px, 12px, 10px, 12px',
                              color: 'black',
                              borderRadius: '8px',
                            }}
                            size="middle"
                          >
                            <Space className="flex justify-between mx-3">
                              Tất cả
                              <CaretDownOutlined style={{ color: '#ff9138' }} />
                            </Space>
                          </Button>
                        </Dropdown>
                      </Form.Item>
                      <div className="col-6 text-center offset-3 mt-5">
                        <Form.Item>
                          <Button
                            htmlType="submit"
                            type="primary"
                            className="normal-button mr-5 px-10"
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
                            className="normal-button px-10"
                            style={{
                              backgroundColor: '#FF9138',
                              color: '#fff',
                              border: '1px solid #FF9138',
                            }}
                          >
                            In số
                          </Button>
                        </Form.Item>
                      </div>
                    </Form>
                  </p>
                </Card>
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default AddPro;
