import React from 'react';
import Comment from './Comment';
import {onChange, formatDate} from '../utils';

export default class ThingDetailComment extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.state = {
      comment: '',
      focus: false,
    };

    this.onChange = onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.makeComment = this.makeComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
  }

  async componentDidMount() {
    await this.props.getThingComments();
  }

  async makeComment(e) {
    e.preventDefault();
    await this.props.makeComment(this.state.comment);
    this.setState({comment: ''});
  }

  async deleteComment(commentId) {
    await this.props.deleteComment(commentId);
  }

  onFocus(e) {
    e.preventDefault();
    this.props.checkLogin();
    this.setState({focus: true});
  }

  render() {
    const {comments} = this.props;
    const {focus, comment} = this.state;

    return <div class="Py(30px) My(10px)">

      <div class="My(20px) Bdrs(4px) Bds(s) Bdw(t) Bdc(lightgray)">
        <textarea class="D(b) Bdrs(4px) Bdc(t) W(100%) H(120px)" placeholder="Add a public comment..." name="comment"
          onChange={this.onChange} value={this.state.comment} onFocus={this.onFocus}/>
      </div>
      <div>
        <button class={'Fl(end) Bdc(t) C(white) Px(8px) Py(2px) Mt(10px) Mend(8px) Fz(12px) W(80px) Bdrs($bdrs-control) '
        + (focus ? 'Op(1) ' : 'Op(0) ') + (comment === '' ? 'Bgc(dimgray)' : 'Bgc(black)')} disabled={comment === ''}
        onClick={this.makeComment} >comment</button>
      </div>

      <div class="My(80px) Py(20px)">
        {comments.map((comment) => <Comment key={comment._id} id={comment._id} body={comment.body}
          commentAuthorName={comment.commentAuthorName} date={formatDate(comment.date)} deleteComment={this.deleteComment}
          avatarUrl={comment.commentAuthorAvatarUrl}/>)}
      </div>
    </div>;
  }
}
