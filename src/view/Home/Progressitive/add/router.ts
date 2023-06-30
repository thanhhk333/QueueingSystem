import { IRouter } from '@routers/interface';
import React from 'react';

export const routeraddPro: IRouter = {
  path: '/addPro',
  loader: React.lazy(() => import('./index')),
  exact: true,
};
