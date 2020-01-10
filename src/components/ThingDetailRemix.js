import React from 'react';
import MakeOverview from './MakeOverview';

export default class ThingDetailRemix extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
  }

  render() {
    return <div class="Py(30px) My(10px)">
      <MakeOverview/>
      <MakeOverview/>
      <MakeOverview/>
      <MakeOverview/>
      <MakeOverview/>
    </div>;
  }
}
