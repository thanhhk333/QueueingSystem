import { IRouter } from '@routers/interface';
import React from 'react';

export const routeraddDivice: IRouter = {
  path: '/addDivice',
  loader: React.lazy(() => import('./index')),
  exact: true,
};
