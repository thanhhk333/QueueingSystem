import { IRouter } from '@routers/interface';
import React from 'react';

export const routeraddService: IRouter = {
  path: '/addService',
  loader: React.lazy(() => import('./index')),
  exact: true,
};
