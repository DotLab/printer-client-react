
import React from 'react';

const INPUT_STYLE = 'H(44px) Bdrs($bdrs-control) D(b) W(100%) Fz(14px) P(12px) Bdw(t) Mt(10px)';

export default class PasswordReset extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
  }

  render() {
    return <div>
      <div class="Mt(40px)">
        <div class="W(30%) Mx(a)">
          <h2 class="Fz(20px) Ta(c) Pt(30px) C(black)">Reset your password</h2>
          <form class=" W(300px) Mx(a) Px(12px) Bdrs($bdrs-panel) My(30px)">
            <div>
              <span class="Fz(14px) Fw(600)">Enter your user account's verified email address and
              we will send you a temporary password.</span>
              <input class={INPUT_STYLE} placeholder="Email address" type="email" name="email" onChange={this.onChange} required/>
            </div>
            <button class="C(white) D(b) W(100%) Bgc(dimgray) Bgc(black):h Py(4px) Mt(20px) Bdrs($bdrs-control) Bdc(t)" onClick={this.login}>Reset password</button>
          </form>
        </div>
      </div>
    </div>;
  }
}
