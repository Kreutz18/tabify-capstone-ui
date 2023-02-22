import React from 'react';
import ReactSlidingPane from 'react-sliding-pane';
import { HalfChevronIcon } from '../half-chevron-icon/half-chevron-icon';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import './slide-panel.scss';

import _ from 'lodash';

export class SlidePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPanelOpen: false,
    };

    this.config = {
      title: 'Playlists',
      from: "right",
      shouldCloseOnEsc: true,
      closeIcon: 'X',
      width: 500 + 'px',
      hideHeader: true
    };

    this.toggleSlidePanel = this.toggleSlidePanel.bind(this);
  }

  componentDidMount() {
    this.config = _.extend({}, this.config, this.props.config);
  }

  toggleSlidePanel() {
    this.setState({isPanelOpen: !this.state.isPanelOpen});
  }

  render() {  
    return (
      <>
        <ReactSlidingPane
          from={this.config.from}
          title={this.config.title}
          shouldCloseOnEsc={this.config.shouldCloseOnEsc}
          closeIcon={this.config.closeIcon}
          width={this.config.width}
          isOpen={this.state.isPanelOpen}
          hideHeader={this.config.hideHeader}
          onRequestClose={this.toggleSlidePanel}>
          this is the content
        </ReactSlidingPane>
        <div onClick={this.toggleSlidePanel}><HalfChevronIcon /></div>
      </>
    );
  }  
}

