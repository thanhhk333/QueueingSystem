import { IRouter } from '@routers/interface';
import React from 'react';

export const routerDetailDivice: IRouter = {
  path: '/detailDivice',
  loader: React.lazy(() => import('./index')),
  exact: true,
};
