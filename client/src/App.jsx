import React from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import Login from './Page/LoginPage/Login';

function App() {
  return (
      <BrowserRouter>
          <Route exact path='/' component={Login} />
          <Route path='/signup' render={(props) => <Login {...props} submit={true} />} />
      </BrowserRouter>
  );
}

export default App;
