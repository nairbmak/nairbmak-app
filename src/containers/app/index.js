import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Status from '../status';
import Header from '../header';
import Report from '../report';
import View from '../view';
import Explorer from '../explorer';

class App extends Component {
  render() {
    return (
      <div>
        <Status />
        <Header />
        <main>
          <Switch>
            <Redirect exact from="/" to="/report" />
            <Route exact path="/report" component={Report} />
            <Route exact path="/view/:hash" component={View} />
            <Route exact path="/view" component={View} />
            <Route exact path="/explorer" component={Explorer} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;