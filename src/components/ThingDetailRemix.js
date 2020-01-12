import React from 'react';
import RemixOverview from './RemixOverview';

export default class ThingDetailRemix extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
  }

  async componentDidMount() {
    await this.props.thingRemixList();
  }

  render() {
    const {remixes} = this.props;

    return <div class="Py(30px) My(10px)">
      {remixes.map((remix) => <RemixOverview key={remix._id} id={remix._id} uploaderName={remix.uploaderName}
        name={remix.name}
      />)}
    </div>;
  }
}
