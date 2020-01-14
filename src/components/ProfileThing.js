import React from 'react';
import ThingOverview from './ThingOverview';

export default class ProfileThing extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
  }

  render() {
    const {things} = this.props;

    return <div class="Py(30px) My(10px)">
      {things.map((thing) => <ThingOverview key={thing._id} id={thing._id} uploaderName={thing.uploaderName}
        name={thing.name} likeCount={thing.likeCount} pictureUrls={thing.pictureUrls}/>)}
    </div>;
  }
}

