import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { SlidePanel } from '../slide-panel/slide-panel';
import './playlists.scss';

const hardCodedPlaylists = [
  {id: 1, name: 'Rock This'},
  {id: 2, name: 'Country Mix'},
  {id: 3, name: 'Luke Combs Radio'},
  {id: 4, name: 'CCMF 2021'},
  {id: 5, name: 'Blues'},
  {id: 6, name: 'Jazz'},
  {id: 7, name: 'Tunes'},
  {id: 8, name: 'Oscars'},
  {id: 9, name: 'Rap'},
  {id: 10, name: 'Outlaw Country'},
  {id: 11, name: 'Good Stuff'},
  {id: 12, name: 'Liked'},
  {id: 13, name: 'Good Vibes'},
  {id: 14, name: 'Starred'},
  {id: 15, name: 'Band'},
  {id: 16, name: 'SkatePark Punks'},
];

export function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [previousTarget, setPreviousTarget] = useState(null);
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const headers = {
    method: 'get',
    headers: new Headers({ 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` })
  };

  useEffect(() => {
    // setPlaylists(hardCodedPlaylists);
    fetch("https://api.spotify.com/v1/me/playlists", headers).then(response => response.json()).then((data) => {
      
      setPlaylists(data.items);
      console.log(playlists);
    });
  }, []);

  function selectItem(event, item) {
    if (previousTarget) {
      if (previousTarget !== event.target) {
        previousTarget.classList.remove('selected');
        event.target.classList.add('selected');
        setPreviousTarget(event.target);
      } else {
        previousTarget.classList.toggle('selected');
      }
    } else {
      event.target.classList.add('selected');
      setPreviousTarget(event.target);
    }

    fetchTracks(item.tracks.href);
  }

  function fetchTracks(trackUrl) {
    fetch(trackUrl + '?offset=0&limit=20', headers).then(response => response.json()).then((tracks) => {
      setPlaylistTracks(tracks);
    });
  }

  function millisToMinutesAndSeconds(milliseconds) {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
    const hours = Math.floor((milliseconds / 1000 / 60 / 60) % 24);
    return (hours ? hours + ":" : '') + (hours && minutes < 10 ? '0' : '') + minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  return (
    <>
      <Container className='mt-5' fluid>
        <Row>
          <Col md={3} lg={2}>
            <label style={{width: '100%', textAlign: 'left', fontWeight: 500, fontSize: '20px'}}>Playlists</label>
            <div>
              <ul  className='border playlist-container' style={{paddingLeft: "0px", margin: 'auto'}}>
                {playlists.map(el =>
                  <li className="list-item" key={el.id} value={el.name} onClick={(e) => {selectItem(e, el)}}>{el.name}</li>
                )}
              </ul>
              <Button className='playlist-button' style={{width: '100%'}} variant="dark"> Create Playlist</Button>
            </div>
          </Col>
          <Col>
            <Table hover responsive>
              <thead>
                <tr className='align-left'>
                  <th>#</th>
                  <th>Title</th>
                  <th>Album</th>
                  <th>Date Added</th>
                  <th><FontAwesomeIcon icon="fa-regular fa-clock" /></th>
                </tr>
              </thead>
              <tbody>
                {playlistTracks.items?.map((item, i) => {
                    return (
                      <tr key={i} className='align-left'>
                        <td key={'number-' + item.track.id}>{i + 1}</td>
                        <td key={'name-' + item.track.id}>{item.track.name}</td>
                        <td key={item.track.album.id + '-' + item.track.id}>{item.track.album.name}</td>
                        <td key={'time-' + item.track.id + '-' + item.track.id}>{millisToMinutesAndSeconds(item.track.duration_ms)}</td>
                        <td key={'chevron-' + item.track.id} className='clickable'><FontAwesomeIcon icon="fa-solid fa-chevron-down" /></td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
          </Col>
          <Col sm={1}>
            <SlidePanel />
          </Col>
        </Row>
      </Container>
    </>
  )
}



