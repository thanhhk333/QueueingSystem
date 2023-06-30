import '../styles.scss';

import { Button, Checkbox, Form, Input } from 'antd';
import React, { useState } from 'react';
import { Lock, User } from 'react-feather';
import { useNavigate } from 'react-router-dom';

import { isCheckLoading } from '@helper/isCheckLoading';
import { useSingleAsync } from '@hook/useAsync';
import { useAltaIntl } from '@hook/useTranslate';
import authenticationPresenter from '@modules/authentication/presenter';
import ChangeLanguage from '@shared/components/ChangeLanguage';

import Logo from '../components/Logo';
import RenderError from '../components/RenderError';
import { routerForgotPassword } from '../ForgotPassword/router';

const NewPassword = () => {
  const navigate = useNavigate();
  const { formatMessage, intl } = useAltaIntl();
  const { login } = authenticationPresenter;
  const loginByAccount = useSingleAsync(login);
  const [errorStatus, setErrorStatus] = useState('');

  const onSubmitAccount = (values: any) => {
    navigate('/profile');
  };

  return (
    <>
      <div className="main-form auth-form">
        <div className="change_language">
          <ChangeLanguage />
        </div>
        <div className="auth-wrapper">
          <div className="content-form">
            <Logo />
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onSubmitAccount}
            >
              <Form.Item>
                <h1 className="m-10 flex justify-center text-3xl">Đặt lại mật khẩu mới</h1>
                <Input
                  type="password"
                  prefix={<Lock className="site-form-item-icon" />}
                  placeholder="Nhập  mật khẩu mới"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: formatMessage('login.required.password') }]}
              >
                <Input.Password
                  prefix={<Lock className="site-form-item-icon" />}
                  type="password"
                  placeholder="Xác nhận mật khẩu"
                />
              </Form.Item>
              {errorStatus && <RenderError errorStatus={errorStatus} />}

              <div className="flex items-center justify-center mt-8">
                <Button
                  htmlType="submit"
                  type="primary"
                  className="normal-button"
                  loading={isCheckLoading([loginByAccount])}
                >
                  Xác nhận
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};
export default NewPassword;
