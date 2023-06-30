import { IRouter } from '@routers/interface';
import React from 'react';

export const routerupdetailPro: IRouter = {
  path: '/detailPro',
  loader: React.lazy(() => import('./index')),
  exact: true,
};
