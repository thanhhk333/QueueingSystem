import { IRouter } from '@routers/interface';
import React from 'react';

export const routerPro: IRouter = {
  path: '/progressitive',
  loader: React.lazy(() => import('./index')),
  exact: true,
};
