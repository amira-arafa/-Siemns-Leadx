import React, { Suspense } from "react";
import { Router, Switch, Redirect } from "react-router-dom";
import history from "./History";
import { PrivateRoute, PublicRoute } from "./RouteTypes";
import * as LazyComponent from "../utils/LazyLoaded";
const Routes = (
  <Suspense fallback={"loading..."}>
    <Router history={history}>
    <LazyComponent.Header />
      <Switch>
        <PublicRoute path="/" component={LazyComponent.Login} exact />
        <PrivateRoute path="/leads" component={LazyComponent.LeadsList} exact />

        {/* <LazyComponent.Login path="/" exact /> */}
        <LazyComponent.Register path="/register" />
        <LazyComponent.Profile path="/profile" />
        <LazyComponent.LeadsCreate path="/leads/create" />
        {/* <LazyComponent.LeadsList path="/leads" exact /> */}
        <LazyComponent.LeadDetails path="/leads/details/:id" />
        <Redirect from="*" to="/" />
      </Switch>
      <LazyComponent.Footer />
    </Router>
  </Suspense>
);

export default Routes;