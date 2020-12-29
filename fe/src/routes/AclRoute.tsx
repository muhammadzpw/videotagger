import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { ROUTE } from '../constants/routes';

interface Props {
  component: React.ReactType;
  hasPermission?: boolean;
  exact?: boolean;
  title?: string;
  path: string;
}

const AclRoute: React.FC<Props> = ({
  component: Component,
  hasPermission,
  exact,
  path,
  ...rest
}: Props) => {
  return (
    <Route
      path={path}
      {...rest}
      render={props =>
        hasPermission ? <Component {...props} /> : <Redirect to={ROUTE.ROOT} />
      }
      exact={!!exact && exact}
    />
  );
};

export default AclRoute;
