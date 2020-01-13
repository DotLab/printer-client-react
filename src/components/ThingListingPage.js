import React from 'react';
import ThingOverview from './ThingOverview';
import {TYPE_ART, TYPE_PRINTER, TYPE_FASHION, TYPE_GADGETS, TYPE_HOBBY, TYPE_HOUSEHOLD, TYPE_LEARNING,
  TYPE_MODEL, TYPE_GAME, lookupSubType} from './utils';
import queryString from 'query-string';
import {QUERY_DESC, SORT_DATE, FILTER_ALL, DEFAULT_LIMIT, DEFAULT_SKIP} from '../utils';
import {pushHistory} from '../utils';
const ALL = 'All';

export default class ThingListingPage extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.query = queryString.parse(props.location.search);

    this.state = {
      types: null,
      categorySelected: ALL,
      typeSelected: ALL,
      q: this.query.q || undefined,
      c: this.query.c || undefined,
      type: this.query.type || undefined,
      order: this.query.order || undefined,
      sort: this.query.sort || undefined,
      limit: DEFAULT_LIMIT,
      skip: DEFAULT_SKIP,
      things: [],
    };

    this.pushHistory = pushHistory.bind(this);
    this.changeSort = this.changeSort.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
    this.changeSubFilter = this.changeSubFilter.bind(this);
  }

  async componentDidMount() {
    if (!this.query.sort) {
      this.query.sort = SORT_DATE;
      this.query.order = QUERY_DESC;
    }
    if (!this.query.c) {
      this.query.c = FILTER_ALL;
    }

    const things = await this.app.thingList({
      category: this.state.c,
      type: this.state.type,
      sort: this.state.sort,
      order: this.state.order,
      limit: this.state.limit,
      skip: this.state.skip,
      search: this.state.q,
    });
    this.setState({things});
  }

  async componentWillReceiveProps(newprops) {
    this.query = queryString.parse(newprops.location.search);

    if (!this.query.sort) {
      this.query.sort = SORT_DATE;
      this.query.order = QUERY_DESC;
    }
    if (!this.query.c) {
      this.query.c = FILTER_ALL;
    }

    console.log(this.query.order);

    const things = await this.app.thingList({
      category: this.query.c,
      type: this.query.type,
      sort: this.query.sort,
      order: this.query.order,
      limit: this.state.limit,
      skip: this.state.skip,
      search: this.query.q,
    });
    this.setState({things});
  }

  changeFilter(categorySelected) {
    this.query.type = null;
    this.query.c = categorySelected;
    const types = lookupSubType(categorySelected);
    this.setState({types, categorySelected});
    this.pushHistory();
  }

  changeSort(e) {
    const sort = e.target.value;
    this.query.sort = sort;
    this.pushHistory();
  }

  changeSubFilter(typeSelected) {
    this.query.type = typeSelected;
    this.setState({typeSelected});
    this.pushHistory();
  }

  render() {
    const {types, categorySelected, typeSelected, things} = this.state;

    return <div>
      <div class="D(f) Jc(c)">
        <div class="Mt(40px) W(18%) Mx(30px) P(4px)">
          <div class="M(20px)">
            <div class="Fw(b) Py(10px)">Category</div>
            <div class={'Cur(p) Fz(16px) C(gray) Bgc(lightgray):h P(4px) ' + (categorySelected === ALL ? 'Bgc(lightgray) C(white)' : 'Bgc(t) C(gray)')} onClick={() => this.changeFilter(ALL)}>All<span class="Fl(end)"></span></div>
            <div class={'Cur(p) Fz(16px) C(gray) Bgc(lightgray):h P(4px) ' + (categorySelected === TYPE_PRINTER ? 'Bgc(lightgray) C(white)' : 'Bgc(t) C(gray)')} onClick={() => this.changeFilter(TYPE_PRINTER)}>3D printing<span class="Fl(end)"></span></div>
            <div class={'Cur(p) Fz(16px) C(gray) Bgc(lightgray):h P(4px) ' + (categorySelected === TYPE_ART ? 'Bgc(lightgray) C(white)' : 'Bgc(t) C(gray)')} onClick={() => this.changeFilter(TYPE_ART)}>Art<span class="Fl(end)"></span></div>
            <div class={'Cur(p) Fz(16px) C(gray) Bgc(lightgray):h P(4px) ' + (categorySelected === TYPE_FASHION ? 'Bgc(lightgray) C(white)' : 'Bgc(t) C(gray)')} onClick={() => this.changeFilter(TYPE_FASHION)}>Fashion<span class="Fl(end)"></span></div>
            <div class={'Cur(p) Fz(16px) C(gray) Bgc(lightgray):h P(4px) ' + (categorySelected === TYPE_GADGETS ? 'Bgc(lightgray) C(white)' : 'Bgc(t) C(gray)')} onClick={() => this.changeFilter(TYPE_GADGETS)}>Gadgets<span class="Fl(end)"></span></div>
            <div class={'Cur(p) Fz(16px) C(gray) Bgc(lightgray):h P(4px) ' + (categorySelected === TYPE_HOBBY ? 'Bgc(lightgray) C(white)' : 'Bgc(t) C(gray)')} onClick={() => this.changeFilter(TYPE_HOBBY)}>Hobby<span class="Fl(end)"></span></div>
            <div class={'Cur(p) Fz(16px) C(gray) Bgc(lightgray):h P(4px) ' + (categorySelected === TYPE_HOUSEHOLD ? 'Bgc(lightgray) C(white)' : 'Bgc(t) C(gray)')} onClick={() => this.changeFilter(TYPE_HOUSEHOLD)}>Household<span class="Fl(end)"></span></div>
            <div class={'Cur(p) Fz(16px) C(gray) Bgc(lightgray):h P(4px) ' + (categorySelected === TYPE_LEARNING ? 'Bgc(lightgray) C(white)' : 'Bgc(t) C(gray)')} onClick={() => this.changeFilter(TYPE_LEARNING)}>Learning<span class="Fl(end)"></span></div>
            <div class={'Cur(p) Fz(16px) C(gray) Bgc(lightgray):h P(4px) ' + (categorySelected === TYPE_MODEL ? 'Bgc(lightgray) C(white)' : 'Bgc(t) C(gray)')} onClick={() => this.changeFilter(TYPE_MODEL)}>Models<span class="Fl(end)"></span></div>
            <div class={'Cur(p) Fz(16px) C(gray) Bgc(lightgray):h P(4px) ' + (categorySelected === TYPE_GAME ? 'Bgc(lightgray) C(white)' : 'Bgc(t) C(gray)')} onClick={() => this.changeFilter(TYPE_GAME)}>Game<span class="Fl(end)"></span></div>
          </div>

          {types &&
            <div class="M(20px)">
              <div class="Fw(b) Py(10px)">Type</div>
              <div class={'Cur(p) Fz(16px) C(gray) Bgc(lightgray):h P(4px) ' + (typeSelected === ALL ? 'Bgc(lightgray) C(white)' : 'Bgc(t) C(gray)')} onClick={() => this.changeSubFilter(ALL)}>{ALL}<span class="Fl(end)"></span></div>
              {types.map((x) => <div key={x} class={'Cur(p) Fz(16px) C(gray) Bgc(lightgray):h P(4px) ' + (typeSelected === x ? 'Bgc(lightgray) C(white)' : 'Bgc(t) C(gray)')} onClick={() => this.changeSubFilter(x)}>{x}<span class="Fl(end)"></span></div>)}
            </div>}
        </div>
        <div class="W(70%)">
          <div class="My(40px) Mx(a)">
            <span>Thing results</span>
            <span class="C(gray) Mend(30px) Fl(end)">
              <label>Sort:
                <select class="Bdc(t)" onChange={this.changeSort}>
                  <option value="newest">Newest</option>
                  <option value="popular">Popular</option>
                  <option value="makes">Makes</option>
                  <option value="remixes">Remixes</option>
                  <option value="verified">Verified</option>
                  <option value="customizable">Customizable</option>
                </select>
              </label>
            </span>
          </div>
          <div class="W(100%) Mx(a) Pos(r)">
            {things.map((thing) => <ThingOverview key={thing._id} id={thing._id} name={thing.name}
              uploaderName={thing.uploaderName} likeCount={thing.likeCount}/>)}
          </div>
        </div>
      </div>
    </div>;
  }
}
