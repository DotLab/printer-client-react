import React from 'react';

export default class ProfileThing extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
  }

  render() {
    return <figure class="Pos(r) D(ib) Maw(200px) M(20px)">
      <div class="D(ib)">
        <span class="Bdrs(100%) Mend(10px) Fz(16px)"><i class="fas fa-print"></i></span>
        <span class="C(black) Td(u):h Cur(p) Fz(16px)">some project</span>
      </div>
      <div>
        <img class="W(100%)" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample87.jpg" alt="sample87"/>
      </div>
    </figure>;
  }
}

