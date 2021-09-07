import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import routes from './routes'

const Routes = function() {
  return(
    <Router>
      <Switch>
        {routes.map(route => {
          if (route.guard === 'none') return <Route {...route} />
          else return <></>
        })}
      </Switch>
    </Router>
  );
}

export default Routes;
