import React, { Suspense } from "react";
import { Router, Switch, Redirect } from "react-router-dom";
import history from "./History";
import * as LazyComponent from '../utils/LazyLoaded';

const Routes = (
  <Suspense fallback={'loading...'}>
    <Router history={history}>
      <Switch>
        <LazyComponent.Login path="/" exact />
        <LazyComponent.Register path="/register"  />
        <LazyComponent.Profile path="/profile"  />
        <LazyComponent.LeadsCreate path="/leads/create"  />
        <LazyComponent.LeadsList path="/leads" exact />
        <LazyComponent.LeadDetails path="/leads/details/:id"  />
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  </Suspense>
);

export default Routes;