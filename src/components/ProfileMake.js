import React from 'react';
import MakeOverview from './MakeOverview';

export default class ProfileMake extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
  }

  render() {
    const {makes} = this.props;

    return <div class="Py(30px) My(10px)">
      {makes.map((make) => <MakeOverview key={make._id} id={make._id} uploaderName={make.uploaderName}/>)}
    </div>;
  }
}

