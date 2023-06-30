import { routerForgotPassword } from '@view/Auth/ForgotPassword/router';
import { routerLogin } from '@view/Auth/Login/router';
import { routerResetPassword } from '@view/Auth/ResetPassword/router';
import { routerHome } from '@view/Home/router';
import { routerPageError } from '@view/PageError/router';

import { IRouter } from './interface';
import { routerProfile } from '@view/Auth/Profiles/router';
// eslint-disable-next-line import/named
import { routerDivice } from '@view/Home/Divice/router';
import { routeraddDivice } from '@view/Home/Divice/add/router';
import { routerDetailDivice } from '@view/Home/Divice/detail/router';
import { routerUpdateDivice } from '@view/Home/Divice/update/router';
import { routerService } from '@view/Home/Service/router';
import { routeraddService } from '@view/Home/Service/add/router';
import { routerupdateService } from '@view/Home/Service/update/router';
import { routerupdetailService } from '@view/Home/Service/detail/router';
import { routerPro } from '@view/Home/Progressitive/router';
import { routeraddPro } from '@view/Home/Progressitive/add/router';
import { routerupdetailPro } from '@view/Home/Progressitive/detail/router';

export const privatePage: IRouter[] = [routerHome, routerPageError];

export const publicPage: IRouter[] = [
  routerForgotPassword,
  routerResetPassword,
  routerLogin,
  routerPageError,
  routerHome,
  routerProfile,
  routerDivice,
  routeraddDivice,
  routerDetailDivice,
  routerUpdateDivice,
  routerService,
  routeraddService,
  routerupdateService,
  routerupdetailService,
  routerPro,
  routeraddPro,
  routerupdetailPro,
];
