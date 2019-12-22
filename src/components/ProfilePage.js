import React from 'react';
import ProfileThing from './ProfileThing';

const MAKE = 'make';
const OVERVIEW = 'Overview';
const THING = 'Thing';
const BOOKMARK = 'Bookmark';

export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.state = {
      tab: THING,
    };
  }

  render() {
    const {tab} = this.state;

    return <div class="W(70%) Mx(a)">
      <div class="D(f) Jc(c)">
        <div>
          <div class="W(200px) H(200px) My(20px) Bds(s) Bdw(t) Bdc(lightgray) Lh(200px)">
            <img class="W(100%)" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample87.jpg" alt="sample87"/>
          </div>
          <div class="My(20px)">
            <span class="Fw(b) Fz(18px) ">Hinata</span>
            <div class="Fz(16px) ">Hinata</div>
          </div>
        </div>
        <div class="W(100%) My(20px) Lh(60px) Mstart(20px)">
          <span onClick={() => this.setState({tab: OVERVIEW})} class={'Td(n):h C(black):h Px(20px) Bdbs(s):h Bdbc(black) ' + (tab === OVERVIEW ? 'C(black) Bdbs(s)' : 'C(gray)')}>
             Overview
          </span>
          <span onClick={() => this.setState({tab: THING})} class={'Td(n):h C(black):h Px(20px) Bdbs(s):h Bdbc(black):h ' + (tab === THING ? 'C(black) Bdbs(s)' : 'C(gray)')}>
             Things
          </span>
          <span onClick={() => this.setState({tab: MAKE})} class={'Td(n):h C(black):h Px(20px) Bdbs(s):h Bdbc(black):h ' + (tab === MAKE ? 'C(black) Bdbs(s)' : 'C(gray)')}>
             Makes
          </span>
          <span onClick={() => this.setState({tab: BOOKMARK})} class={'Td(n):h C(black):h Px(20px) Bdbs(s):h Bdbc(black):h ' + (tab === BOOKMARK ? 'C(black) Bdbs(s)' : 'C(gray)')}>
             Bookmarks
          </span>
          <div>
            {tab === THING &&
            <span>
              <ProfileThing/>
              <ProfileThing/>
              <ProfileThing/>
            </span>
            }
            {tab === MAKE && <ProfileThing/>}
            {tab === BOOKMARK && <ProfileThing/>}
          </div>
        </div>
      </div>
    </div>;
  }
}

