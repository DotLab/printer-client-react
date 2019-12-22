import React from 'react';
import {PRINTING, ART, FASHION, GADGETS, HOBBY, HOUSEHOLD, LEARNING, MODEL, GAME} from './utils';
import {TYPE_ART, TYPE_PRINTER, TYPE_FASHION, TYPE_GADGETS, TYPE_HOBBY, TYPE_HOUSEHOLD, TYPE_LEARNING,
  TYPE_MODEL, TYPE_GAME, ROUTE_INVALID, lookupSubType, brands} from './utils';
import {CC_BY, CC_BY_SA, CC_BY_ND, CC_BY_NC, CC_BY_NC_SA, CC_BY_NC_ND, CC_PD, GNU_GPL, GNU_LGPL, BSD} from './utils';
import {LICENSE_CC_BY, LICENSE_CC_BY_SA, LICENSE_CC_BY_ND, LICENSE_CC_BY_NC, LICENSE_CC_BY_NC_SA, LICENSE_CC_BY_NC_ND, LICENSE_CC_PD, LICENSE_GNU_GPL, LICENSE_GNU_LGPL, LICENSE_BSD} from './utils';


const ALL = 'All';
const INPUT_STYLE = 'W(84%) H(40px) Fz(14px) Bdc(t) O(n) Bdbs(s):h Bdbc(black):f Bdbc(lightgray) Mb(30px)';

export default class ThingCreatePage extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.state = {
      items: null,
      typeSelected: ALL,
      subTypeSelected: ALL,
      printing: true,
    };

    this.changeFilter = this.changeFilter.bind(this);
  }

  changeFilter(e) {
    const typeSelected = e.target.value;
    const items = lookupSubType(typeSelected);
    this.setState({items});
  }

  onChangeHandler(event) {
    console.log(event.target.files[0]);
  }

  render() {
    const {items, printing} = this.state;

    return <div class="Py(30px) My(10px)">
      <div class="W(70%) Mx(a)">
        <div class="Bds(s) Ta(c) H(300px)">
          <div class="Py(80px)">
            <label>Drag files here</label>
            <div class="Fz(12px) Pstart(40px) My(20px)">Or <input type="file" name="file" onChange={this.onChangeHandler}/>
            </div>
          </div>
        </div>
        <div>
          <div class="Fz(16px)">
            <i class="fas fa-file-alt"></i>
            <span> filename</span>
            <span class="Fl(end) Cur(p)"><i class="fas fa-times"></i></span>
          </div>
          <form class="Px(12px) Bdrs(4px) My(30px) W(100%)">
            <div class="W(100%)">
              <span class="Fz(14px) Fw(b)">Thing name *</span>
              <div><input class={INPUT_STYLE} name="name" onChange={this.onChange} required/></div>
            </div>
            <div class="Mt($m-control)">
              <span class="Fz(14px) Fw(b)">License *</span>
              <select class="D(b) Fz(14px)">
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

            {items && <div class="Mt($m-control)">
              <span class="Fz(14px) Fw(b)">Type *</span>
              <select class="D(b) Fz(14px)">
                {items.map((x) => <option key={x}>{x}</option>)}
              </select>
            </div>}

            <div class="Mt($m-control)">
              <span class="Fz(14px) Fw(b)">Summary *</span>
              <textarea class="D(b) Bdrs(4px) W(100%) H(180px)" placeholder="Add a summary..." name="body"
                onFocus={this.editing} />
            </div>

            <div class="Mt($m-control)">
              <span class="Fz(14px) Fw(b)">Printing settings?</span>
              <div class="Mb(20px)">
                <input type="radio" name="print" value="yes" onChange={() => this.setState({printing: true})} defaultChecked/>Yes
                <input class="Mstart(20px)" type="radio" name="print" value="no" onChange={() => this.setState({printing: false})}/>No
              </div>

              {printing && <div class="Mt($m-control)">
                <span class="Fz(14px) Fw(b)">Which brand are you using</span>
                <select class="D(b) Fz(14px)" defaultValue={ROUTE_INVALID}>
                  {brands.map((x) => <option key={x}>{x}</option>)}
                </select>

                <div class="Mt($m-control)">
                  <span class="Fz(14px) Fw(b)">Rafts</span>
                  <div>
                    <input type="radio" name="rfat" value="yes"/> Yes
                    <input class="Mstart(20px)" type="radio" name="rfat" value="no"/> No
                    <input class="Mstart(20px)" type="radio" name="rfat" value="m" defaultChecked/> Doesn't matter
                  </div>
                </div>

                <div class="Mt($m-control)">
                  <span class="Fz(14px) Fw(b)">Support</span>
                  <div>
                    <input type="radio" name="support" value="yes"/> Yes
                    <input class="Mstart(20px)" type="radio" name="support" value="no"/> No
                    <input class="Mstart(20px)" type="radio" name="support" value="m" defaultChecked/> Doesn't matter
                  </div>
                </div>

                <div class="Mt($m-control)">
                  <span class="D(ib) W(46%) Mend(40px)">
                    <span class="Fz(14px) Fw(b)">Resolution</span>
                    <div><input type="number" class={INPUT_STYLE} onChange={this.onChange}/>mm</div>
                  </span>

                  <span class="D(ib) W(46%)">
                    <span class="Fz(14px) Fw(b)">Infill</span>
                    <div><input type="number" min="0" max="100" step="1" class={INPUT_STYLE} onChange={this.onChange}/> %</div>
                  </span>
                </div>

                <div>
                  <span class="D(ib) W(46%) Mend(40px)">
                    <span class="Fz(14px) Fw(b)">Filament brand</span>
                    <div><input class={INPUT_STYLE} onChange={this.onChange}/></div>
                  </span>

                  <span class="D(ib) W(46%)">
                    <span class="Fz(14px) Fw(b)">Filament Color</span>
                    <div><input class={INPUT_STYLE} onChange={this.onChange}/></div>
                  </span>
                </div>

                <div>
                  <span class="D(ib) W(46%) Mend(40px)">
                    <span class="Fz(14px) Fw(b)">Filament material</span>
                    <div><input class={INPUT_STYLE} onChange={this.onChange}/></div>
                  </span>
                </div>
              </div>}
              <div>
                <span class="Fz(14px) Fw(b)">Other notes</span>
                <textarea class="D(b) Bdrs(4px) W(100%) H(180px)" placeholder="Add notes..." name="body"
                  onFocus={this.editing} />
              </div>
            </div>

            <button class="C(white) D(b) Bgc(dimgray) Bgc(black):h Py(4px) Mt($m-control) Bdrs($bdrs-control) Bdc(t)" onClick={this.login}>Upload</button>
          </form>
        </div>
      </div>
    </div>;
  }
}
