import React from 'react';
import {Link} from 'react-router-dom';
import ThingDetailInfo from './ThingDetailInfo';
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
      tab: COMMENTS,
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
    };

    this.makeComment = this.makeComment.bind(this);
  }

  async componentDidMount() {
    const thing = await this.app.thingDetail({thingId: this.props.match.params.thingId});
    this.setState(thing);
    const comments = await this.app.getCommentList({thingId: this.state._id, token: this.app.state.token, limit: LIMIT});
    this.setState({comments});
  }

  async makeComment(comment) {
    await this.app.comment({thingId: this.state._id, comment, token: this.app.state.token});
  }

  render() {
    const {tab, uploaderName, fileName, fileSize, name, license, summary, printerBrand,
      raft, support, resolution, infill, filamentBrand, filamentColor, filamentMaterial,
      note, uploadDate, likeCount, bookmarkCount, downloadCount, commentCount, makeCount,
      remixCount, comments} = this.state;
    console.log(this.state);

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
          <div>
            <span class="Mend(26px) Cur(p)"><i class="fas fa-thumbs-up"></i> {likeCount}</span>
            <span class="Mend(26px) Cur(p)"><i class="fas fa-bookmark"></i> {bookmarkCount}</span>
            <span class="Mend(26px) Cur(p)"><i class="fas fa-download"></i> {downloadCount}</span>
            <Link to="/things/new/make" class="Td(n):h Fz(16px) C(black) Mend(26px) Cur(p)"><i class="fas fa-wrench"></i> MAKE {makeCount}</Link>
            <Link to="/things/new/remix"class="Td(n):h Fz(16px) C(black) Cur(p)"><i class="fas fa-compact-disc"></i> REMIX {remixCount}</Link>
          </div>
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
        {tab === COMMENTS && <ThingDetailComment comments={comments} makeComment={this.makeComment} commentCount={commentCount}/>}
        {tab === MAKES && <ThingDetailMake/>}
        {tab === REMIXES && <ThingDetailRemix/>}
        {tab === LICENSE && <ThingDetailLicense license={getFullLicenseName(license)} name={name} uploaderName={uploaderName}/>}

      </div>
    </div>;
  }
}
