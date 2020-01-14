import React from 'react';
import {Link} from 'react-router-dom';
import NoImageAvailable from './No_Image_Available.jpg';

export default class MakeOverview extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
  }

  render() {
    const {uploaderName, pictureUrl} = this.props;

    return <figure class="Pos(r) D(ib) Maw(320px) M(20px)">
      <div class="D(f)">
        <span class="Bdrs(100%) Mend(20px) D(b)"><i class="fas fa-print"></i></span>
        <span class="Fz(14px) C($gray-500)">by <span class="C(black) Td(u):h Cur(p) Fz(18px) Mstart(4px)"> {uploaderName}</span></span>
      </div>
      <div>
        {pictureUrl &&
          <img class="W(100%)" src={pictureUrl} alt="sample87"/>}
        {!pictureUrl &&
          <img class="W(100%)" src={NoImageAvailable} alt="sample87"/>}
      </div>
      <Link to={{pathname: `/makes/${this.props.id}`}}>
        <figcaption class="W(100%) Pos(a) D(f) Fxd(c) Jc(c) H(83%) B(0) Ai(c) P(8px) C(white)">
        </figcaption>
      </Link>
    </figure>;
  }
}
