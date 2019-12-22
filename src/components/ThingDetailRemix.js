import React from 'react';
import ThingOverview from './ThingOverview';

export default class ThingDetailRemix extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
  }

  render() {
    return <div class="Py(30px) My(10px)">
      <ThingOverview/>
      <ThingOverview/>
      <ThingOverview/>
      <ThingOverview/>
      <ThingOverview/>
    </div>;
  }
}
