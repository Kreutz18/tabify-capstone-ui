import './playlists.scss';
import React from 'react';
import { FloatingLabel, Form, FormGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SpotifyService from '../spotify-service';

import _ from 'lodash';

export class PlaylistModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      isPublic: true,
      show: false,
      invalid: false
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
    this.setState({invalid: _.isEmpty(event.target.value) ? true : false});
  }

  handleDescriptionChange(event) {
    this.setState({description: event.target.value});
  }

  handleTypeChange(event) {
    this.setState({isPublic: !event.target.checked});
  }

  handleShow() {
    this.setState({show: true});
  }

  handleClose() {
    this.setState({
      name: '',
      description: '',
      isPublic: true,
      show: false,
      invalid: false
    });
  }

  handleSubmit(event) {
    event.stopPropagation();
    this.setState({invalid: _.isEmpty(this.state.name) ? true : false}, () => {
      if (!this.state.invalid) {
        SpotifyService.createPlaylist(this.props.userId, this.state.name, this.state.description, this.state.isPublic).then((playlist) => {
          this.props.playlistCallback();
          this.handleClose();
        });
      }
    });
  }

  render() {
    return (
      <>
        <Button style={{width: '100%'}} variant="dark" onClick={this.handleShow}> Create Playlist</Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create Playlist</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <FloatingLabel label="Name">
            <Form.Control onChange={this.handleNameChange} type='text' placeholder='Name'></Form.Control>
          </FloatingLabel>
          {this.state.invalid && <p style={{color: 'red'}}>Required</p>}
          <FloatingLabel className='mt-4' label='Description'>
            <Form.Control onChange={this.handleDescriptionChange} as='textarea' placeholder='enter a description' style={{height: '100px', resize: 'none'}}></Form.Control>
          </FloatingLabel>
          <FormGroup className='mt-3'>
            <Form.Check onChange={this.handleTypeChange} inline label='Private Playlist' type='switch'></Form.Check>
          </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>Close</Button>
            <Button variant="primary" type='submit' onClick={this.handleSubmit}>Create</Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}