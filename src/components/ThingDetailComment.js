import React from 'react';
import Comment from './Comment';

export default class ThingDetailComment extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
  }

  render() {
    return <div class="Py(30px) My(10px)">
      <div>
        <textarea class="D(b) Bdrs(4px) Bdc(t) W(100%) H(120px)" placeholder="Add a comment..." name="body"
          onFocus={this.editing} />
      </div>
      <div>
        <button class="Fl(end) Bdc(t) Bgc(dimgray) Bgc(black):h C(white) Px(8px) Py(2px) Mt(10px) Mend(8px) Fz(12px) W(80px) Bdrs($bdrs-control) Cur(p):h"
          onClick={this.comment} >comment</button>
      </div>

      <div class="My(80px) Py(20px)">
        <Comment/>
      </div>
    </div>;
  }
}
