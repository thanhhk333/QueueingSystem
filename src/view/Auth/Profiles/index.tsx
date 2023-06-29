import { Button, Col, Divider, Form, Input, Row } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './profile.scss';

import Avatar from '../../../shared/assets/images/avatar.jpg';
import LeftMenu from '@view/Components/Leftmenu';

import { BellFilled } from '@ant-design/icons';
import Header from '@view/Components/Header';

const Proflie = () => {
  return (
    <>
      <div className="flex_home" style={{ background: '#EAEAEC', minHeight: '100 vh' }}>
        <div className="menu " style={{ background: '#fff' }}>
          <LeftMenu />
        </div>

        <div className="w-full">
          <Header />

          <div
            className="form h-fit rounded-md w-80  p-5 ps-12"
            id="form"
            style={{ background: '#fff' }}
          >
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col className="gutter-row d-flex align-center justify-center flex-col" span={6}>
                <img
                  src={Avatar}
                  alt=""
                  className="rounded-circle w-100 h-80 mx-auto  border-2 border-gray-300"
                />
                <h3 className="mx-auto">Nguyễn Đức Thanh</h3>
              </Col>
              <Col className="gutter-row" span={9}>
                <Form layout="vertical">
                  <Form.Item
                    label="Tên người dùng"
                    labelCol={{ span: 20 }}
                    wrapperCol={{ span: 22 }}
                  >
                    <Input placeholder="Thanh" style={{ background: '#EAEAEC', fontSize: 12 }} />
                  </Form.Item>
                  <Form.Item
                    label="Số điện thoại"
                    labelCol={{ span: 20 }}
                    wrapperCol={{ span: 22 }}
                  >
                    <Input
                      placeholder="033218321"
                      style={{ background: '#EAEAEC', fontSize: 12 }}
                    />
                  </Form.Item>
                  <Form.Item label="Email:" labelCol={{ span: 20 }} wrapperCol={{ span: 22 }}>
                    <Input
                      placeholder="thanhhk333@gmail.com"
                      style={{ background: '#EAEAEC', fontSize: 12 }}
                    />
                  </Form.Item>
                </Form>
              </Col>
              <Col className="gutter-row" span={9}>
                <Form layout="vertical">
                  <Form.Item
                    label="Tên đăng nhập: "
                    labelCol={{ span: 20 }}
                    wrapperCol={{ span: 22 }}
                  >
                    <Input placeholder="thanhx" style={{ background: '#EAEAEC', fontSize: 12 }} />
                  </Form.Item>
                  <Form.Item label="Mật khẩu" labelCol={{ span: 20 }} wrapperCol={{ span: 22 }}>
                    <Input placeholder="4324" style={{ background: '#EAEAEC', fontSize: 12 }} />
                  </Form.Item>
                  <Form.Item label="Vai trò" labelCol={{ span: 20 }} wrapperCol={{ span: 22 }}>
                    <Input placeholder="IT" style={{ background: '#EAEAEC', fontSize: 12 }} />
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};
export default Proflie;
