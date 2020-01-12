import React from 'react';
import {Link} from 'react-router-dom';
import {ROUTE_INVALID, brands} from './utils';
import {onChange} from '../utils';

const INPUT_STYLE = 'W(84%) H(40px) Fz(14px) Bdc(t) O(n) Bdbs(s):h Bdbc(black):f Bdbc(lightgray) Mb(30px)';
const MAX_SIZE = 1048576;

export default class ThingCreatePage extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.state = {
      inputKey: null,

      sourceThingId: this.props.match.params.thingId,
      sourceThingName: null,
      sourceThingUploaderId: null,
      sourceThingUploaderName: null,

      buffer: null,
      fileName: null,
      fileSize: null,

      description: '',
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
    this.onFileChange = this.onFileChange.bind(this);
    this.deleteFile = this.deleteFile.bind(this);
    this.createMake = this.createMake.bind(this);
  }
  async componentDidMount() {
    const source = await this.app.getThingNames({token: this.app.state.token, thingId: this.props.match.params.thingId});
    this.setState({sourceThingName: source.name, sourceThingUploaderId: source.uploaderId, sourceThingUploaderName: source.uploaderName});
    console.log(this.state);
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

  createMake(e) {
    e.preventDefault();
    const {sourceThingId, sourceThingName, sourceThingUploaderId, sourceThingUploaderName,
      buffer, fileName, fileSize, description, printerBrand, raft, support, resolution,
      infill, filamentBrand, filamentColor, filamentMaterial, note} = this.state;
    if (!buffer) {
      return;
    }
    this.app.createMake({sourceThingId, sourceThingName, sourceThingUploaderId, sourceThingUploaderName,
      buffer, fileName, fileSize, description, printerBrand, raft, support, resolution,
      infill, filamentBrand, filamentColor, filamentMaterial, note,
      token: this.app.state.token});
  }

  render() {
    const {fileName, sourceThingName, sourceThingUploaderName, sourceThingId} = this.state;

    return <div class="Py(30px) My(10px)">
      <div class="W(70%) Mx(a)">
        <div class="Bds(s) Ta(c) H(300px)">
          <div class="Py(80px)">
            <label>Upload make picture here *</label>
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
            <div>
              <span class="Fz(14px) Fw(b)">Source</span>
              <div class="W(84%) H(40px) Fz(14px)">
                <span class="Fz(14px) Fw(b)"><Link to={{pathname: `/things/${sourceThingId}`}}>{sourceThingName}</Link></span> by {sourceThingUploaderName}
              </div>
              <span class="Fz(14px) Fw(b)">Description</span>
              <textarea class="D(b) Bdrs(4px) W(100%) H(180px) Px(4px) Py(4px)" placeholder="Write a description..." name="description"
                onChange={this.onChange} value={this.state.summary}/>
            </div>

            <div class="Mt($m-control)">
              <div class="Fz(22px) Bdbs(s) Bdbc(lightgray) Bdw(t)">Printing settings</div>
              <div class="Mt($m-control)">
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
              </div>
            </div>
            <button class={'C(white) D(b) Py(4px) Mt($m-control) Bdrs($bdrs-control) Bdc(t) ' + (this.state.buffer ? 'Bgc(#0280ae.5)' : 'Bgc(#0280ae.2)') } disabled={!this.state.buffer} onClick={this.createMake}>Upload make</button>
          </form>
        </div>
      </div>
    </div>;
  }
}
