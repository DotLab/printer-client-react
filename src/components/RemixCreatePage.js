import React from 'react';
import {Link} from 'react-router-dom';
import {PRINTING, ART, FASHION, GADGETS, HOBBY, HOUSEHOLD, LEARNING, MODEL, GAME} from './utils';
import {TYPE_ART, TYPE_PRINTER, TYPE_FASHION, TYPE_GADGETS, TYPE_HOBBY, TYPE_HOUSEHOLD, TYPE_LEARNING,
  TYPE_MODEL, TYPE_GAME, ROUTE_INVALID, lookupSubType, brands} from './utils';
import {CC_BY, CC_BY_SA, CC_BY_ND, CC_BY_NC, CC_BY_NC_SA, CC_BY_NC_ND, CC_PD, GNU_GPL, GNU_LGPL, BSD} from './utils';
import {LICENSE_CC_BY, LICENSE_CC_BY_SA, LICENSE_CC_BY_ND, LICENSE_CC_BY_NC, LICENSE_CC_BY_NC_SA, LICENSE_CC_BY_NC_ND, LICENSE_CC_PD, LICENSE_GNU_GPL, LICENSE_GNU_LGPL, LICENSE_BSD} from './utils';
import {onChange} from '../utils';
const ReactMarkdown = require('react-markdown');

const ALL = 'All';
const INPUT_STYLE = 'W(84%) H(40px) Fz(14px) Bdc(t) O(n) Bdbs(s):h Bdbc(black):f Bdbc(lightgray) Mb(30px)';
const MAX_SIZE = 1048576;
const PLACEHOLDER = 'placeholder';

export default class RemixCreatePage extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.state = {
      subTypes: null,
      printingSettings: true,
      inputKey: null,
      preview: false,

      sourceThingId: this.props.match.params.thingId,
      sourceThingName: null,
      sourceThingUploaderId: null,
      sourceThingUploaderName: null,

