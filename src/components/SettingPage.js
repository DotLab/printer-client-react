import React from 'react';
import {Link} from 'react-router-dom';
import SettingProfile from './SettingProfile';
import SettingAccount from './SettingAccount';
import SettingSecurity from './SettingSecurity';

const PROFILE = 'profile';
const ACCOUNT = 'account';
const SECURITY = 'security';

export default class SettingPage extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.state = {
      avatarUrl: '',
    };

    this.updateProfile = this.updateProfile.bind(this);
    this.userInfo = this.userInfo.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.uploadAvatar = this.uploadAvatar.bind(this);
  }

  async updateProfile({displayName, bio, overview}) {
    await this.app.updateProfile({displayName, bio, overview, token: this.app.state.token});
  }

  async userInfo() {
    const userInfo = await this.app.userInfo({token: this.app.state.token});
    this.setState(userInfo);
    return userInfo;
  }

  async deleteAccount() {
    await this.app.deleteAccount({token: this.app.state.token});
  }

  async changePassword({oldPassword, newPassword}) {
    await this.app.userChangePassword({token: this.app.state.token, oldPassword, newPassword});
  }

  async uploadAvatar({buffer}) {
    const avatarUrl = await this.app.uploadAvatar({token: this.app.state.token, buffer});
    this.setState({avatarUrl});
  }

  render() {
    const {tab} = this.props;
    const {avatarUrl} = this.state;

    return <div class="W(80%) Mx(a)">
      <div class="D(f) Jc(c)">
        <div class="M(20px)">
          <div class="Fw(b) W(maxc) Py(10px)">Personal settings</div>
          <div class="My(4px)"><Link to="/settings/profile" class={'Cur(p) Fz(16px) Td(n):h ' + (tab === PROFILE ? 'C(black) Fw(b)' : 'C(steelblue) Fw(n)')}>{PROFILE}<span class="Fl(end)"></span></Link></div>
          <div class="My(4px)"><Link to="/settings/account" class={'Cur(p) Fz(16px) Td(n):h ' + (tab === ACCOUNT ? 'C(black) Fw(b)' : 'C(steelblue) Fw(n)')}>{ACCOUNT}<span class="Fl(end)"></span></Link></div>
          <div class="My(4px)"><Link to="/settings/security" class={'Cur(p) Fz(16px) Td(n):h ' + (tab === SECURITY ? 'C(black) Fw(b)' : 'C(steelblue) Fw(n)')}>{SECURITY}<span class="Fl(end)"></span></Link></div>
        </div>
        <div class="W(70%) Py(10px) Mstart(20px)">
          {tab === PROFILE && <SettingProfile userInfo={this.userInfo} updateProfile={this.updateProfile}
            uploadAvatar={this.uploadAvatar} avatarUrl={avatarUrl}/>}
          {tab === ACCOUNT && <SettingAccount deleteAccount={this.deleteAccount}/>}
          {tab === SECURITY && <SettingSecurity changePassword={this.changePassword}/>}
        </div>
      </div>
    </div>;
  }
}

