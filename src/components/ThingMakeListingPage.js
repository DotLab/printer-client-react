import React from 'react';
import ThingOverview from './ThingOverview';

export default class ThingMakeListingPage extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
  }

  render() {
    return <div>
      <div class="W(70%) Mx(a) Pos(r)">
        <ThingOverview/>
        <ThingOverview/>
        <ThingOverview/>
        <ThingOverview/>
        <ThingOverview/>
      </div>
    </div>;
  }
}


// thing detail page: like, bookmark, download, components
// thing-detail-info: desctiption
// thing-detail-comment: <make comment box>, comment list(comment body)
// thing-detail-make: make list --> make detail: like <comment>
// thing-detail-remix
// thing-detail-license
