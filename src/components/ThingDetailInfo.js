import React from 'react';
import {Link} from 'react-router-dom';
const ReactMarkdown = require('react-markdown');

export default class ThingDetailInfo extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.state = {
      pictureId: 0,
    };

    this.slide = this.slide.bind(this);
  }

  slide(e) {
    e.preventDefault();
    const num = this.props.pictureUrls.length;
    const pictureId = (this.state.pictureId + 1) % num;
    this.setState({pictureId: pictureId});
  }

  render() {
    const {sourceThingId, sourceThingName, sourceThingUploaderName,
      fileName, fileSize, uploadDate, summary, printerBrand, raft, support, resolution, infill,
      filamentBrand, filamentColor, filamentMaterial, note, pictureUrls} = this.props;
    const {pictureId} = this.state;

    return <div>
      <div class="Py(30px) D(f) Jc(sa) My(10px) Bdrs(4px) Bds(s) Bdw(t) Bdc(lightgray)">
        {(pictureUrls.length !== 0) &&
        <div class="W(60%) D(f)">
          <span class="Lh(400px) Mx(10px)"><i class="fas fa-chevron-circle-left"></i></span>
          <div class="W(400px) H(400px) Bds(s)">
            {pictureUrls.map((url, i) => <img class={'H(100%) W(100%) '+ (i === pictureId ? 'D(b)' : 'D(n)')} key={url._id} src={url} alt="sth"/>)}
          </div>
          <span class="Lh(400px) Mx(10px)" onClick={this.slide}><i class="fas fa-chevron-circle-right"></i></span>
        </div>}

        <div class="Mx(20px)">
          <div>
            <span class="Mx(10px)"><i class="far fa-file-alt"></i> {fileName}</span>
            <span class="Mx(10px)">{fileSize}</span>
            <span class="Mx(10px)">{uploadDate}</span>
          </div>
        </div>
      </div>
      {sourceThingId && <div class="My(20px) Bdrs(4px) Bds(s) Bdw(t) Bdc(lightgray)">
        <label class="Bgc(lightgray) W(100%)">
          <span class="Mx(20px)">Source</span></label>
        <div class="Px(20px)">
          <div><span class="Mend(10px) Fw(b)">source Thing: </span>
            <Link to={{pathname: `/things/${sourceThingId}/details`}}>{sourceThingName}</Link>
          </div>
          <div><span class="Mend(10px) Fw(b)">source uploader: </span>
            <Link to={{pathname: `/${sourceThingUploaderName}`}}>{sourceThingUploaderName}</Link>
          </div>
        </div>
      </div>}

      <div class="My(20px) Bdrs(4px) Bds(s) Bdw(t) Bdc(lightgray)">
        <label class="Bgc(lightgray) W(100%)">
          <span class="Mx(20px)">Summary</span></label>
        <div class="Px(20px)">
          <ReactMarkdown source={summary}/>
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
    </div>;
  }
}
