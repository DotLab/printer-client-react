import React from 'react';
import MakeOverview from './MakeOverview';

export default class ThingDetailMake extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.state = {
      makes: [],
    };
  }

  async componentDidMount() {
    await this.props.thingMakeList({thingId: this.props.thingId});
  }

  render() {
    const {makes} = this.props;

    return <div class="Py(30px) My(10px)">
      {makes.map((make) => <MakeOverview key={make._id} id={make._id} />)}

      {/* <MakeOverview/>
      <MakeOverview/> */}

    </div>;
  }
}
