import React from 'react';
import PropsRoute from './PropsRoute';
import axios from 'axios';
import Navbar from './components/Navbar';
import ThingListingPage from './components/ThingListingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import PasswordResetPage from './components/PasswordResetPage';
import ThingDetailPage from './components/ThingDetailPage';
import MakeCreatePage from './components/MakeCreatePage';
import MakeDetailPage from './components/MakeDetailPage';
import ThingCreatePage from './components/ThingCreatePage';
import ProfilePage from './components/ProfilePage';
import SettingPage from './components/SettingPage';
import {DETAIL, COMMENTS, MAKES, REMIXES, LICENSE} from './components/utils';

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
          this.userLogOut();
          this.userLogin({email: 'kai@gmail.com', password: '123'});
        }
      }).catch((err) => {
        reject(err);
      });
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
    await this.genericApi1('/v1/things/upload', {fileName, fileSize, buffer, name,
      license, category, type, summary, printerBrand, raft, support, resolution, infill,
      filamentBrand, filamentColor, filamentMaterial, note, token});
  }

  async thingList({category, type, sort, order, limit, skip, search}) {
    const res = await this.genericApi1('/v1/things/listing', {category, type, sort, order, limit, skip, search});
    return res.payload;
  }

  async thingDetail({thingId}) {
    const res = await this.genericApi1('/v1/things/detail', {thingId});
    return res.payload;
  }

  async commentThing({comment, thingId, token}) {
    await this.genericApi1('/v1/things/comment/create', {comment, thingId, token});
  }

  async deleteCommentThing({commentId, token}) {
    await this.genericApi1('/v1/things/comment/delete', {commentId, token});
  }

  async getThingCommentList({thingId, token, limit}) {
    const res = await this.genericApi1('/v1/things/comment/list', {thingId, token, limit});
    return res.payload;
  }

  async likeThing({token, thingId}) {
    await this.genericApi1('/v1/things/like', {token, thingId});
  }

  async unlikeThing({token, thingId}) {
    await this.genericApi1('/v1/things/unlike', {token, thingId});
  }

  async thingLikeCount({thingId}) {
    const res = await this.genericApi1('/v1/things/likecount', {thingId});
    return res.payload;
  }

  async thingLikeStatus({token, thingId}) {
    const res = await this.genericApi1('/v1/things/likestatus', {token, thingId});
    return res.payload;
  }

  async bookmarkThing({token, thingId}) {
    await this.genericApi1('/v1/things/bookmark', {token, thingId});
  }

  async unBookmarkThing({token, thingId}) {
    await this.genericApi1('/v1/things/unbookmark', {token, thingId});
  }

  async thingBookmarkCount({thingId}) {
    const res = await this.genericApi1('/v1/things/bookmarkcount', {thingId});
    return res.payload;
  }

  async thingBookmarkStatus({token, thingId}) {
    const res = await this.genericApi1('/v1/things/bookmarkstatus', {token, thingId});
    return res.payload;
  }

  async getSignedUrl({thingId}) {
    const res = await this.genericApi1('/v1/things/signed-url', {thingId});
    return res.payload;
  }

  async download({thingId}) {
    const res = await this.genericApi1('/v1/things/download', {thingId});
    return res.payload;
  }

  async thingDownloadCount({thingId}) {
    const res = await this.genericApi1('/v1/things/downloadcount', {thingId});
    return res.payload;
  }

  async getThingNames({token, thingId}) {
    const res = await this.genericApi1('/v1/things/names', {token, thingId});
    return res.payload;
  }

  async likeMake({token, makeId}) {
    await this.genericApi1('/v1/makes/like', {token, makeId});
  }

  async unlikeMake({token, makeId}) {
    await this.genericApi1('/v1/makes/unlike', {token, makeId});
  }

  async makeLikeCount({makeId}) {
    const res = await this.genericApi1('/v1/makes/likecount', {makeId});
    return res.payload;
  }

  async makeLikeStatus({token, makeId}) {
    const res = await this.genericApi1('/v1/makes/likestatus', {token, makeId});
    return res.payload;
  }

  async makeDetail({makeId}) {
    const res = await this.genericApi1('/v1/makes/detail', {makeId});
    return res.payload;
  }

  async commentMake({comment, makeId, token}) {
    await this.genericApi1('/v1/makes/comment/create', {comment, makeId, token});
  }

  async deleteCommentMake({commentId, token}) {
    await this.genericApi1('/v1/makes/comment/delete', {commentId, token});
  }

  async getMakeCommentList({makeId, token, limit}) {
    const res = await this.genericApi1('/v1/makes/comment/list', {makeId, token, limit});
    return res.payload;
  }

  async createMake({sourceThingId, sourceThingName, sourceThingUploaderId, sourceThingUploaderName,
    buffer, fileName, fileSize, description, printerBrand, raft, support, resolution,
    infill, filamentBrand, filamentColor, filamentMaterial, note, token}) {
    const res = await this.genericApi1('/v1/makes/upload', {sourceThingId, sourceThingName, sourceThingUploaderId,
      sourceThingUploaderName, buffer, fileName, fileSize, description, printerBrand, raft, support,
      resolution, infill, filamentBrand, filamentColor, filamentMaterial, note, token});

    this.history.push(`/makes/${res.payload}`);
  }

  async thingMakeList({thingId, limit}) {
    const res = await this.genericApi1('/v1/things/make/list', {thingId, limit});
    return res.payload;
  }

  async thingRemixList({thingId, limit}) {
    const res = await this.genericApi1('/v1/things/remix/list', {thingId, limit});
    return res.payload;
  }

  render() {
    return <div>
      <PropsRoute path="/" component={Navbar} app={this}/>
      <Switch>
        <PropsRoute exact path="/things/new" component={ThingCreatePage} app={this}/>
        <PropsRoute exact path="/things/:thingId/details" component={ThingDetailPage} app={this} tab={DETAIL}/>
        <PropsRoute exact path="/things/:thingId/comments" component={ThingDetailPage} app={this} tab={COMMENTS}/>
        <PropsRoute exact path="/things/:thingId/makes" component={ThingDetailPage} app={this} tab={MAKES}/>
        <PropsRoute exact path="/things/:thingId/remixes" component={ThingDetailPage} app={this} tab={REMIXES}/>
        <PropsRoute exact path="/things/:thingId/license" component={ThingDetailPage} app={this} tab={LICENSE}/>
        <PropsRoute exact path="/things" component={ThingListingPage} app={this}/>
        <PropsRoute exact path="/register" component={RegisterPage} app={this}/>
        <PropsRoute exact path="/login" component={LoginPage} app={this}/>
        <PropsRoute exact path="/password-reset" component={PasswordResetPage} app={this}/>
        <PropsRoute exact path="/things/:thingId/makes/new" component={MakeCreatePage} app={this}/>
        <PropsRoute exact path="/makes/:makeId" component={MakeDetailPage} app={this}/>
        <PropsRoute exact path="/username" component={ProfilePage} app={this}/>
        <PropsRoute exact path="/settings" component={SettingPage} app={this}/>
      </Switch>
    </div>;
  }
}
