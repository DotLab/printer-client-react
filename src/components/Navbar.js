import React from 'react';
import {Link} from 'react-router-dom';
import {ROUTE_NEW_THING, ROUTE_NEW_CUSTOMIZABLE, ROUTE_PROFILE, ROUTE_BOOKMARK,
  ROUTE_MAKE, ROUTE_THING, ROUTE_SETTINGS, ROUTE_LOGOUT, ROUTE_INVALID} from './utils';
const INPUT_STYLE = 'H(40px) Bdrs(4px) W(100%) Fz(14px) Fw(400) P(12px) Bdc(t) Bgc(#24292e) C(white)';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
    this.state = {
      exploreHovering: false,
      isLoggedin: true,
    };

    this.changePath = this.changePath.bind(this);
  }

  changeExploreHovering(exploreHovering) {
    this.setState({exploreHovering});
  }

  changePath(e) {
    if (e.target.value === ROUTE_NEW_THING) {
      this.props.history.push('/things/new');
    } else if (e.target.value === ROUTE_NEW_CUSTOMIZABLE) {
      this.props.history.push('/things/customizable/new');
    } else if (e.target.value === ROUTE_PROFILE) {
      this.props.history.push('/me');
    } else if (e.target.value === ROUTE_BOOKMARK) {
      this.props.history.push('/me/bookmark');
    } else if (e.target.value === ROUTE_MAKE) {
      this.props.history.push('/me/make');
    } else if (e.target.value === ROUTE_THING) {
      this.props.history.push('/me/thing');
    } else if (e.target.value === ROUTE_SETTINGS) {
      this.props.history.push('/me/settings');
    } else if (e.target.value === ROUTE_LOGOUT) {
      this.logout();
    }
  }

  render() {
    const {exploreHovering, isLoggedin} = this.state;
    return <div>
      <div class="Bgc(black) H(60px) Pos(st) Mb(20px) D(f) Jc(sa)" >
        <div>
          <h1 class="Fz(26px) Lh(60px) Cur(p) Fl(start) Mstart(20px)"><Link className="C(white) C(gray):h Td(n):h" to="/">Steelblue</Link></h1>
          <span class="Lh(60px) Cur(p) C(white) Mstart(20px) Pos(r) D(ib)" onMouseOver={() => {
            this.changeExploreHovering(true);
          }}>Explore <i class="fas fa-chevron-down"></i>
            <div class={'P(10px) Pos(a) Bgc(black) W(200px) ' + (exploreHovering ? 'D(b)' : 'D(n)')} onMouseOut={() => {
              this.changeExploreHovering(false);
            }}>
              <Link to="/things" class="D(b) C(white)">Thing</Link>
              <Link to="/things" class="D(b) C(white)">Collections</Link>
            </div>
          </span>
        </div>

        <div class="Mend(20px)">
          <span className="Lh(60px) Cur(p) C(white) Pos(r) D(ib) Mx(4px)">
            <input class={INPUT_STYLE} placeholder="Search Steelblue"/>
          </span>
          {!isLoggedin &&
            <span>
              <Link to="/login" class="C(white) Fz(16px) Cur(p):h P(4px) Mx(4px)"> Sign In  </Link>
              <Link to="/register" class="C(white) Fz(16px) Cur(p):h Bdc(white) Py(6px) Px(8px) Mx(4px) Bdrs(4px) Bds(s) Bdw(t)"> Sign Up  </Link>
            </span>}
          {isLoggedin && <span>
            <span class="C(white) Cur(p) Mend(20px) Pos(r) D(ib) Mstart(20px) Fz(16px)">
              <i class="fas fa-plus"></i> <i class="fas fa-sort-down"></i>
              <select class="Pos(a) D(b) W(50px) H(50px) T(0) End(-15px) Op(0) Bdc(t)" onChange={this.changePath} defaultValue={ROUTE_INVALID}>
                <option class="D(n)" value={ROUTE_INVALID} disabled>---</option>
                <option value={ROUTE_NEW_THING}>New thing</option>
                <option value={ROUTE_NEW_CUSTOMIZABLE}>New customizable</option>
              </select>
            </span>

            <span class="C(white) Cur(p) Pos(r) D(ib) Fz(16px)">
              <i class="fas fa-user"></i> <i class="fas fa-sort-down"></i>
              <select class="Pos(a) D(b) W(50px) H(50px) T(0) End(-15px) Op(0) Bdc(t)" onChange={this.changePath} defaultValue={ROUTE_INVALID}>
                <option class="D(n)" value={ROUTE_INVALID} disabled>---</option>
                <option value={ROUTE_PROFILE}>Your profile</option>
                <option value={ROUTE_THING}>Your things</option>
                <option value={ROUTE_MAKE}>Your makes</option>
                <option value={ROUTE_BOOKMARK}>Your bookmarks</option>
                <option value={ROUTE_SETTINGS}>Settings</option>
                <option value={ROUTE_LOGOUT}>Sign out</option>
              </select>
            </span>
          </span>}
        </div>
      </div>
    </div>;
  }
}
