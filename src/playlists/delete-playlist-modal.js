import React from "react";
import { Button, Modal } from "react-bootstrap";
import SpotifyService from "../spotify-service";

export class DeletePlaylist extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.deletePlaylist = this.deletePlaylist.bind(this);
  }

  handleShow() {
    this.setState({show: true});
  }

  handleClose() {
    this.setState({show: false});
  }

  deletePlaylist() {
    SpotifyService.unfollowPlaylist(this.props.playlist.id).then(() => {
      this.props.deleteCallback();
      this.handleClose();
    });
  }

  render() {
    return (
      <>
        <Button id='delete-playlist-btn' style={{float: 'right', marginBottom: '10px'}} variant="danger" onClick={this.handleShow}>Delete Playlist</Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Playlist</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete <strong>{this.props.playlist.name}</strong></p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>Cancel</Button>
            <Button id='confirm-delete-playlist-btn' variant="danger" onClick={this.deletePlaylist}>Delete</Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}