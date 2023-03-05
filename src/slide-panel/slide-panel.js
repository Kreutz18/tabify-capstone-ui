import React from 'react';
import ReactSlidingPane from 'react-sliding-pane';
import { HalfChevronIcon } from '../half-chevron-icon/half-chevron-icon';
import { Col, Form, InputGroup, Row, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LoadingSpinner } from '../LoadingSpinner';
import { getTime } from '../time-service';
import 'react-sliding-pane/dist/react-sliding-pane.css';

import _, { add } from 'lodash';
import SpotifyService from '../spotify-service';

const headers = {
  headers: new Headers({ 
    'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
    'Content-Type':  'application/json'
  }),
  method: 'get'
};

export class SlidePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPanelOpen: false,
      loading: false
    };

    this.config = {
      title: 'Search Songs',
      from: "right",
      shouldCloseOnEsc: true,
      closeIcon: 'X',
      width: 500 + 'px',
      hideHeader: false
    };

    this.results = [];
    this.addSongCallback = this.props.addSongCallback;
    this.toggleSlidePanel = this.toggleSlidePanel.bind(this);
    this.searchSongs = this.searchSongs.bind(this);
  }

  componentDidMount() {
    this.config = _.extend({}, this.config, this.props.config);
  }
  
  componentDidUpdate(props) {

  }
  
  toggleSlidePanel() {
    this.setState({isPanelOpen: !this.state.isPanelOpen});
  }

  searchSongs(event) {
    if (event.key === 'Enter' && event.target.value !== '') {
      this.setState({loading: true});
      SpotifyService.search(event.target.value, 'track,artist').then((data) => {
        this.results = data.tracks;
        this.setState({loading: false});
      });
    }
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
          <SearchBar searchSongs={this.searchSongs} />
          <SlideTable loading={this.state.loading} results={this.results} playlistId={this.props.playlist.id} addSongCallback={() => (this.addSongCallback(this.props.playlist))}/>
        </ReactSlidingPane>
        <div onClick={this.toggleSlidePanel}><HalfChevronIcon /></div>
      </>
    );
  }  
}

export function SearchBar({searchSongs}) {
  return (
    <InputGroup className="mb-3">
      <Form.Control
        placeholder="Search Songs"
        aria-label="Search Songs"
        onKeyUp={searchSongs}
      />
    </InputGroup>
  )
}

export function SlideTable({loading, results, playlistId, addSongCallback}) {
  function addSongToPlaylist(trackUri) {
    SpotifyService.addSongToPlaylist(playlistId, trackUri).then(() => {
      addSongCallback();
    });
  }

  return (
    <Row>
      <Col>
        {
          !loading ? (
            results && results.items ? (
              <Table hover>
                <thead>
                  <tr>
                    <th className='align-left'>Title</th>
                    <th className='align-left'>Artist</th>
                    <th><FontAwesomeIcon icon="fa-regular fa-clock" /></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    results.items.map((item, i) => {
                      return (
                        <tr key={i}>
                          <td key={item.id}>{item.name}</td>
                          <td key={item.artists[0].id + i}>{item.artists[0].name}</td>
                          <td key={item.id + '-time'}>{getTime(item.duration_ms)}</td>
                          <td>
                            <FontAwesomeIcon style={{cursor: 'pointer'}} icon='fa-plus' onClick={() => (addSongToPlaylist(item.uri))}></FontAwesomeIcon>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </Table>
            ) : (
              <p  className='text-center mt-5'>Search for Songs</p>
            )
          ) : (
            <div className='text-center mt-5'>
              <LoadingSpinner />
            </div>
          )
        }
      </Col>
    </Row>
  )
}



