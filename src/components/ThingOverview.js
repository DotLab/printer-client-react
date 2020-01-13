import React from 'react';
import {Link} from 'react-router-dom';

export default class ThingOverview extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
  }

  render() {
    const {name, uploaderName, likeCount} = this.props;

    return <div>
      <div class="D(f)">
        <div class="Bdrs(100%) Mend(20px) D(b)"><i class="fas fa-print"></i></div>
        <div>
          <div class="C(black) Td(u):h Cur(p)">{name}</div>
          <div class="Fz(14px) C($gray-500)">{uploaderName}</div>
        </div>
      </div>
      <figure class="Pos(r) D(ib) Maw(320px) Mb(30px) Mt(4px)">
        <div>
          <img class="W(100%)" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample87.jpg" alt="sample87"/>
        </div>
        <Link to={{pathname: `/things/${this.props.id}/details`}}>
          <figcaption class="W(100%) Pos(a) D(f) Fxd(c) Jc(c) H(100%) B(0) Ai(c) P(8px) C(white) Op(0) Op(1):h Bgc(#000000.4):h">
            <div><i class="fas fa-thumbs-up"></i> {likeCount}</div>
          </figcaption>
        </Link>
      </figure>
    </div>;
  }
}
