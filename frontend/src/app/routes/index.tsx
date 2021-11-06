import React from 'react';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import routes from './navigation'

const Routes = function() {
  return(
    <Switch>
      {routes.map((route, i) => {
        return <Route key={i} {...route} />
      })}
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;
