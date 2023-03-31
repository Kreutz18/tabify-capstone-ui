import React from "react";
import { Pagination } from "react-bootstrap";

export class Paging extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      offset: this.props.pageOptions.offset,
      currentPage: this.props.pageOptions.currentPage,
      showLeftEllipsis: null,
      showRightEllipsis: null,
      pageItemStart: null,
      pageItemEnd: null
    };

    this.renderPaginationItems = this.renderPaginationItems.bind(this);
    this.calculateUrl = this.calculateUrl.bind(this);
    this.updatePage = this.updatePage.bind(this);
    this.showEllipsis = this.showEllipsis.bind(this);
  }

  componentDidMount() {
    this.showEllipsis();
  }

  calculateUrl() {
    var index = this.props.tracks.href.indexOf("?");
    var url = this.props.tracks.href.substring(0, index);
    var params = "?offset=" + this.state.offset + "&limit=20";

    return url + params; 
  }

  renderPaginationItems() {
    const items = [];
    for (let x = this.state.pageItemStart; x <= this.state.pageItemEnd; x++) {
      items.push(<Pagination.Item key={x} active={x === this.props.pageOptions.currentPage ? true : false} onClick={() => this.updatePage(x)}>{x}</Pagination.Item>)
    }
    return items;
  }

  updatePage(page) {
    if (page >= 1 && page <= this.props.pageTotal) {
      var offset = (page - 1) * 20;
      this.setState({offset: offset, currentPage: page}, () => {
        this.props.updatePageOptions(this.state);
        this.props.getPage(this.calculateUrl());
      });
    }
  }

  showEllipsis() {
    this.setState({loading: true});
    if (this.state.currentPage - 3 <= 1) {
      let start = 1;
      let end = this.props.pageTotal >= 7 ? 7 : this.props.pageTotal;
      let showRightEllipsis = this.props.pageTotal > 7; 
      this.setState({showLeftEllipsis: false, showRightEllipsis: showRightEllipsis, pageItemStart: start, pageItemEnd: end});
    } else if (this.state.currentPage - 3 > 1 && this.state.currentPage + 3 <= this.props.pageTotal) {
      let start = this.state.currentPage - 3;
      let end = this.state.currentPage + 3;
      let showRightEllipsis = this.state.currentPage + 3 < this.props.pageTotal;
      this.setState({showLeftEllipsis: true, showRightEllipsis: showRightEllipsis, pageItemStart: start, pageItemEnd: end});
    } else {
      let start = this.props.pageTotal - 6;
      let end = this.props.pageTotal;
      this.setState({showLeftEllipsis: true, showRightEllipsis: false, pageItemStart: start, pageItemEnd: end});
    }
    this.setState({loading: false});
  }

  render() {
    return (
      <div>
        <Pagination className="justify-content-center">
          <Pagination.First onClick={() => this.updatePage(1)}/>
          <Pagination.Prev onClick={() => this.updatePage(this.state.currentPage - 1)}/>
          {!this.state.loading && this.state.showLeftEllipsis && <Pagination.Ellipsis />}
          {!this.state.loading && this.renderPaginationItems()}
          {!this.state.loading && this.state.showRightEllipsis && <Pagination.Ellipsis />}
          <Pagination.Next onClick={() => this.updatePage(this.state.currentPage + 1)}/>
          <Pagination.Last onClick={() => this.updatePage(this.props.pageTotal)}/>
        </Pagination>
      </div>
    )
  }
}