import React from 'react';
import PropsRoute from './PropsRoute';
import axios from 'axios';
import Navbar from './components/Navbar';
import ThingListingPage from './components/ThingListingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import PasswordResetPage from './components/PasswordResetPage';

import ThingDetailPage from './components/ThingDetailPage';
import ThingMakeListingPage from './components/ThingMakeListingPage';
import Make from './components/Make';
import ThingCreatePage from './components/ThingCreatePage';

import {Route, Link, Switch} from 'react-router-dom';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div>
      <PropsRoute path="/" component={Navbar} app={this}/>
      <Switch>
        <PropsRoute exact path="/things" component={ThingListingPage} app={this}/>
        <PropsRoute exact path="/register" component={RegisterPage} app={this}/>
        <PropsRoute exact path="/login" component={LoginPage} app={this}/>
        <PropsRoute exact path="/password-reset" component={PasswordResetPage} app={this}/>
        <PropsRoute exact path="/things/detail" component={ThingDetailPage} app={this}/>
        <PropsRoute exact path="/things/makes" component={ThingMakeListingPage} app={this}/>
        <PropsRoute exact path="/makes/detail" component={Make} app={this}/>
        <PropsRoute exact path="/things/new" component={ThingCreatePage} app={this}/>
      </Switch>
    </div>;
  }
}
