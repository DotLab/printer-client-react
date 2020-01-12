import React from 'react';
import MakeOverview from './MakeOverview';

export default class ThingDetailMake extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
  }

  async componentDidMount() {
    await this.props.thingMakeList();
  }

  render() {
    const {makes, thingName} = this.props;

    return <div class="Py(30px) My(10px)">
      {makes.map((make) => <MakeOverview key={make._id} id={make._id} uploaderName={make.uploaderName}
        thingName={thingName}/>)}
    </div>;
  }
}
