import React from 'react';
import ThingDetailInfo from './ThingDetailInfo';
import ThingPanel from './ThingPanel';
import ThingDetailComment from './ThingDetailComment';
import ThingDetailMake from './ThingDetailMake';
import ThingDetailRemix from './ThingDetailRemix';
import ThingDetailLicense from './ThingDetailLicense';

import {DETAIL, COMMENTS, MAKES, REMIXES, LICENSE} from './utils';
import {formatDate, formatNumberShort, getFullLicenseName} from '../utils';
const LIMIT = 20;

export default class ThingDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.state = {
      tab: MAKES,
      uploaderName: null,
      fileName: null,
      fileSize: null,

      _id: null,
      name: null,
      license: null,
      category: null,
      type: null,
      summary: null,
      printerBrand: null,
      raft: null,
      support: null,
      resolution: null,
      infill: null,
      filamentBrand: null,
      filamentColor: null,
      filamentMaterial: null,
      note: null,

      uploadDate: null,
      likeCount: null,
      bookmarkCount: null,
      downloadCount: null,
      commentCount: null,
      makeCount: null,
      remixCount: null,
      comments: [],
      makes: [],
      liked: false,
      bookmarked: false,
      downloadLink: null,
    };

    this.getThingComments = this.getThingComments.bind(this);
    this.makeComment = this.makeComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
    this.like = this.like.bind(this);
    this.unlike = this.unlike.bind(this);
    this.bookmark = this.bookmark.bind(this);
    this.unBookmark = this.unBookmark.bind(this);
    this.download = this.download.bind(this);
    this.thingMakeList = this.thingMakeList.bind(this);
  }

  async componentDidMount() {
    const thing = await this.app.thingDetail({thingId: this.props.match.params.thingId});
    this.setState(thing);
    let liked = false;
    let bookmarked = false;
    if (this.app.state.token) {
      liked = await this.app.thingLikeStatus({thingId: this.state._id, token: this.app.state.token});
      bookmarked = await this.app.thingBookmarkStatus({thingId: this.state._id, token: this.app.state.token});
    }
    const downloadLink = await this.app.getSignedUrl({thingId: this.state._id});
    this.setState({liked, bookmarked, downloadLink});
  }

  async getThingComments() {
    const comments = await this.app.getCommentList({thingId: this.props.match.params.thingId, token: this.app.state.token, limit: LIMIT});
    this.setState({comments});
  }

  async makeComment(comment) {
    await this.app.comment({thingId: this.state._id, comment, token: this.app.state.token});
    const comments = await this.app.getCommentList({thingId: this.state._id, token: this.app.state.token, limit: LIMIT});
    this.setState({comments});
  }

  async deleteComment(commentId) {
    await this.app.deleteComment({commentId, token: this.app.state.token});
    const comments = await this.app.getCommentList({thingId: this.state._id, token: this.app.state.token, limit: LIMIT});
    this.setState({comments});
  }

  async checkLogin() {
    if (!this.app.state.token) {
      this.props.history.push('/login');
    }
  }

  async like() {
    await this.app.likeThing({token: this.app.state.token, thingId: this.state._id});
    const likeCount = await this.app.thingLikeCount({thingId: this.state._id});
    this.setState({likeCount, liked: true});
  }

  async unlike() {
    await this.app.unlikeThing({token: this.app.state.token, thingId: this.state._id});
    const likeCount = await this.app.thingLikeCount({thingId: this.state._id});
    this.setState({likeCount, liked: false});
  }

  async bookmark() {
    await this.app.bookmarkThing({token: this.app.state.token, thingId: this.state._id});
    const bookmarkCount = await this.app.thingBookmarkCount({thingId: this.state._id});
    this.setState({bookmarkCount, bookmarked: true});
  }

  async unBookmark() {
    await this.app.unBookmarkThing({token: this.app.state.token, thingId: this.state._id});
    const bookmarkCount = await this.app.thingBookmarkCount({thingId: this.state._id});
    this.setState({bookmarkCount, bookmarked: false});
  }

  async download() {
    await this.app.download({thingId: this.state._id});
    const downloadCount = await this.app.thingDownloadCount({thingId: this.state._id});
    this.setState({downloadCount});
  }

  async thingMakeList() {
    const makes = await this.app.thingMakeList({thingId: this.props.match.params.thingId, limit: LIMIT});
    this.setState({makes});
  }

  render() {
    const {tab, _id, uploaderName, fileName, fileSize, name, license, summary, printerBrand,
      raft, support, resolution, infill, filamentBrand, filamentColor, filamentMaterial,
      note, uploadDate, likeCount, bookmarkCount, downloadCount, commentCount, makeCount,
      remixCount, comments, makes, liked, bookmarked, downloadLink} = this.state;

    return <div>
      <div class="W(70%) Mx(a)">
        <div class="D(f) Jc(sb) Pt(20px)">
          <div class="D(f)">
            <div class="Bdrs(100%) Mend(20px) D(b)"><i class="fas fa-print"></i></div>
            <div>
              <div class="C(black) Td(u):h Cur(p)">{name}</div>
              <div class="Fz(14px) C($gray-500)">{uploaderName}</div>
            </div>
          </div>
          <ThingPanel likeCount={likeCount} bookmarkCount={bookmarkCount} makeCount={makeCount}
            remixCount={remixCount} like={this.like} unlike={this.unlike} liked={liked}
            bookmark={this.bookmark} unBookmark={this.unBookmark} bookmarked={bookmarked}
            download={this.download} downloadLink={downloadLink} downloadCount={downloadCount}
            thingId={_id} isLoggedIn={this.app.state.token}/>
        </div>
        <div class="H(60px) My(20px) Lh(60px)">
          <span onClick={() => this.setState({tab: DETAIL})} class={'Td(n):h C(black):h Px(20px) Py(10px) Bdbs(s):h Bdbc(black) ' + (tab === DETAIL ? 'C(black) Bdbs(s)' : 'C(gray)')}>
            <i class="fas fa-info"></i> details
          </span>
          <span onClick={() => this.setState({tab: COMMENTS})} class={'Td(n):h C(black):h Px(20px) Py(10px) Bdbs(s):h Bdbc(black):h ' + (tab === COMMENTS ? 'C(black) Bdbs(s)' : 'C(gray)')}>
            <i class="fas fa-comments"></i> comments
          </span>
          <span onClick={() => this.setState({tab: MAKES})} class={'Td(n):h C(black):h Px(20px) Py(10px) Bdbs(s):h Bdbc(black):h ' + (tab === MAKES ? 'C(black) Bdbs(s)' : 'C(gray)')}>
            <i class="fas fa-wrench"></i> makes
          </span>
          <span onClick={() => this.setState({tab: REMIXES})} class={'Td(n):h C(black):h Px(20px) Py(10px) Bdbs(s):h Bdbc(black):h ' + (tab === REMIXES ? 'C(black) Bdbs(s)' : 'C(gray)')}>
            <i class="fas fa-compact-disc"></i> remixes
          </span>
          <span onClick={() => this.setState({tab: LICENSE})} class={'Td(n):h C(black):h Px(20px) Py(10px) Bdbs(s):h Bdbc(black):h ' + (tab === LICENSE ? 'C(black) Bdbs(s)' : 'C(gray)')}>
            <i class="fas fa-balance-scale"></i> View license
          </span>
        </div>

        {tab === DETAIL && <ThingDetailInfo fileName={fileName} uploadDate={formatDate(uploadDate)} fileSize={formatNumberShort(fileSize, 2)}
          summary={summary} printerBrand={printerBrand} raft={raft} support={support} resolution={resolution} infill={infill}
          filamentBrand={filamentBrand} filamentColor={filamentColor} filamentMaterial={filamentMaterial} note={note}
        />}
        {tab === COMMENTS && <ThingDetailComment checkLogin={this.checkLogin} comments={comments} makeComment={this.makeComment}
          deleteComment={this.deleteComment} commentCount={commentCount} getThingComments={this.getThingComments}/>}
        {tab === MAKES && <ThingDetailMake thingId={_id} thingMakeList={this.thingMakeList} makes={makes} thingName={name}/>}
        {tab === REMIXES && <ThingDetailRemix/>}
        {tab === LICENSE && <ThingDetailLicense license={getFullLicenseName(license)} name={name} uploaderName={uploaderName}/>}

      </div>
    </div>;
  }
}
