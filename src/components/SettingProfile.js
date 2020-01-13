import React from 'react';
import {onChange} from '../utils';

const INPUT_STYLE = 'H(30px) Bdrs($bdrs-control) D(b) W(100%) Fz(14px) P(12px) Bdw(t) Bgc(#fafbfc)';

export default class SettingProfile extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.state = {
      displayName: '',
      bio: '',
    };

    this.onChange = onChange.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }

  async componentDidMount() {
    const userInfo = await this.props.userInfo();
    this.setState(userInfo);
  }

  async updateProfile(e) {
    e.preventDefault();
    this.props.updateProfile({displayName: this.state.displayName, bio: this.state.bio});
    const userInfo = await this.props.userInfo();
    this.setState(userInfo);
  }

  render() {
    const {displayName, bio} = this.state;

    return <div>
      <div class="Lh(60px) Fz(22px) Bdbs(s) Bdbc(lightgray) Bdw(t)">Public profile</div>
      <form class="Maw(300px) Px(12px) Bdrs($bdrs-panel) My(30px)">
        <div>
          <span class="Fz(14px) Fw(b)">Display name</span>
          <input class={INPUT_STYLE} name="displayName" value={displayName} onChange={this.onChange} required/>
        </div>
        <div class="Mt($m-control) W(400px)">
          <span class="Fz(14px) Fw(b)">Bio</span>
          <textarea class="D(b) Bdrs(4px) W(100%) H(180px)  Fz(14px) P(12px) Bdw(t) Bgc(#fafbfc)" placeholder="Tell us a little bit about yourself..."
            name="bio" value={bio} onChange={this.onChange}/>
        </div>
        <button class="C(white) D(b) Bgc(dimgray) Bgc(black):h Py(4px) Mt($m-control) Bdrs($bdrs-control) Bdc(t)" onClick={this.updateProfile}>Update profile</button>
      </form>
    </div>;
  }
}
