import { IRouter } from '@routers/interface';
import React from 'react';

export const routerProfile: IRouter = {
  path: '/profile',
  loader: React.lazy(() => import('./index')),
  exact: true,
};
