
import React from 'react';
import {Link} from 'react-router-dom';
import Comment from './Comment';
import {onChange, formatDate, LIMIT} from '../utils';

export default class MakeDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.state = {
      comment: '',
      focus: false,
      comments: [],

      _id: this.props.match.params.makeId,
      uploaderName: '',
      sourceThingId: null,
      sourceThingName: '',
      sourceThingUploaderName: '',
      description: '',
      printerBrand: '',
      raft: '',
      support: '',
      resolution: '',
      infill: '',
      filamentBrand: '',
      filamentColor: '',
      filamentMaterial: '',
      note: '',
      uploadDate: null,
      likeCount: null,
      commentCount: null,
      liked: false,
    };

    this.onChange = onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.makeComment = this.makeComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.like = this.like.bind(this);
    this.unlike = this.unlike.bind(this);
  }

  async componentDidMount() {
    const make = await this.app.makeDetail({makeId: this.props.match.params.makeId});
    this.setState(make);
    if (this.app.state.token) {
      const liked = await this.app.makeLikeStatus({makeId: this.state._id, token: this.app.state.token});
      this.setState({liked});
    }

    const comments = await this.app.getMakeCommentList({makeId: this.props.match.params.makeId, token: this.app.state.token, limit: LIMIT});
    this.setState({comments});
  }

  async makeComment() {
    await this.app.commentMake({makeId: this.state._id, comment: this.state.comment, token: this.app.state.token});
    const comments = await this.app.getMakeCommentList({makeId: this.state._id, token: this.app.state.token, limit: LIMIT});
    this.setState({comments, comment: ''});
  }

  async deleteComment(commentId) {
    await this.app.deleteCommentMake({commentId, token: this.app.state.token});
    const comments = await this.app.getMakeCommentList({makeId: this.state._id, token: this.app.state.token, limit: LIMIT});
    this.setState({comments});
  }

  async like() {
    await this.app.likeMake({token: this.app.state.token, makeId: this.state._id});
    const likeCount = await this.app.makeLikeCount({makeId: this.state._id});
    this.setState({likeCount, liked: true});
  }

  async unlike() {
    await this.app.unlikeMake({token: this.app.state.token, makeId: this.state._id});
    const likeCount = await this.app.makeLikeCount({makeId: this.state._id});
    this.setState({likeCount, liked: false});
  }

  onFocus(e) {
    e.preventDefault();
    if (!this.app.state.token) {
      this.props.history.push('/login');
    }
    this.setState({focus: true});
  }

  render() {
    const {focus, comment, comments, printerBrand, raft, support, resolution, infill,
      filamentBrand, filamentColor, filamentMaterial, note, sourceThingId, sourceThingName,
      sourceThingUploaderName, uploaderName, uploadDate, likeCount, liked} = this.state;

    return <div>
      <div class="W(70%) Mx(a)">
        <div class="D(f) Jc(sb) Pt(20px)">
          <div class="D(f)">
            <div class="Bdrs(100%) Mend(20px) D(b)"><i class="fas fa-print"></i></div>
            <div>
              <div class="C(black) Td(u):h Cur(p) Fz(18px) Mstart(4px)"> {uploaderName}</div>
              <div class="Fz(14px) C($gray-500)"> {formatDate(uploadDate)}</div>
            </div>
          </div>
          {!liked && <span class="Mend(26px) Cur(p)" onClick={this.like}><i class="fas fa-thumbs-up"></i> {likeCount}</span>}
          {liked && <span class="Mend(26px) Cur(p) C(#0280ae)" onClick={this.unlike}><i class="fas fa-thumbs-up"></i> {likeCount}</span>}
        </div>

        <div class="Py(30px) D(f) Jc(sa) My(10px)">
          <div><img class="Maw(100%)" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample87.jpg" alt="sample87"/></div>
          <div class="W(50%) Mx(20px)">
            <div class="D(f)">
              <span>Source:</span>
              <div class="Mx(10px)">
                <div><Link to={{pathname: `/things/${sourceThingId}/details`}}>{sourceThingName}</Link></div>
                <div>by <Link to={{pathname: `/users/${sourceThingUploaderName}/`}}>{sourceThingUploaderName}</Link></div>
              </div>
            </div>
            <div class="My(20px) Bdrs(4px) Bds(s) Bdw(t) Bdc(lightgray)">
              <label class="Bgc(lightgray) W(100%)">
                <span class="Mx(20px)">Metadata</span></label>
              <div class="Px(20px)">
                {printerBrand && <div><span class="Mend(10px) Fw(b)">printerBrand: </span>{printerBrand}</div>}
                {raft && <div><span class="Mend(10px) Fw(b)">raft: </span>{raft}</div>}
                {support && <div><span class="Mend(10px) Fw(b)">support: </span>{support}</div>}
                {resolution && <div><span class="Mend(10px) Fw(b)">resolution: </span>{resolution}</div>}
                {infill && <div><span class="Mend(10px) Fw(b)">infill: </span>{infill}</div>}
                {filamentBrand && <div><span class="Mend(10px) Fw(b)">filamentBrand: </span>{filamentBrand}</div>}
                {filamentColor && <div><span class="Mend(10px) Fw(b)">filamentColor: </span>{filamentColor}</div>}
                {filamentMaterial && <div><span class="Mend(10px) Fw(b)">filamentMaterial: </span>{filamentMaterial}</div>}
                {note && <div><span class="Mend(10px) Fw(b)">note: </span>{note}</div>}
              </div>
            </div>
          </div>
        </div>
        <div>
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
              commentAuthorName={comment.commentAuthorName} date={formatDate(comment.date)} deleteComment={this.deleteComment}/>)}
          </div>
        </div>
      </div>
    </div>;
  }
}
