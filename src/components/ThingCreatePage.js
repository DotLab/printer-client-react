import React from 'react';
import {PRINTING, ART, FASHION, GADGETS, HOBBY, HOUSEHOLD, LEARNING, MODEL, GAME} from './utils';
import {TYPE_ART, TYPE_PRINTER, TYPE_FASHION, TYPE_GADGETS, TYPE_HOBBY, TYPE_HOUSEHOLD, TYPE_LEARNING,
  TYPE_MODEL, TYPE_GAME, ROUTE_INVALID, lookupSubType, brands} from './utils';
import {CC_BY, CC_BY_SA, CC_BY_ND, CC_BY_NC, CC_BY_NC_SA, CC_BY_NC_ND, CC_PD, GNU_GPL, GNU_LGPL, BSD} from './utils';
import {LICENSE_CC_BY, LICENSE_CC_BY_SA, LICENSE_CC_BY_ND, LICENSE_CC_BY_NC, LICENSE_CC_BY_NC_SA, LICENSE_CC_BY_NC_ND, LICENSE_CC_PD, LICENSE_GNU_GPL, LICENSE_GNU_LGPL, LICENSE_BSD} from './utils';
import {onChange} from '../utils';
const ReactMarkdown = require('react-markdown');

const ALL = 'All';
const INPUT_STYLE = 'W(100%) H(40px) Fz(18px) Bdc(t) O(n) Bdbc(black):f Bdbc(lightgray) Bdw(2px) Mb(30px)';
const MAX_SIZE = 1048576;
const PLACEHOLDER = 'placeholder';

export default class ThingCreatePage extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.state = {
      subTypes: null,
      printingSettings: true,
      inputKey: null,
      inputPictureKey: null,
      preview: false,

