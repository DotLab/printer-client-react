import React from 'react';
import {Link} from 'react-router-dom';
import ThingDetailInfo from './ThingDetailInfo';
import ThingDetailComment from './ThingDetailComment';
import ThingDetailMake from './ThingDetailMake';
import ThingDetailRemix from './ThingDetailRemix';
import ThingDetailLicense from './ThingDetailLicense';

import {DETAIL, COMMENTS, MAKES, REMIXES, LICENSE} from './utils';

export default class ThingDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.state = {
      tab: DETAIL,
    };
  }

  render() {
    const {tab} = this.state;

    return <div>
      <div class="W(70%) Mx(a)">
        <div class="D(f) Jc(sb) Pt(20px)">
          <div class="D(f)">
            <div class="Bdrs(100%) Mend(20px) D(b)"><i class="fas fa-print"></i></div>
            <div>
              <div class="C(black) Td(u):h Cur(p)">some project</div>
              <div class="Fz(14px) C($gray-500)">some author</div>
            </div>
          </div>
          <div>
            <span class="Mend(26px) Cur(p)"><i class="fas fa-thumbs-up"></i> 12</span>
            <span class="Mend(26px) Cur(p)"><i class="fas fa-bookmark"></i> 12</span>
            <span class="Mend(26px) Cur(p)"><i class="fas fa-download"></i> 12</span>
            <Link to="/things/new/make" class="Td(n):h Fz(16px) C(black) Mend(26px) Cur(p)"><i class="fas fa-wrench"></i> MAKE 12</Link>
            <Link to="/things/new/remix"class="Td(n):h Fz(16px) C(black) Cur(p)"><i class="fas fa-compact-disc"></i> REMIX 12</Link>
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

        {tab === DETAIL && <ThingDetailInfo/>}
        {tab === COMMENTS && <ThingDetailComment/>}
        {tab === MAKES && <ThingDetailMake/>}
        {tab === REMIXES && <ThingDetailRemix/>}
        {tab === LICENSE && <ThingDetailLicense/>}

      </div>
    </div>;
  }
}
