import React from 'react';
import ReactSlidingPane from 'react-sliding-pane';
import { HalfChevronIcon } from '../half-chevron-icon/half-chevron-icon';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import './slide-panel.css';

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
      width: 500 + 'px'
    };
  }

  componentDidMount() {
    this.config = _.extend({}, this.config, this.props.config);
  }

  toggleSlidePanel() {
    this.setState({isPanelOpen: !this.state.isPanelOpen});
  }

  render() {
    return (
      <div style={{marginTop: "32px"}}>
        <HalfChevronIcon />
        <ReactSlidingPane
          from={this.state.config.from}
          title={this.state.config.title}
          shouldCloseOnEsc={this.state.config.shouldCloseOnEsc}
          closeIcon={this.state.config.closeIcon}
          width={this.state.config.width}
          isOpen={this.state.isPaneOpen}
          onRequestClose={this.toggleSlidePanel()}>
          this is the content
        </ReactSlidingPane>
      </div>
    );
  }  
}

