import { routerForgotPassword } from '@view/Auth/ForgotPassword/router';
import { routerLogin } from '@view/Auth/Login/router';
import { routerResetPassword } from '@view/Auth/ResetPassword/router';
import { routerHome } from '@view/Home/router';
import { routerPageError } from '@view/PageError/router';

import { IRouter } from './interface';
import { routerProfile } from '@view/Auth/Profiles/router';
// eslint-disable-next-line import/named
import { routerDivice } from '@view/Home/Divice/router';

export const privatePage: IRouter[] = [routerHome, routerPageError];

export const publicPage: IRouter[] = [
  routerForgotPassword,
  routerResetPassword,
  routerLogin,
  routerPageError,
  routerHome,
  routerProfile,
  routerDivice,
];
