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
import MakeCreatePage from './components/MakeCreatePage';
import Make from './components/Make';
import ThingCreatePage from './components/ThingCreatePage';
import ProfilePage from './components/ProfilePage';
import SettingPage from './components/SettingPage';


import {Switch} from 'react-router-dom';

const API_SUCCESS = 'SUCCESS';
const API_URL = 'http://localhost:3000';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.history = props.history;
    this.state = {
      user: null,
      token: localStorage.getItem('token'),
      error: null,
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      this.setState({token});
    }
  }

  genericApi1(event, arg) {
    return new Promise((resolve, reject) => {
      axios.post(API_URL + event, arg).then((response) => {
        if (response.data.status === API_SUCCESS) {
          resolve(response.data);
        } else {
          reject(response.data);
        }
      }).catch((err) => reject(err));
    });
  }

  async userLogin({email, password}) {
    const res = await this.genericApi1('/v1/users/login', {email, password});
    const token = res.payload;

    localStorage.setItem('token', token);
    this.setState({token});
    this.history.push('/');
  }

  async userLogOut() {
    localStorage.removeItem('token');
    this.setState({token: null});
    this.history.push('/');
  }

  async userRegister({userName, email, displayName, password}) {
    await this.genericApi1('/v1/users/register', {email, userName, displayName, password});
    this.history.push('/login');
  }

  async userChangePassword({currentPassword, newPassword, token}) {
    await this.genericApi1('/v1/users/settings/password/change', {token, currentPassword, newPassword});
    this.history.push('/login');
  }

  async createThing({fileName, fileSize, buffer, name, license, category, type, summary, printerBrand,
    raft, support, resolution, infill, filamentBrand, filamentColor, filamentMaterial, note, token}) {
    const id = await this.genericApi1('/v1/things/upload', {fileName, fileSize, buffer, name,
      license, category, type, summary, printerBrand, raft, support, resolution, infill,
      filamentBrand, filamentColor, filamentMaterial, note, token});
    console.log(id);
  }

  async thingList({category, type, sort, order, limit, skip, search}) {
    const res = await this.genericApi1('/v1/things/listing', {category, type, sort, order, limit, skip, search});
    return res.payload;
  }

  async thingDetail({thingId}) {
    const res = await this.genericApi1('/v1/things/detail', {thingId});
    return res.payload;
  }

  async comment({comment, thingId, token}) {
    await this.genericApi1('/v1/things/comment/create', {comment, thingId, token});
  }

  async deleteComment({commentId, token}) {
    await this.genericApi1('/v1/things/comment/delete', {commentId, token});
  }

  async getCommentList({thingId, token, limit}) {
    console.log(thingId, token, limit);
    const res = await this.genericApi1('/v1/things/comment/list', {thingId, token, limit});
    console.log(res);
    return res.payload;
  }

  render() {
    return <div>
      <PropsRoute path="/" component={Navbar} app={this}/>
      <Switch>
        <PropsRoute exact path="/things/new" component={ThingCreatePage} app={this}/>
        <PropsRoute exact path="/things/:thingId" component={ThingDetailPage} app={this}/>
        <PropsRoute exact path="/things" component={ThingListingPage} app={this}/>
        <PropsRoute exact path="/register" component={RegisterPage} app={this}/>
        <PropsRoute exact path="/login" component={LoginPage} app={this}/>
        <PropsRoute exact path="/password-reset" component={PasswordResetPage} app={this}/>
        <PropsRoute exact path="/things/makes" component={ThingMakeListingPage} app={this}/>
        <PropsRoute exact path="/makes/detail" component={Make} app={this}/>
        <PropsRoute exact path="/username" component={ProfilePage} app={this}/>
        <PropsRoute exact path="/settings" component={SettingPage} app={this}/>
        <PropsRoute exact path="/things/new/make" component={MakeCreatePage} app={this}/>
      </Switch>
    </div>;
  }
}
