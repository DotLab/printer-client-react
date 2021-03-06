
import React from 'react';

const INPUT_STYLE = 'H(44px) Bdrs($bdrs-control) D(b) W(100%) Fz(14px) P(12px) Bdw(t) Bgc(#fafbfc)';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
  }

  render() {
    return <div>
      <div class="Mt(40px)">
        <div class="W(30%) Mx(a)">
          <h2 class="Fz(20px) Ta(c) Pt(30px) C(black)">Create your account</h2>

          <form class="Maw(300px) Mx(a) Px(12px) Bdrs($bdrs-panel) My(30px)">
            <div>
              <span class="Fz(14px) Fw(b)">Username</span>
              <input class={INPUT_STYLE} type="userName" name="email" onChange={this.onChange} required/>
            </div>
            <div class="Mt($m-control)">
              <span class="Fz(14px) Fw(b)">Email address</span>
              <input class={INPUT_STYLE} type="email" name="email" onChange={this.onChange} required/>
            </div>
            <div class="Mt($m-control)">
              <span class="Fz(14px) Fw(b)">Password</span>
              <input class={INPUT_STYLE} type="password" name="password" onChange={this.onChange} required/>
            </div>
            <div class="Mt($m-control)">
              <span class="Fz(14px) Fw(b)">Password confirmation</span>
              <input class={INPUT_STYLE} type="password" name="password" onChange={this.onChange} required/>
            </div>
            <button class="C(white) D(b) W(100%) Bgc(dimgray) Bgc(black):h Py(4px) Mt($m-control) Bdrs($bdrs-control) Bdc(t)" onClick={this.login}>Register</button>
          </form>

        </div>
      </div>
    </div>;
  }
}
