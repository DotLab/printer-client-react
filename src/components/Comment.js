
import React from 'react';

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.deleteComment = this.deleteComment.bind(this);
  }

  async deleteComment(e) {
    e.preventDefault();
    await this.props.deleteComment(this.props.id);
  }

  render() {
    const {body, commentAuthorName, date} = this.props;
    return <div>
      <div class="D(f) My(30px)">
        <img class="W(40px) H(40px) Bdrs(100%)" src="https://66.media.tumblr.com/6c0422b6fdcdf4992fa551ebea213bae/tumblr_pdir3lVrnk1xzya40o1_250.png" alt="avatar"></img>
        <div class="Mx(10px) W(70%)">
          <div class="Fw(b)">{commentAuthorName}
            <span class="Fw(n) Fz(14px) Mstart(10px)">{date}</span>
            <span class="Fl(end) Fz(14px) Cur(p)" onClick={this.deleteComment}><i class="fas fa-trash"></i>  </span>
          </div>
          <div>{body} </div>
        </div>
      </div>
    </div>;
  }
}
