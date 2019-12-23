
import React from 'react';
import {Link} from 'react-router-dom';
import Comment from './Comment';

export default class Make extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
  }

  render() {
    return <div>
      <div class="W(70%) Mx(a)">
        <div class="D(f) Jc(sb)">
          <div class="D(f)">
            <div class="Bdrs(100%) Mend(20px) D(b)"><i class="fas fa-print"></i></div>
            <div>
              <div class="C(black) Td(u):h Cur(p)">some project</div>
              <div class="Fz(14px) C($gray-500)">some author</div>
            </div>
          </div>
        </div>

        <div class="Py(30px) D(f) Jc(sa) My(10px)">
          <div><img class="Maw(100%)" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample87.jpg" alt="sample87"/></div>
          <div class="W(50%) Mx(20px)">
            <div>Source: <Link to="/things/detail">original author</Link></div>
            <div class="My(10px)">
              <Comment/>
            </div>
            <div class="My(10px)">
              <Comment/>
            </div>
            <span class="Py(20px) Cur(p) Mend(20px)"><i class="fas fa-thumbs-up"></i> 12</span>
            <span class="Py(20px) Cur(p) Mend(20px)"><i class="fas fa-comment"></i> 12</span>
            <input placeholder="comment.."></input>
          </div>
        </div>
      </div>
    </div>;
  }
}