      buffer: null,
      fileName: null,
      fileSize: null,
      pictureName: [],
      pictureSize: [],
      pictureBuffer: [],

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
    this.onPictureFileChange = this.onPictureFileChange.bind(this);
    this.deleteFile = this.deleteFile.bind(this);
    this.deletePicture = this.deletePicture.bind(this);
    this.createThing = this.createThing.bind(this);
    this.checkRequiredFilled = this.checkRequiredFilled.bind(this);
  }

  changeFilter(e) {
    const category = e.target.value;
    const subTypes = lookupSubType(category);
    this.setState({subTypes, category});
  }

  onFileChange(e) {
    if (!e.target.files[0]) return;
    console.log('here');
    const name = e.target.files[0].name;
    const size = e.target.files[0].size;

    if (size > MAX_SIZE) {
      console.log('zip too large');
      return;
    }
    const fr = new FileReader();
    fr.onload = (e) => {
      const binary = e.target.result;
      const buffer = btoa(binary);
      this.setState({buffer, fileName: name, fileSize: size});
    };
    fr.readAsBinaryString(e.target.files[0]);
  }

  onPictureFileChange(e) {
    if (!e.target.files[0]) return;

    for (let i = 0; i < e.target.files.length; i++) {
      const name = e.target.files[i].name;
      const size = e.target.files[i].size;

      if (size > MAX_SIZE) {
        console.log('file too large');
        return;
      }

      const fr = new FileReader();
      fr.onload = (e) => {
        const binary = e.target.result;
        const buffer = btoa(binary);

        const pictureBuffer = this.state.pictureBuffer;
        pictureBuffer.push(buffer);
        const pictureName = this.state.pictureName;
        pictureName.push(name);

        this.setState({pictureBuffer, pictureName, pictureSize: size});
      };
      fr.readAsBinaryString(e.target.files[i]);
    }
  }

  deleteFile(e) {
    e.preventDefault();
    this.setState({fileName: null, fileSize: null, buffer: null, inputKey: new Date()});
  }

  deletePicture(e) {
    e.preventDefault();
    this.setState({pictureName: null, pictureSize: null, pictureBuffer: [], inputPictureKey: new Date()});
  }

  createThing(e) {
    e.preventDefault();
    const {buffer, fileName, fileSize, pictureBuffer,
      name, license, category, type, summary, printerBrand,
      raft, support, resolution, infill, filamentBrand, filamentColor, filamentMaterial, note} = this.state;
    if (!buffer || !name || !license || !type || !summary) {
      return;
    }

    this.app.createThing({fileName, fileSize, buffer, pictureBuffer,
      name, license, category, type, summary, printerBrand,
      raft, support, resolution, infill, filamentBrand, filamentColor, filamentMaterial, note,
      token: this.app.state.token});
  }

  checkRequiredFilled() {
    const {buffer, name, license, type, summary} = this.state;
    return (buffer && name && license && type && summary);
  }

  render() {
    const {subTypes, printingSettings, fileName, preview, pictureName} = this.state;

    return <div class="Py(30px) My(10px)">
      <div class="W(70%) Mx(a)">
        <div class="D(ib) W(48%) Bds(s) Ta(c) H(300px) Bdc(lightgray) Bdw(2px)">
          <div class="Py(80px)">
            <label>Upload zip file *</label>
            <div class="Fz(12px) Pstart(40px) My(20px)"><input key={this.state.inputKey} type="file" name="file" onChange={this.onFileChange}/>
            </div>
          </div>
        </div>
        <div class="D(ib) W(48%) Fl(end) Bds(s) Ta(c) H(300px) Bdc(lightgray) Bdw(2px)">
          <div class="Py(80px)">
            <label>Upload pictures *</label>
            <div class="Fz(12px) Pstart(40px) My(20px)">
              <input key={this.state.inputPictureKey} multiple type="file" name="file" onChange={this.onPictureFileChange}/>
            </div>
          </div>
        </div>

        <div class="Mb(40px) W(100%)">
          {fileName && <span class="D(ib) Fz(16px) W(46%)">
            <i class="fas fa-file-alt"></i>
            <span>{fileName}</span>
            <span class="Fl(end) Cur(p)" onClick={this.deleteFile}><i class="fas fa-times"></i></span>
          </span>}
          {(pictureName.length !== 0) && <span class="Fz(16px) W(46%) Fl(end)">
            <i class="fas fa-file-alt"></i>
            <span>{pictureName} </span>
            <span class="Fl(end) Cur(p)" onClick={this.deletePicture}><i class="fas fa-times"></i></span>
          </span>}
        </div>

        <form class="Px(12px) Bdrs(4px) My(30px) W(100%)">
          <div class="W(100%)">
            <span class="Fz(14px) Fw(b)">Thing name *</span>
            <div><input class={INPUT_STYLE} name="name" onChange={this.onChange} required/></div>
          </div>
          <div class="Mt($m-control)">
            <span class="Fz(14px) Fw(b)">License *</span>
            <div>
              <select class={INPUT_STYLE} name="license" onChange={this.onChange} defaultValue={PLACEHOLDER}>
                <option class="D(n)" value={PLACEHOLDER} disabled></option>
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
          </div>

          <div class="Mt($m-control)">
            <span class="Fz(14px) Fw(b)">Category *</span>
            <div>
              <select class={INPUT_STYLE} onChange={this.changeFilter} defaultValue={ROUTE_INVALID}>
                <option class="D(n)" value={ROUTE_INVALID} disabled></option>
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
          </div>

          {subTypes && <div class="Mt($m-control)">
            <span class="Fz(14px) Fw(b)">Type *</span>
            <select class={INPUT_STYLE} name="type" onChange={this.onChange} defaultValue={PLACEHOLDER}>
              <option class="D(n)" value={PLACEHOLDER} disabled></option>
              {subTypes.map((x) => <option key={x}>{x}</option>)}
            </select>
          </div>}

          <div class="Mt($m-control)">
            <span class="Fz(14px) Fw(b)">Summary *</span>
            <div>
              <span class={'Fz(14px) Cur(p) Mend(20px) ' + (preview ? '' : 'Fw(b)')} onClick={() => this.setState({preview: false})}>Edit</span>
              <span class={'Fz(14px) Cur(p) ' + (preview ? 'Fw(b)' : '')} onClick={() => this.setState({preview: true})}>Preview changes</span>
            </div>
            {!preview && <textarea class="Bdw(2px) Bdc(lightgray) P(6px) D(b) Mt(10px) W(100%) H(180px)" placeholder="Add a summary..." name="summary"
              onChange={this.onChange} value={this.state.summary} required/>}
            {preview &&
              <div class="Bds(s) Bdw(2px) Bdc(lightgray) Px(10px) Py(10px) Mt(10px) W(100%)">
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
              <div>
                <select class={INPUT_STYLE} defaultValue={ROUTE_INVALID} name="printerBrand" onChange={this.onChange}>
                  {brands.map((x) => <option key={x}>{x}</option>)}
                </select>
              </div>

              <div>
                <span class="Fz(14px) Fw(b)">Rafts</span>
                <div class="Lh(40px)">
                  <input type="radio" name="raft" onChange={this.onChange} value="Yes"/> Yes
                  <input class="Mstart(20px) " type="radio" name="raft" onChange={this.onChange} value="No"/> No
                  <input class="Mstart(20px) " type="radio" name="raft" onChange={this.onChange} value="" defaultChecked/> Doesn't matter
                </div>
              </div>

              <div class="Mt($m-control)">
                <span class="Fz(14px) Fw(b)">Support</span>
                <div class="Lh(40px)">
                  <input type="radio" name="support" onChange={this.onChange} value="Yes"/> Yes
                  <input class="Mstart(20px) " type="radio" name="support" onChange={this.onChange} value="No"/> No
                  <input class="Mstart(20px) " type="radio" name="support" onChange={this.onChange} value="" defaultChecked/> Doesn't matter
                </div>
              </div>

              <div class="Mt($m-control)">
                <span class="D(ib) W(46%) Mend(40px)">
                  <span class="Fz(14px) Fw(b)">Resolution (mm)</span>
                  <div><input type="number" class={INPUT_STYLE} name="resolution" onChange={this.onChange}/></div>
                </span>

                <span class="D(ib) W(46%)">
                  <span class="Fz(14px) Fw(b)">Infill (%)</span>
                  <div><input type="number" min="0" max="100" step="1" class={INPUT_STYLE} name="infill" onChange={this.onChange}/></div>
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
              <textarea class="Bdw(2px) Bdc(lightgray) P(6px) D(b) Mt(10px) W(100%) H(180px)" placeholder="Add notes..." name="note"
                onChange={this.onChange} />
            </div>
          </div>

          <button class="btn btn-outline-secondary Mt($m-control)" disabled={!this.checkRequiredFilled()} onClick={this.createThing}>Upload</button>
        </form>
      </div>

    </div>;
  }
}
