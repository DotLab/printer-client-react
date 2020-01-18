import React from 'react';
import {Link} from 'react-router-dom';
import queryString from 'query-string';
import {onChange, pushHistory} from '../utils';
import {ROUTE_NEW_THING, ROUTE_NEW_CUSTOMIZABLE, ROUTE_PROFILE, ROUTE_BOOKMARK,
  ROUTE_MAKE, ROUTE_THING, ROUTE_SETTINGS, ROUTE_LOGOUT, ROUTE_INVALID} from './utils';
const INPUT_STYLE = 'H(40px) Bdrs(4px) W(100%) Fz(14px) Fw(400) P(12px) Bdc(t) Bgc(#24292e) C(white)';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
    this.query = queryString.parse(props.location.search);

    this.state = {
      q: '',
      avatarUrl: '',
    };

    this.onChange = onChange.bind(this);
    this.pushHistory = pushHistory.bind(this);
    this.changePath = this.changePath.bind(this);
    this.search = this.search.bind(this);
  }

  async componentDidMount() {
    if (this.app.state.user) {
      this.setState(this.app.state.user);
    }
  }

  changePath(e) {
    if (e.target.value === ROUTE_NEW_THING) {
      this.props.history.push('/things/new');
    } else if (e.target.value === ROUTE_NEW_CUSTOMIZABLE) {
      this.props.history.push('/things/customizable/new');
    } else if (e.target.value === ROUTE_PROFILE) {
      if (this.app.state.user) {
        this.props.history.push('/');
        this.props.history.push(this.app.state.user.userName + '/overview');
      } else {
        this.app.userLogOut();
        this.app.userLogin({email: 'alice@gmail.com', password: '123'});
      }
    } else if (e.target.value === ROUTE_BOOKMARK) {
      if (this.app.state.user) {
        this.props.history.push('/');
        this.props.history.push(this.app.state.user.userName + '/bookmarks');
      } else {
        this.app.userLogOut();
        this.app.userLogin({email: 'alice@gmail.com', password: '123'});
      }
    } else if (e.target.value === ROUTE_MAKE) {
      if (this.app.state.user) {
        this.props.history.push('/');
        this.props.history.push(this.app.state.user.userName + '/makes');
      } else {
        this.app.userLogOut();
        this.app.userLogin({email: 'alice@gmail.com', password: '123'});
      }
    } else if (e.target.value === ROUTE_THING) {
      if (this.app.state.user) {
        this.props.history.push('/');
        this.props.history.push(this.app.state.user.userName + '/things');
      } else {
        this.app.userLogOut();
        this.app.userLogin({email: 'alice@gmail.com', password: '123'});
      }
    } else if (e.target.value === ROUTE_SETTINGS) {
      this.props.history.push('/settings/profile');
    } else if (e.target.value === ROUTE_LOGOUT) {
      this.app.userLogOut();
    }
    e.target.value = '';
  }

  async search(e) {
    e.preventDefault();
    this.query.q = this.state.q;
    this.props.history.push('/things/?q=' + this.query.q);
  }

  render() {
    const {q} = this.state;
    const isLoggedin = this.app.state.token;
    let avatarUrl = '';
    if (this.app.state.user) {
      avatarUrl = this.app.state.user.avatarUrl;
    }

    return <div>
      <div class="bg-dark H(64px) Pos(st) Mb(20px) D(f) Jc(sa) shadow" >
        <div>
          <h1 class="Fz(20px) Lh(64px) Cur(p) Fl(start) Mstart(20px)"><Link to="/" class="C(white) C(gray):h Td(n):h">Steelblue</Link></h1>
          <span class="Fz(16px) Lh(64px) Cur(p) C(white) Mstart(20px) Pos(r) D(ib)"><Link to="/things" class="C(white) C(gray):h Td(n):h">Things</Link>
          </span>
        </div>

        <div class="Mend(20px)">
          <span className="Lh(64px) Cur(p) C(white) Pos(r) D(ib) Mx(4px)">
            <form onSubmit={this.search}>
              <input class={INPUT_STYLE} placeholder="Search Steelblue" name="q" value={q} onChange={this.onChange}/>
            </form>
          </span>
          {!isLoggedin &&
            <span>
              <Link to="/login" class="C(white) Fz(16px) Cur(p):h P(4px) Mx(4px)"> Sign In  </Link>
              <Link to="/register" class="C(white) Fz(16px) Cur(p):h Bdc(white) Py(6px) Px(8px) Mx(4px) Bdrs(4px) Bds(s) Bdw(t)"> Sign Up  </Link>
            </span>}
          {isLoggedin && <span>
            <span class="C(white) Cur(p) Mend(20px) Pos(r) D(ib) Mstart(20px) Fz(16px)">
              <i class="fas fa-plus"></i> <i class="fas fa-caret-down"></i>
              <select class="Pos(a) D(b) W(50px) H(34px) T(0) End(-15px) Op(0) Bdc(t)" onChange={this.changePath} defaultValue={ROUTE_INVALID}>
                <option class="D(n)" value={ROUTE_INVALID} disabled>---</option>
                <option value={ROUTE_NEW_THING}>New thing</option>
              </select>
            </span>

            <span class="C(white) Cur(p) Pos(r) D(ib) Fz(16px)">
              <div class="Ta(c)">
                {!avatarUrl && <i class="fas fa-user Mx(4px)"></i>}
                {avatarUrl && <img class="W(30px) H(30px) Bdrs(4px) Mx(4px)" src={avatarUrl} alt="avatar"></img>}
                <i class="fas fa-caret-down"></i>
              </div>
              <select class="Pos(a) D(b) W(50px) H(34px) T(0) End(-15px) Op(0) Bdc(t)" onChange={this.changePath} defaultValue={ROUTE_INVALID}>
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
