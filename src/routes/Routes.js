import React, { Suspense } from "react";
import { Router, Switch, Redirect } from "react-router-dom";
import history from "./History";
import * as LazyComponent from '../utils/LazyLoaded';

const Routes = (
  <Suspense fallback={'loading...'}>
    <Router history={history}>
      <Switch>
        <LazyComponent.Login path="/" exact />
        <LazyComponent.Register path="/register" exact />
        <LazyComponent.Profile path="/profile" exact />
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  </Suspense>
);

export default Routes;