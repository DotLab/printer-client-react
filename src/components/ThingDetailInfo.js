import React from 'react';

export default class ThingDetailInfo extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
  }

  render() {
    return <div class="Py(30px) D(f) Jc(sa) My(10px)">
      <div><img class="Maw(100%)" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample87.jpg" alt="sample87"/></div>
      <div class="W(50%) Mx(20px)">
        <div class="D(f) Jc(sb)">
          <span><i class="far fa-file-alt"></i> Filename</span>
          <span>date</span>
          <span>size</span>
        </div>
      </div>
      <div>
          description stuff
      </div>
    </div>;
  }
}
