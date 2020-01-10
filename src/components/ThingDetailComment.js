import React from 'react';
import Comment from './Comment';
import {onChange} from '../utils';

export default class ThingDetailComment extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.state = {
      comment: '',
    };

    this.onChange = onChange.bind(this);
    this.comment = this.comment.bind(this);
  }

  async comment(e) {
    e.preventDefault();
    await this.props.makeComment(this.state.comment);
    this.setState({comment: ''});
  }

  render() {
    const {comments} = this.props;

    return <div class="Py(30px) My(10px)">
      <div class="My(20px) Bdrs(4px) Bds(s) Bdw(t) Bdc(lightgray)">
        <textarea class="D(b) Bdrs(4px) Bdc(t) W(100%) H(120px)" placeholder="Add a comment..." name="comment"
          onChange={this.onChange} value={this.state.comment}/>
      </div>
      <div>
        <button class="Fl(end) Bdc(t) Bgc(dimgray) Bgc(black):h C(white) Px(8px) Py(2px) Mt(10px) Mend(8px) Fz(12px) W(80px) Bdrs($bdrs-control) Cur(p):h"
          onClick={this.comment} >comment</button>
      </div>

      <div class="My(80px) Py(20px)">
        {comments.map((comment) => <Comment key={comment._id} body={comment.body}/>)}
      </div>
    </div>;
  }
}
