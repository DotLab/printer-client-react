import React from 'react';
import {onChange} from '../utils';
const INPUT_STYLE = 'H(30px) Bdrs($bdrs-control) D(b) W(100%) Fz(14px) P(12px) Bdw(t) Bgc(#fafbfc)';


export default class SettingProfile extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.state = {
      oldPassword: '',
      newPassword: '',
      passwordConfirm: '',
    };

    this.onChange = onChange.bind(this);
    this.checkPasswordMatch = this.checkPasswordMatch.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  checkPasswordMatch() {
    return (this.state.newPassword === this.state.passwordConfirm);
  }

  async changePassword(e) {
    e.preventDefault();
    this.props.changePassword({oldPassword: this.state.oldPassword, newPassword: this.state.newPassword});
  }

  render() {
    return <div>
      <div class="Lh(60px) Fz(22px) Bdbs(s) Bdbc(lightgray) Bdw(t)">Change password</div>
      <form class="Maw(300px) Px(12px) Bdrs($bdrs-panel) My(30px)">
        <div>
          <span class="Fz(14px) Fw(b)">Old password</span>
          <input class={INPUT_STYLE} type="password" name="oldPassword" onChange={this.onChange} required/>
        </div>
        <div class="Mt($m-control)">
          <span class="Fz(14px) Fw(b)">New password</span>
          <input class={INPUT_STYLE} type="password" name="newPassword" onChange={this.onChange} required/>
        </div>
        <div class="Mt($m-control)">
          <span class="Fz(14px) Fw(b)">Confirm new password</span>
          <input class={INPUT_STYLE} type="password" name="passwordConfirm" onChange={this.onChange} required/>
        </div>

        <button class="C(white) D(b) Bgc(dimgray) Bgc(black):h Py(4px) Mt($m-control) Bdrs($bdrs-control) Bdc(t)" disabled={!this.checkPasswordMatch()} onClick={this.changePassword}>Update pasword</button>
      </form>
    </div>;
  }
}
