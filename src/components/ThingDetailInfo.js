import React from 'react';
const ReactMarkdown = require('react-markdown');

export default class ThingDetailInfo extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
  }

  render() {
    const {fileName, fileSize, uploadDate, summary} = this.props;
    return <div>
      <div class="Py(30px) D(f) Jc(sa) My(10px) Bdrs(4px) Bds(s) Bdw(t) Bdc(lightgray)">
        <div><img class="Maw(100%)" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample87.jpg" alt="sample87"/></div>
        <div class="Mx(20px)">
          <div>
            <span class="Mx(10px)"><i class="far fa-file-alt"></i> {fileName}</span>
            <span class="Mx(10px)">{fileSize}</span>
            <span class="Mx(10px)">{uploadDate}</span>
          </div>
        </div>
      </div>
      <div class="My(20px) Bdrs(4px) Bds(s) Bdw(t) Bdc(lightgray)">
        <label class="Bgc(lightgray) W(100%)">
          <span class="Mx(20px)">Summary</span></label>
        <div class="Px(20px)">
          <ReactMarkdown source={summary}/>
        </div>
      </div>
    </div>;
  }
}
