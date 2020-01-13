import React from 'react';

export default class SettingAccount extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.deleteAccount = this.deleteAccount.bind(this);
  }

  async deleteAccount(e) {
    e.preventDefault();
    await this.props.deleteAccount();
  }

  render() {
    return <div>
      <div class="Lh(60px) Fz(22px) Bdbs(s) Bdbc(lightgray) Bdw(t) C(#cb2431) Fw(600)">Delete account</div>
      <div class="Fz(14px) Mt(16px)">Once you delete your account, there is no going back. Please be certain.</div>
      <button class="C(#cb2431) D(b) Bgc(#eff3f6) Bgc(#cb2431):h C(white):h Py(2px) Mt($m-control) Bdrs($bdrs-control)" onClick={this.deleteAccount}>Delete your account</button>
    </div>;
  }
}
