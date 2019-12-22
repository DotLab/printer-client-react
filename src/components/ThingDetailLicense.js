import React from 'react';
import {Link} from 'react-router-dom';

export default class ThingDetailLicense extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
  }

  render() {
    return <div class="Py(30px) My(10px)">
      <Link to="/things/detail">Prject</Link>
      <div>
      by <Link to="/user">username</Link> is licensed under the <Link to = "/sth">license</Link> license
      </div>
    </div>;
  }
}
