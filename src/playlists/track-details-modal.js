import React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";

export class TrackDetailsModal extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.track);
    this.state = {
      show: true
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleShow() {
    this.setState({show: true});
  }

  handleClose() {
    this.setState({show: false});
    this.props.closeModal();
  }

  render() {
    return (
      <>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Song Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <h5>{this.props.track.name}</h5>
                <h6 className="d-inline">Artist: </h6><span>{this.props.track.artists[0].name}</span><br />
                <h6 className="d-inline">Track: </h6><span className="d-inline">{this.props.track.track_number}/{this.props.track.album.total_tracks}</span><br />
                <h6 className="d-inline">Popularity: </h6><span className="d-inline">{this.props.track.popularity}</span>
                <h5 className="mt-4">Album</h5>
                <h6 className="d-inline">Title: </h6><span className="d-inline">{this.props.track.album.name}</span><br />
                <h6 className="d-inline">Release Date: </h6><span className="d-inline">{this.props.track.album.release_date}</span><br />
              </Col>
              <Col className="d-flex align-items-center justify-content-center">
                <a align="center" target="_blank" rel="noreferrer" href={this.props.track.external_urls.spotify}><img className="d-block" src={this.props.track.album.images[1].url} alt="album cover" width="150"/></a>
              </Col>
            </Row>
            

          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}