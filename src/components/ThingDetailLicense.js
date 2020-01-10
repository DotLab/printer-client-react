import React from 'react';
import {Link} from 'react-router-dom';

export default class ThingDetailLicense extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
  }

  render() {
    const {name, license, uploaderName} = this.props;

    return <div class="Py(30px) My(10px)">
      <Link to="/things/detail">{name}</Link>
      <div>
      by <Link to="/user">{uploaderName}</Link> is licensed under the <Link to = "/sth">{license}</Link> license
      </div>
    </div>;
  }
}
