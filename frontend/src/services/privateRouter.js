import React from 'react';
import { Route, Navigate } from 'react-router-dom';

function PrivateRouter({ component: Component, ...rest }) {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Component /> : <Navigate to="/" />}
    />
  );
}

export default PrivateRouter;