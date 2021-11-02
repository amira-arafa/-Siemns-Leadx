import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Auth } from "../store/actions/auth";



export const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props =>
          Auth.getAuth() ? (
            <>
                <Component {...props} />
            </>
          ) : (
            <Redirect to={{ pathname: "/" }} />
          )
        }
      />
    );
  };
export const PublicRoute = ({ component: Component, ...rest }) =>  {
  return <Route
    {...rest}
    render={props =>
      !Auth.getAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/leads" }} />
      )
    }
  />
}

