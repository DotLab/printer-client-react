
import React from 'react';

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
  }

  render() {
    const {body} = this.props;
    return <div>
      <div class="D(f) My(30px)">
        <img class="W(40px) H(40px) Bdrs(100%)" src="https://66.media.tumblr.com/6c0422b6fdcdf4992fa551ebea213bae/tumblr_pdir3lVrnk1xzya40o1_250.png" alt="avatar"></img>
        <div class="Mx(10px)">
          <div class="Fw(b)">username </div>
          <div>{body} </div>
        </div>
      </div>
    </div>;
  }
}
