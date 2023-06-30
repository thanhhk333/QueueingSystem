import { IRouter } from '@routers/interface';
import React from 'react';

export const routerupdetailService: IRouter = {
  path: '/detailService',
  loader: React.lazy(() => import('./index')),
  exact: true,
};
