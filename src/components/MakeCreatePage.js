import React from 'react';
import {Link} from 'react-router-dom';
import {ROUTE_INVALID, lookupSubType, brands} from './utils';


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
            <div>
              <span class="Fz(14px) Fw(b)">Source</span>
              <div class="W(84%) H(40px) Fz(14px)">
                <span class="Fz(14px) Fw(b)"><Link to='thing/detail'>name</Link></span> by someone
              </div>
              <span class="Fz(14px) Fw(b)">Description</span>
              <textarea class="D(b) Bdrs(4px) W(100%) H(180px)" placeholder="Write a description..." name="body"
                onFocus={this.editing} />
            </div>

            <div class="Mt($m-control)">
              <div class="Fz(22px) Bdbs(s) Bdbc(lightgray) Bdw(t)">Printing settings</div>
              <div class="Mt($m-control)">
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
              </div>
            </div>
            <button class="C(white) D(b) Bgc(dimgray) Bgc(black):h Py(4px) Mt($m-control) Bdrs($bdrs-control) Bdc(t)" onClick={this.login}>Upload make</button>
          </form>
        </div>
      </div>
    </div>;
  }
}
