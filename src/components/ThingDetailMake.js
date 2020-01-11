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
    const makes = await this.props.thingMakeList({thingId: this.props.thingId});
    this.setState({makes});
  }

  render() {
    return <div class="Py(30px) My(10px)">
      <MakeOverview/>
      <MakeOverview/>

    </div>;
  }
}
