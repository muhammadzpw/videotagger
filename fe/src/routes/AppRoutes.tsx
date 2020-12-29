import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { HomePage } from '../pages';
import { ROUTE } from '../constants/routes';

const AppRoutes = () => {
  return (
    <>
      <Switch>
        <Route exact path={ROUTE.ROOT} component={HomePage} />
      </Switch>
    </>
  );
};

export default AppRoutes;
