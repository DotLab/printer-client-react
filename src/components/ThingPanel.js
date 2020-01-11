
import React from 'react';
import {Link} from 'react-router-dom';

export default class ThingOverview extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.like = this.like.bind(this);
    this.unlike = this.unlike.bind(this);
    this.bookmark = this.bookmark.bind(this);
    this.unBookmark = this.unBookmark.bind(this);
  }

  async like(e) {
    e.preventDefault();
    await this.props.like();
  }

  async unlike(e) {
    e.preventDefault();
    await this.props.unlike();
  }

  async bookmark(e) {
    e.preventDefault();
    await this.props.bookmark();
  }

  async unBookmark(e) {
    e.preventDefault();
    await this.props.unBookmark();
  }

  render() {
    const {likeCount, bookmarkCount, makeCount, remixCount, liked, bookmarked, downloadLink} = this.props;

    return <div>
      {!liked && <span class="Mend(26px) Cur(p)" onClick={this.like}><i class="fas fa-thumbs-up"></i> {likeCount}</span>}
      {liked && <span class="Mend(26px) Cur(p) C(#0280ae)" onClick={this.unlike}><i class="fas fa-thumbs-up"></i> {likeCount}</span>}

      {!bookmarked && <span class="Mend(26px) Cur(p)" onClick={this.bookmark}><i class="fas fa-bookmark"></i> {bookmarkCount}</span>}
      {bookmarked && <span class="Mend(26px) Cur(p) C(#0280ae)" onClick={this.unBookmark}><i class="fas fa-bookmark"></i> {bookmarkCount}</span>}

      <a href={downloadLink} class="Mend(26px) Cur(p) C(black) Td(n):h" onClick={this.download}><i class="fas fa-download"></i></a>
      <Link to="/things/new/make" class="Td(n):h Fz(16px) C(black) Mend(26px) Cur(p)"><i class="fas fa-wrench"></i> MAKE {makeCount}</Link>
      <Link to="/things/new/remix"class="Td(n):h Fz(16px) C(black) Cur(p)"><i class="fas fa-compact-disc"></i> REMIX {remixCount}</Link>
    </div>
    ;
  }
}
