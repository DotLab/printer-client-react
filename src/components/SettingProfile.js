import React from 'react';
import {onChange} from '../utils';
import avatar from './avatar.jpg';

const INPUT_STYLE = 'H(30px) Bdrs($bdrs-control) D(b) W(100%) Fz(14px) P(12px) Bdw(t) Bgc(#fafbfc)';
const MAX_SIZE = 1048576;

export default class SettingProfile extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.state = {
      displayName: '',
      bio: '',
    };

    this.onChange = onChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }

  async componentDidMount() {
    const userInfo = await this.props.userInfo();
    console.log(userInfo);
    this.setState(userInfo);
  }

  async onFileChange(e) {
    if (!e.target.files[0]) return;
    console.log(e.target.files[0].name);
    const size = e.target.files[0].size;

    if (size > MAX_SIZE) {
      console.log('zip too large');
      return;
    }
    const fr = new FileReader();
    fr.onload = (e) => {
      const binary = e.target.result;
      const buffer = btoa(binary);
      this.props.uploadAvatar({buffer});
    };
    fr.readAsBinaryString(e.target.files[0]);
  }

  async updateProfile(e) {
    e.preventDefault();
    this.props.updateProfile({displayName: this.state.displayName, bio: this.state.bio});
    const userInfo = await this.props.userInfo();
    this.setState(userInfo);
  }

  render() {
    const {displayName, bio} = this.state;
    const {avatarUrl} = this.props;
    const hasAvatar = avatarUrl.length !== 0;

    return <div class="W(80%)">
      <div class="Lh(60px) Fz(22px) Bdbs(s) Bdbc(lightgray) Bdw(t) W(100%)">Public profile</div>
      <div class="D(f) Jc(sb)">
        <form class="W(64%) Px(12px) Bdrs($bdrs-panel) My(30px)">
          <div class="W(50%)">
            <span class="Fz(14px) Fw(b)">Display name</span>
            <input class={INPUT_STYLE} name="displayName" value={displayName} onChange={this.onChange} required/>
          </div>
          <div class="Mt($m-control) W(100%)">
            <span class="Fz(14px) Fw(b)">Bio</span>
            <textarea class="D(b) Bdrs(4px) W(100%) H(180px)  Fz(14px) P(12px) Bdw(t) Bgc(#fafbfc)" placeholder="Tell us a little bit about yourself..."
              name="bio" value={bio} onChange={this.onChange}/>
          </div>
          <button class="C(white) D(b) Bgc(dimgray) Bgc(black):h Py(4px) Mt($m-control) Bdrs($bdrs-control) Bdc(t)" onClick={this.updateProfile}>Update profile</button>
        </form>
        <div class="W(30%) My(20px) Pos(r)">
          {!hasAvatar && <img class="W(200px) H(200px) Pos(a) Bdrs(4px) shadow p-3 rounded" src={avatar} alt="1"/>}
          {hasAvatar && <img class="H(200px) Pos(a) Bdrs(4px) shadow p-3 rounded" src={avatarUrl} alt="1"/>}
          <span class="Fz(14px) Pos(a) Bgc(black) C(white) Mt(150px) Mstart(20px) Py(4px) Px(10px) Bdrs(8px)"><i class="fas fa-pen Mend(4px)"></i> Edit</span>
          <input class="Pos(a) H(200px) W(200px) Op(0)" type="file" name="file" onChange={this.onFileChange}/>
        </div>
      </div>
    </div>;
  }
}
