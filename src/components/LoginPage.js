
import React from 'react';
import {Link} from 'react-router-dom';
import {onChange} from '../utils';

const INPUT_STYLE = 'H(44px) Bdrs($bdrs-control) D(b) W(100%) Fz(14px) P(12px)  Bdw(t)';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.state = {
      email: '',
      password: '',
    };

    this.onChange = onChange.bind(this);
    this.login = this.login.bind(this);
  }

  async login(e) {
    e.preventDefault();
    try {
      await this.app.userLogin(this.state);
    } catch (err) {
      this.setState({email: '', password: ''});
    }
  }

  render() {
    return <div>
      <div class="Mt(40px)">
        <div class="W(30%) Mx(a)">
          <h2 class="Fz(20px) Ta(c) Pt(30px) C(black)">Sign in to Scarletea Printer</h2>

          <form class="Maw(300px) Mx(a) Px(12px) Bdrs($bdrs-panel) My(30px)">
            <div>
              <span class="Fz(14px) Fw(b)">Username or email address</span>
              <input class={INPUT_STYLE} placeholder="Email address" type="email" name="email" onChange={this.onChange} required/>
            </div>
            <div class="Mt($m-control)">
              <span class="Fz(14px) Fw(b)">Password</span>
              <Link to="/password-reset" class="Fl(end) Fz(12px) Fw(b) C(steelblue)">Forgot password?</Link>
              <input class={INPUT_STYLE} placeholder="Password" type="password" name="password" onChange={this.onChange} required/>
            </div>
            <button class="C(white) D(b) W(100%) Bgc(dimgray) Bgc(black):h Py(4px) Mt($m-control) Bdrs($bdrs-control) Bdc(t)" onClick={this.login}>SIGN IN</button>
          </form>

          <div class="Fz(12px) Ta(c)">
            New to Scarletea Printer? <Link to="/register">Create an account.</Link>
          </div>
        </div>
      </div>
    </div>;
  }
}
