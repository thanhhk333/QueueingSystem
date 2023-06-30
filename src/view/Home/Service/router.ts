import { IRouter } from '@routers/interface';
import React from 'react';

export const routerService: IRouter = {
  path: '/service',
  loader: React.lazy(() => import('./index')),
  exact: true,
};
