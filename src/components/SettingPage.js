import React from 'react';

const PROFILE = 'profile';
const ACCOUNT = 'account';
const SECURITY = 'security';
const INPUT_STYLE = 'H(30px) Bdrs($bdrs-control) D(b) W(100%) Fz(14px) P(12px) Bdw(t) Bgc(#fafbfc)';

export default class SettingPage extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.state = {
      tab: SECURITY,
    };
  }

  render() {
    const {tab} = this.state;

    return <div class="W(80%) Mx(a)">
      <div class="D(f) Jc(c)">
        <div class="M(20px)">
          <div class="Fw(b) W(maxc) Py(10px)">Personal settings</div>
          <div class={'Cur(p) Fz(16px) Bgc(lightgray):h P(4px) ' + (tab === PROFILE ? 'C(black) Fw(b)' : 'C(steelblue) Fw(n)')} onClick={() => this.setState({tab: PROFILE})}>{PROFILE}<span class="Fl(end)"></span></div>
          <div class={'Cur(p) Fz(16px) Bgc(lightgray):h P(4px) ' + (tab === ACCOUNT ? 'C(black) Fw(b)' : 'C(steelblue) Fw(n)')} onClick={() => this.setState({tab: ACCOUNT})}>{ACCOUNT}<span class="Fl(end)"></span></div>
          <div class={'Cur(p) Fz(16px) Bgc(lightgray):h P(4px) ' + (tab === SECURITY ? 'C(black) Fw(b)' : 'C(steelblue) Fw(n)')} onClick={() => this.setState({tab: SECURITY})}>{SECURITY}<span class="Fl(end)"></span></div>
        </div>
        <div class="W(70%) Py(10px) Mstart(20px)">
          {tab === PROFILE && <div>
            <div class="Lh(60px) Fz(22px) Bdbs(s) Bdbc(lightgray) Bdw(t)">Public profile</div>
            <form class="Maw(300px) Px(12px) Bdrs($bdrs-panel) My(30px)">
              <div>
                <span class="Fz(14px) Fw(b)">Name</span>
                <input class={INPUT_STYLE} type="Name" name="name" onChange={this.onChange} required/>
              </div>
              <div class="Mt($m-control) W(400px)">
                <span class="Fz(14px) Fw(b)">Bio</span>
                <textarea class="D(b) Bdrs(4px) W(100%) H(180px)  Fz(14px) P(12px) Bdw(t) Bgc(#fafbfc)" placeholder="Tell us a little bit about yourself..." name="body"
                  onFocus={this.editing} />
              </div>
              <button class="C(white) D(b) Bgc(dimgray) Bgc(black):h Py(4px) Mt($m-control) Bdrs($bdrs-control) Bdc(t)" onClick={this.login}>Update profile</button>
            </form>
          </div>}

          {tab === ACCOUNT && <div>
            <div class="Lh(60px) Fz(22px) Bdbs(s) Bdbc(lightgray) Bdw(t) C(#cb2431) Fw(600)">Delete account</div>
            <div class="Fz(14px)">Once you delete your account, there is no going back. Please be certain.</div>
            <button class="C(#cb2431) D(b) Bgc(#eff3f6) Bgc(#cb2431):h C(white):h Py(2px) Mt($m-control) Bdrs($bdrs-control)" onClick={this.login}>Delete your account</button>
          </div>}

          {tab === SECURITY && <div>
            <div class="Lh(60px) Fz(22px) Bdbs(s) Bdbc(lightgray) Bdw(t)">Change password</div>
            <form class="Maw(300px) Px(12px) Bdrs($bdrs-panel) My(30px)">
              <div>
                <span class="Fz(14px) Fw(b)">Old password</span>
                <input class={INPUT_STYLE} type="password" name="password" onChange={this.onChange} required/>
              </div>
              <div class="Mt($m-control)">
                <span class="Fz(14px) Fw(b)">New password</span>
                <input class={INPUT_STYLE} type="password" name="new-password" onChange={this.onChange} required/>
              </div>
              <div class="Mt($m-control)">
                <span class="Fz(14px) Fw(b)">Confirm new password</span>
                <input class={INPUT_STYLE} type="password" name="confirm" onChange={this.onChange} required/>
              </div>

              <button class="C(white) D(b) Bgc(dimgray) Bgc(black):h Py(4px) Mt($m-control) Bdrs($bdrs-control) Bdc(t)" onClick={this.login}>Update pasword</button>
            </form>
          </div>}

        </div>
      </div>
    </div>;
  }
}