      buffer: null,
      fileName: null,
      fileSize: null,
      name: null,
      license: null,
      category: ALL,
      type: ALL,
      summary: '',
      printerBrand: null,
      raft: null,
      support: null,
      resolution: null,
      infill: null,
      filamentBrand: null,
      filamentColor: null,
      filamentMaterial: null,
      note: null,
      filled: true,
    };

    this.onChange = onChange.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.deleteFile = this.deleteFile.bind(this);
    this.createRemix = this.createRemix.bind(this);
    this.checkRequiredFilled = this.checkRequiredFilled.bind(this);
  }

  async componentDidMount() {
    const source = await this.app.getThingNames({token: this.app.state.token, thingId: this.props.match.params.thingId});
    this.setState({sourceThingName: source.name, sourceThingUploaderId: source.uploaderId, sourceThingUploaderName: source.uploaderName});
    console.log(this.state);
  }

  changeFilter(e) {
    const category = e.target.value;
    const subTypes = lookupSubType(category);
    this.setState({subTypes, category});
  }

  onFileChange(e) {
    if (!e.target.files[0]) return;

    const name = e.target.files[0].name;
    const size = e.target.files[0].size;

    if (size > MAX_SIZE) {
      this.app.error('zip too large');
    }
    const fr = new FileReader();
    fr.onload = (e) => {
      const buffer = e.target.result;
      this.setState({buffer, fileName: name, fileSize: size});
    };
    fr.readAsArrayBuffer(e.target.files[0]);
  }

  deleteFile(e) {
    e.preventDefault();
    this.setState({fileName: null, fileSize: null, buffer: null, inputKey: new Date()});
  }

  createRemix(e) {
    e.preventDefault();
    const {sourceThingId, sourceThingName, sourceThingUploaderId, sourceThingUploaderName,
      buffer, fileName, fileSize, name, license, category, type, summary, printerBrand,
      raft, support, resolution, infill, filamentBrand, filamentColor, filamentMaterial, note} = this.state;
    if (!buffer || !name || !license || !type || !summary) {
      return;
    }
    this.app.createRemix({sourceThingId, sourceThingName, sourceThingUploaderId, sourceThingUploaderName,
      fileName, fileSize, buffer, name, license, category, type, summary, printerBrand,
      raft, support, resolution, infill, filamentBrand, filamentColor, filamentMaterial, note,
      token: this.app.state.token});
  }

  checkRequiredFilled() {
    const {buffer, name, license, type, summary} = this.state;
    return (buffer && name && license && type && summary);
  }

  render() {
    const {subTypes, printingSettings, fileName, preview, sourceThingId, sourceThingName, sourceThingUploaderName} = this.state;

    return <div class="Py(30px) My(10px)">
      <div class="W(70%) Mx(a)">
        <div class="Bds(s) Ta(c) H(300px)">
          <div class="Py(80px)">
            <label>Upload zip file here *</label>
            <div class="Fz(12px) Pstart(40px) My(20px)"><input key={this.state.inputKey} type="file" name="file" onChange={this.onFileChange}/>
            </div>
          </div>
        </div>
        <div>
          {fileName && <div class="Fz(16px)">
            <i class="fas fa-file-alt"></i>
            <span>{fileName}</span>
            <span class="Fl(end) Cur(p)" onClick={this.deleteFile}><i class="fas fa-times"></i></span>
          </div>}
          <form class="Px(12px) Bdrs(4px) My(30px) W(100%)">
            <span class="Fz(14px) Fw(b)">Source</span>
            <div class="W(84%) H(40px) Fz(14px)">
              <span class="Fz(14px) Fw(b)"><Link to={{pathname: `/things/${sourceThingId}/details`}}>{sourceThingName}</Link></span> by {sourceThingUploaderName}
            </div>
            <div class="W(100%)">
              <span class="Fz(14px) Fw(b)">Thing name *</span>
              <div><input class={INPUT_STYLE} name="name" onChange={this.onChange} required/></div>
            </div>
            <div class="Mt($m-control)">
              <span class="Fz(14px) Fw(b)">License *</span>
              <select class="D(b) Fz(14px)" name="license" onChange={this.onChange} defaultValue={PLACEHOLDER}>
                <option value={PLACEHOLDER} disabled>---</option>
                <option value={CC_BY}>{LICENSE_CC_BY}</option>
                <option value={CC_BY_SA}>{LICENSE_CC_BY_SA}</option>
                <option value={CC_BY_ND}>{LICENSE_CC_BY_ND}</option>
                <option value={CC_BY_NC}>{LICENSE_CC_BY_NC}</option>
                <option value={CC_BY_NC_SA}>{LICENSE_CC_BY_NC_SA}</option>
                <option value={CC_BY_NC_ND}>{LICENSE_CC_BY_NC_ND}</option>
                <option value={CC_PD}>{LICENSE_CC_PD}</option>
                <option value={GNU_GPL}>{LICENSE_GNU_GPL}</option>
                <option value={GNU_LGPL}>{LICENSE_GNU_LGPL}</option>
                <option value={BSD}>{LICENSE_BSD}</option>
              </select>
            </div>

            <div class="Mt($m-control)">
              <span class="Fz(14px) Fw(b)">Category *</span>
              <select class="D(b) Fz(14px)" onChange={this.changeFilter} defaultValue={ROUTE_INVALID}>
                <option value={ROUTE_INVALID} disabled>---</option>
                <option value={TYPE_PRINTER}>{PRINTING}</option>
                <option value={TYPE_ART}>{ART}</option>
                <option value={TYPE_FASHION}>{FASHION}</option>
                <option value={TYPE_GADGETS}>{GADGETS}</option>
                <option value={TYPE_HOBBY}>{HOBBY}</option>
                <option value={TYPE_HOUSEHOLD}>{HOUSEHOLD}</option>
                <option value={TYPE_LEARNING}>{LEARNING}</option>
                <option value={TYPE_MODEL}>{MODEL}</option>
                <option value={TYPE_GAME}>{GAME}</option>
              </select>
            </div>

            {subTypes && <div class="Mt($m-control)">
              <span class="Fz(14px) Fw(b)">Type *</span>
              <select class="D(b) Fz(14px)" name="type" onChange={this.onChange} defaultValue={PLACEHOLDER}>
                <option value={PLACEHOLDER} disabled>---</option>
                {subTypes.map((x) => <option key={x}>{x}</option>)}
              </select>
            </div>}

            <div class="Mt($m-control)">
              <span class="Fz(14px) Fw(b)">Summary *</span>
              <div>
                <span class={'Fz(14px) Cur(p) Mend(20px) ' + (preview ? '' : 'Fw(b)')} onClick={() => this.setState({preview: false})}>Edit</span>
                <span class={'Fz(14px) Cur(p) ' + (preview ? 'Fw(b)' : '')} onClick={() => this.setState({preview: true})}>Preview changes</span>
              </div>
              {!preview && <textarea class="D(b) Bdrs(4px) W(100%) H(180px)" placeholder="Add a summary..." name="summary"
                onChange={this.onChange} value={this.state.summary} required/>}
              {preview &&
              <div class="Bds(s) Bdw(t) Bdrs(4px) Bdc(lightgray) Px(10px) Py(10px)">
                <ReactMarkdown source={this.state.summary}/>
              </div>}

            </div>

            <div class="Mt($m-control)">
              <span class="Fz(14px) Fw(b)">Printing settings?</span>
              <div class="Mb(20px)">
                <input type="radio" name="print" value="yes" onChange={() => this.setState({printingSettings: true})} defaultChecked/>Yes
                <input class="Mstart(20px)" type="radio" name="print" value="no" onChange={() => this.setState({printingSettings: false})}/>No
              </div>

              {printingSettings && <div class="Mt($m-control)">
                <span class="Fz(14px) Fw(b)">Which brand are you using</span>
                <select class="D(b) Fz(14px)" defaultValue={ROUTE_INVALID} name="printerBrand" onChange={this.onChange}>
                  {brands.map((x) => <option key={x}>{x}</option>)}
                </select>

                <div class="Mt($m-control)">
                  <span class="Fz(14px) Fw(b)">Rafts</span>
                  <div>
                    <input type="radio" name="raft" onChange={this.onChange} value="Yes"/> Yes
                    <input class="Mstart(20px)" type="radio" name="raft" onChange={this.onChange} value="No"/> No
                    <input class="Mstart(20px)" type="radio" name="raft" onChange={this.onChange} value="" defaultChecked/> Doesn't matter
                  </div>
                </div>

                <div class="Mt($m-control)">
                  <span class="Fz(14px) Fw(b)">Support</span>
                  <div>
                    <input type="radio" name="support" onChange={this.onChange} value="Yes"/> Yes
                    <input class="Mstart(20px)" type="radio" name="support" onChange={this.onChange} value="No"/> No
                    <input class="Mstart(20px)" type="radio" name="support" onChange={this.onChange} value="" defaultChecked/> Doesn't matter
                  </div>
                </div>

                <div class="Mt($m-control)">
                  <span class="D(ib) W(46%) Mend(40px)">
                    <span class="Fz(14px) Fw(b)">Resolution</span>
                    <div><input type="number" class={INPUT_STYLE} name="resolution" onChange={this.onChange}/>mm</div>
                  </span>

                  <span class="D(ib) W(46%)">
                    <span class="Fz(14px) Fw(b)">Infill</span>
                    <div><input type="number" min="0" max="100" step="1" class={INPUT_STYLE} name="infill" onChange={this.onChange}/> %</div>
                  </span>
                </div>

                <div>
                  <span class="D(ib) W(46%) Mend(40px)">
                    <span class="Fz(14px) Fw(b)">Filament brand</span>
                    <div><input class={INPUT_STYLE} name="filamentBrand" onChange={this.onChange}/></div>
                  </span>

                  <span class="D(ib) W(46%)">
                    <span class="Fz(14px) Fw(b)">Filament Color</span>
                    <div><input class={INPUT_STYLE} name="filamentColor" onChange={this.onChange}/></div>
                  </span>
                </div>

                <div>
                  <span class="D(ib) W(46%) Mend(40px)">
                    <span class="Fz(14px) Fw(b)">Filament material</span>
                    <div><input class={INPUT_STYLE} name="filamentMaterial" onChange={this.onChange}/></div>
                  </span>
                </div>
              </div>}
              <div>
                <span class="Fz(14px) Fw(b)">Other notes</span>
                <textarea class="D(b) Bdrs(4px) W(100%) H(180px)" placeholder="Add notes..." name="note"
                  onChange={this.onChange} />
              </div>
            </div>

            <button class={'C(white) D(b) Py(4px) Mt($m-control) Bdrs($bdrs-control) Bdc(t) ' + (this.checkRequiredFilled() ? 'Bgc(#0280ae.5)' : 'Bgc(#0280ae.2)') } disabled={!this.checkRequiredFilled()} onClick={this.createRemix}>Upload</button>
          </form>
        </div>
      </div>
    </div>;
  }
}