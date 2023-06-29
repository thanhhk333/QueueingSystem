import '../styles.scss';
import { Button, Form, Input } from 'antd';
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

const Login = () => {
  const navigate = useNavigate();
  const { formatMessage, intl } = useAltaIntl();
  const { login } = authenticationPresenter;
  const loginByAccount = useSingleAsync(login);
  const [errorStatus, setErrorStatus] = useState('');

  const onSubmitAccount = (values: any) => {
    const { email, password } = values;
    const loginData = { email, password };
    navigate('/');
  };
  // loginByAccount
  // ?.execute(loginData)
  // ?.then(() => {
  //   navigate('/');
  // })
  // .catch(err => {
  //   setErrorStatus(formatMessage('Sai tên đăng nhập hoặc mật khẩu'));

  //});
  // };

  return (
    <>
      <div className="main-form auth-form">
        <div className="change_language">
          <ChangeLanguage />
        </div>
        <div className="auth-wrapper">
          <div className="content-form">
            <Logo />
            <Form name="normal_login" className="login-form" onFinish={onSubmitAccount}>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  prefix={<User className="site-form-item-icon" />}
                  type="text"
                  placeholder={formatMessage('tên đăng nhập')}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: formatMessage('login.required.password'),
                  },
                ]}
              >
                <Input.Password
                  prefix={<Lock className="site-form-item-icon" />}
                  type="password"
                  placeholder={formatMessage('login.password')}
                />
              </Form.Item>
              {errorStatus && <RenderError errorStatus={errorStatus} />}
              <Form.Item className="form-buttons">
                <div className="forgot__pass">
                  <a onClick={() => navigate(routerForgotPassword.path)}>
                    {formatMessage('login.forgot.password')}
                  </a>
                </div>
              </Form.Item>

              <div className="flex items-center justify-center mt-8 ">
                <Button
                  htmlType="submit"
                  type="primary"
                  className="normal-button"
                  loading={isCheckLoading([loginByAccount])}
                >
                  {formatMessage('login.button.account')}
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
