
import React from 'react';
import ThingOverview from './ThingOverview';
import MakeOverview from './MakeOverview';
import {HOMEPAGE_LIMIT} from '../utils';
import {Link} from 'react-router-dom';


export default class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.state = {
      things: [],
      makes: [],
    };
  }

  async componentDidMount() {
    const things = await this.app.hightLightThings({limit: HOMEPAGE_LIMIT});
    const makes = await this.app.latestMakes({limit: HOMEPAGE_LIMIT});
    this.setState({things, makes});
  }

  render() {
    const {things, makes} = this.state;
    const isLoggedIn = this.app.state.token;

    return <div>
      <div class="Mt(40px) W(80%) Mx(a) Pos(r)">
        <div class="W(96%) Mx(a) Ta(c) H(300px) shadow p-3 rounded">
          <div class="Py(80px)">
            <label class="Fz(24px)">Would you like to make something today? </label>
            {isLoggedIn && <div class="My(30px) W(70%) Mx(a)">
              <Link to="/things/new" class="btn btn-outline-success W(40%) Mx(20px)">Create a thing</Link>
            </div>}
            {!isLoggedIn && <div class="My(30px) W(40%) Mx(a)">
              <Link to="/register" class="btn btn-outline-success W(40%) Mx(20px)">Sign up</Link>
            </div>}
          </div>
        </div>
        <div><label class="Fz(24px) Px(40px) Mt(40px)">Hightlight things </label></div>
        {things.map((thing) => <ThingOverview key={thing._id} id={thing._id} name={thing.name}
          uploaderName={thing.uploaderName} likeCount={thing.likeCount} pictureUrls={thing.pictureUrls}/>)}

        <div><label class="Fz(24px) Px(40px) Mt(40px)">Latest makes </label></div>
        {makes.map((make) => <MakeOverview key={make._id} id={make._id} uploaderName={make.uploaderName}
          pictureUrl={make.pictureUrl}/>)}
      </div>
    </div>;
  }
}
