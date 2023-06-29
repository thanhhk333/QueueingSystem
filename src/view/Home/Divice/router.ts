import { IRouter } from '@routers/interface';
import React from 'react';

export const routerDivice: IRouter = {
  path: '/divice',
  loader: React.lazy(() => import('./index')),
  exact: true,
};
