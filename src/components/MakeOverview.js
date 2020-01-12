import React from 'react';
import {Link} from 'react-router-dom';

export default class MakeOverview extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
  }

  render() {
    const {uploaderName} = this.props;

    return <figure class="Pos(r) D(ib) Maw(320px) M(20px)">
      <div class="D(f)">
        <span class="Bdrs(100%) Mend(20px) D(b)"><i class="fas fa-print"></i></span>
        <span class="Fz(14px) C($gray-500)">by <span class="C(black) Td(u):h Cur(p) Fz(18px) Mstart(4px)"> {uploaderName}</span></span>
      </div>
      <div>
        <img class="W(100%)" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample87.jpg" alt="sample87"/>
      </div>
      <Link to={{pathname: `/makes/${this.props.id}`}}>
        <figcaption class="W(100%) Pos(a) D(f) Fxd(c) Jc(c) H(83%) B(0) Ai(c) P(8px) C(white)">
        </figcaption>
      </Link>
    </figure>;
  }
}
