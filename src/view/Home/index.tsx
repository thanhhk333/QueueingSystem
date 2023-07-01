import { Form, Input, Row } from 'antd';
import { Col } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Avatar from '../../shared/assets/images/avatar.jpg';
import LeftMenu from '@view/Components/Leftmenu';
import Icon, { CameraOutlined } from '@ant-design/icons';
import { BellFilled } from '@ant-design/icons';
import Header from '@view/Components/Header';

const Proflie = () => {
  return (
    <>
      <div className="flex" style={{ background: 'rgba(246, 246, 246, 1)', height: '100vh' }}>
        <div className="menu " style={{ background: '#fff' }}>
          <LeftMenu />
        </div>

        <div className="w-full">
          <Header />

          <div
            className="form h-fit rounded-md w-80  p-5 ps-12"
            id="form"
            style={{ background: '#fff', marginLeft: '20px', borderRadius: '10px' }}
          >
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col className="gutter-row d-flex align-center justify-center flex-col" span={6}>
                <div style={{ position: 'relative', width: '90%' }}>
                  <div
                    style={{
                      width: '100%',
                      paddingBottom: '100%',
                      position: 'relative',
                      borderRadius: '50%',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={Avatar}
                      alt=""
                      className="w-100 h-100"
                      style={{ borderRadius: '50%', position: 'absolute' }}
                    />
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '5px',
                      right: '5px',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: '#ff9138',
                      border: '2px solid #fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <CameraOutlined style={{ color: 'white', fontWeight: 'bold' }} />
                  </div>
                </div>
                <h3 className="mx-auto mt-10">Nguyễn Đức Thanh</h3>
              </Col>
              <Col className="gutter-row" span={9}>
                <Form layout="vertical">
                  <Form.Item
                    label="Tên người dùng"
                    labelCol={{ span: 20 }}
                    wrapperCol={{ span: 22 }}
                  >
                    <Input
                      placeholder="Thanh"
                      style={{ background: 'rgba(246, 246, 246, 1)', fontSize: 12 }}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Số điện thoại"
                    labelCol={{ span: 20 }}
                    wrapperCol={{ span: 22 }}
                  >
                    <Input
                      placeholder="033218321"
                      style={{ background: 'rgba(246, 246, 246, 1)', fontSize: 12 }}
                    />
                  </Form.Item>
                  <Form.Item label="Email:" labelCol={{ span: 20 }} wrapperCol={{ span: 22 }}>
                    <Input
                      placeholder="thanhhk333@gmail.com"
                      style={{ background: 'rgba(246, 246, 246, 1)', fontSize: 12 }}
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
                    <Input
                      placeholder="thanhx"
                      style={{ background: 'rgba(246, 246, 246, 1)', fontSize: 12 }}
                    />
                  </Form.Item>
                  <Form.Item label="Mật khẩu" labelCol={{ span: 20 }} wrapperCol={{ span: 22 }}>
                    <Input
                      placeholder="4324"
                      style={{ background: 'rgba(246, 246, 246, 1)', fontSize: 12 }}
                    />
                  </Form.Item>
                  <Form.Item label="Vai trò" labelCol={{ span: 20 }} wrapperCol={{ span: 22 }}>
                    <Input
                      placeholder="IT"
                      style={{ background: 'rgba(246, 246, 246, 1)', fontSize: 12 }}
                    />
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
