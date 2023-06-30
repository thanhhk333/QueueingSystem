import { IRouter } from '@routers/interface';
import React from 'react';

export const routerUpdateDivice: IRouter = {
  path: '/updateDivice',
  loader: React.lazy(() => import('./index')),
  exact: true,
};
