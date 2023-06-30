import { IRouter } from '@routers/interface';
import React from 'react';

export const routerupdateService: IRouter = {
  path: '/updateService/',
  loader: React.lazy(() => import('./index')),
  exact: true,
};
