import React from 'react';
import ThingOverview from './ThingOverview';

export default class ProfileBookmark extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
  }

  render() {
    const {bookmarks} = this.props;

    return <div class="Py(30px) My(10px)">
      {bookmarks.map((thing) => <ThingOverview key={thing._id} id={thing._id} uploaderName={thing.uploaderName}
        name={thing.name} likeCount={thing.likeCount}/>)}
    </div>;
  }
}

