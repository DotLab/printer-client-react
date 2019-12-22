import React from 'react';
import ThingOverview from './ThingOverview';
import {TYPE_ART, TYPE_PRINTER, TYPE_FASHION, TYPE_GADGETS, TYPE_HOBBY, TYPE_HOUSEHOLD, TYPE_LEARNING,
  TYPE_MODEL, TYPE_GAME, lookupSubType} from './utils';

const ALL = 'All';

export default class ThingListingPage extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.state = {
      items: null,
      typeSelected: ALL,
      subTypeSelected: null,
    };
  }

  changeFilter(typeSelected) {
    const items = lookupSubType(typeSelected);
    this.setState({items, typeSelected});
  }

  changeSubFilter(subTypeSelected) {
    this.setState({subTypeSelected});
  }

  render() {
    const {items, typeSelected, subTypeSelected} = this.state;

    return <div>
      <div class="D(f) Jc(c)">
        <div class="Mt(40px) W(18%) Mx(30px) P(4px)">
          <div class="M(20px)">
            <div class="Fw(b) Py(10px)">Category</div>
            <div class={'Cur(p) Fz(16px) C(gray) Bgc(lightgray):h P(4px) ' + (typeSelected === ALL ? 'Bgc(lightgray) C(white)' : 'Bgc(t) C(gray)')} onClick={() => this.changeFilter(ALL)}>All<span class="Fl(end)"></span></div>
            <div class={'Cur(p) Fz(16px) C(gray) Bgc(lightgray):h P(4px) ' + (typeSelected === TYPE_PRINTER ? 'Bgc(lightgray) C(white)' : 'Bgc(t) C(gray)')} onClick={() => this.changeFilter(TYPE_PRINTER)}>3D printing<span class="Fl(end)"></span></div>
            <div class={'Cur(p) Fz(16px) C(gray) Bgc(lightgray):h P(4px) ' + (typeSelected === TYPE_ART ? 'Bgc(lightgray) C(white)' : 'Bgc(t) C(gray)')} onClick={() => this.changeFilter(TYPE_ART)}>Art<span class="Fl(end)"></span></div>
            <div class={'Cur(p) Fz(16px) C(gray) Bgc(lightgray):h P(4px) ' + (typeSelected === TYPE_FASHION ? 'Bgc(lightgray) C(white)' : 'Bgc(t) C(gray)')} onClick={() => this.changeFilter(TYPE_FASHION)}>Fashion<span class="Fl(end)"></span></div>
            <div class={'Cur(p) Fz(16px) C(gray) Bgc(lightgray):h P(4px) ' + (typeSelected === TYPE_GADGETS ? 'Bgc(lightgray) C(white)' : 'Bgc(t) C(gray)')} onClick={() => this.changeFilter(TYPE_GADGETS)}>Gadgets<span class="Fl(end)"></span></div>
            <div class={'Cur(p) Fz(16px) C(gray) Bgc(lightgray):h P(4px) ' + (typeSelected === TYPE_HOBBY ? 'Bgc(lightgray) C(white)' : 'Bgc(t) C(gray)')} onClick={() => this.changeFilter(TYPE_HOBBY)}>Hobby<span class="Fl(end)"></span></div>
            <div class={'Cur(p) Fz(16px) C(gray) Bgc(lightgray):h P(4px) ' + (typeSelected === TYPE_HOUSEHOLD ? 'Bgc(lightgray) C(white)' : 'Bgc(t) C(gray)')} onClick={() => this.changeFilter(TYPE_HOUSEHOLD)}>Household<span class="Fl(end)"></span></div>
            <div class={'Cur(p) Fz(16px) C(gray) Bgc(lightgray):h P(4px) ' + (typeSelected === TYPE_LEARNING ? 'Bgc(lightgray) C(white)' : 'Bgc(t) C(gray)')} onClick={() => this.changeFilter(TYPE_LEARNING)}>Learning<span class="Fl(end)"></span></div>
            <div class={'Cur(p) Fz(16px) C(gray) Bgc(lightgray):h P(4px) ' + (typeSelected === TYPE_MODEL ? 'Bgc(lightgray) C(white)' : 'Bgc(t) C(gray)')} onClick={() => this.changeFilter(TYPE_MODEL)}>Models<span class="Fl(end)"></span></div>
            <div class={'Cur(p) Fz(16px) C(gray) Bgc(lightgray):h P(4px) ' + (typeSelected === TYPE_GAME ? 'Bgc(lightgray) C(white)' : 'Bgc(t) C(gray)')} onClick={() => this.changeFilter(TYPE_GAME)}>Game<span class="Fl(end)"></span></div>
          </div>

          {items &&
            <div class="M(20px)">
              <div class="Fw(b) Py(10px)">Type</div>
              <div class={'Cur(p) Fz(16px) C(gray) Bgc(lightgray):h P(4px) ' + (subTypeSelected === ALL ? 'Bgc(lightgray) C(white)' : 'Bgc(t) C(gray)')} onClick={() => this.changeSubFilter(ALL)}>{ALL}<span class="Fl(end)"></span></div>
              {items.map((x) => <div class={'Cur(p) Fz(16px) C(gray) Bgc(lightgray):h P(4px) ' + (subTypeSelected === x ? 'Bgc(lightgray) C(white)' : 'Bgc(t) C(gray)')} onClick={() => this.changeSubFilter(x)}>{x}<span class="Fl(end)"></span></div>)}
            </div>}
        </div>
        <div class="W(70%)">
          <div class="My(40px) Mx(a)">
            <span>Thing results</span>
            <span class="C(gray) Mend(30px) Fl(end)">
              <label>Sort:
                <select class="Bdc(t)">
                  <option value="newest">Newest</option>
                  <option value="popular">Popular</option>
                  <option value="makes">Makes</option>
                  <option value="verified">Verified</option>
                  <option value="remixes">Remixes</option>
                  <option value="customizable">Customizable</option>
                </select>
              </label>
            </span>
          </div>
          <div class="W(100%) Mx(a) Pos(r)">
            <ThingOverview/>
            <ThingOverview/>
            <ThingOverview/>
            <ThingOverview/>
            <ThingOverview/>
          </div>
        </div>
      </div>
    </div>;
  }
}
