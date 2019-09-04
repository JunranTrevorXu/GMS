import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import createStore from './ReduxStore/index';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import * as UserService from './ApiService/UserService';

import Login from './Page/LoginPage/Login';
import Home from './Page/HomePage/Home';
import NotFound from './Page/NotFoundPage/NotFound';

import './App.scss';

const { store, persistor } = createStore();

class PrivateRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      auth: false,
    }
  }

  async componentDidMount() {
    const response = await UserService.checkAuth();
    console.log(response);
    this.setState({loading: false, auth: response.data.isLoggedIn});
  }

  render() {
    const { component: Component, ...rest } = this.props;
    const { loading, auth } = this.state;
    console.log(loading, auth);

    return (loading ? null :
      <Route
        {...rest}
        render={(props) =>
          auth ?
            (<Component {...props} />)
            : (<Redirect
              to={{
                pathname: "/"
              }}
            />)}
      />
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Switch>

              <Route exact path='/' component={Login} />
              <Route path='/signup' render={(props) => <Login {...props} submit={true}/>} />

              <PrivateRouter path='/home' component={Home} />

              <Route component={NotFound} />

            </Switch>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
