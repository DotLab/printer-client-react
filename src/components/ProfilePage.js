import React from 'react';
import {Link} from 'react-router-dom';
import ProfileThing from './ProfileThing';
import ProfileMake from './ProfileMake';
import ProfileBookmark from './ProfileBookmark';
import {OVERVIEW, THINGS, MAKES, BOOKMARKS} from './utils';


export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.state = {
      userName: this.props.match.params.username,
      displayName: null,
      bio: '',
      things: [],
      makes: [],
      bookmarks: [],
    };
  }

  async componentDidMount() {
    const user = await this.app.userDetail({userName: this.props.match.params.username});
    this.setState(user);
    const things = await this.app.userThings({userName: this.state.userName});
    const makes = await this.app.userMakes({userName: this.state.userName});
    const bookmarks = await this.app.userBookmarks({userName: this.state.userName});
    this.setState({things, makes, bookmarks});
  }

  render() {
    const {userName, displayName, bio, things, makes, bookmarks} = this.state;
    const {tab} = this.props;
    const isOwner = this.app.state.user && (this.app.state.user.userName === userName);

    return <div class="W(70%) Mx(a)">
      <div class="D(f) Jc(c)">
        <div>
          <div class="W(200px) H(200px) My(20px) Bds(s) Bdw(t) Bdc(lightgray) Lh(200px)">
            <img class="W(100%)" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample87.jpg" alt="sample87"/>
          </div>
          <div class="My(20px)">
            <span class="Fw(b) Fz(18px)">{displayName}</span>
            <div class="Fz(16px)">{userName}</div>
            <div class="My(20px)">{bio}</div>

          </div>
        </div>
        <div class="W(100%) My(20px) Lh(60px) Mstart(20px)">
          <Link to={{pathname: `/${userName}/overview`}} class={'Td(n):h C(black):h Pstart(16px) Pend(16px) Py(10px) Bdbs(s):h Bdbc(black) ' + (tab === OVERVIEW ? 'C(black) Bdbs(s)' : 'C(gray)')}>
             Overview
          </Link>
          <Link to={{pathname: `/${userName}/things`}} class={'Td(n):h C(black):h Pstart(16px) Pend(16px) Py(10px) Bdbs(s):h Bdbc(black):h ' + (tab === THINGS ? 'C(black) Bdbs(s)' : 'C(gray)')}>
             Things
          </Link>
          <Link to={{pathname: `/${userName}/makes`}} class={'Td(n):h C(black):h Pstart(16px) Pend(16px) Py(10px) Bdbs(s):h Bdbc(black):h ' + (tab === MAKES ? 'C(black) Bdbs(s)' : 'C(gray)')}>
             Makes
          </Link>
          <Link to={{pathname: `/${userName}/bookmarks`}} class={'Td(n):h C(black):h Pstart(16px) Pend(16px) Py(10px) Bdbs(s):h Bdbc(black):h ' + (tab === BOOKMARKS ? 'C(black) Bdbs(s)' : 'C(gray)')}>
             Bookmarks
          </Link>
          <div class="Lh(n)">
            {tab === THINGS && <ProfileThing things={things} isOwner={isOwner}/>}
            {tab === MAKES && <ProfileMake makes={makes} isOwner={isOwner}/>}
            {tab === BOOKMARKS && <ProfileBookmark bookmarks={bookmarks} isOwner={isOwner}/>}
          </div>
        </div>
      </div>
    </div>;
  }
}

