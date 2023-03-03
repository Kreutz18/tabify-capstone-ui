import { React, useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { SlidePanel } from '../slide-panel/slide-panel';
import { PlaylistTable } from './playlist-table/PlaylistTable';
import { LoadingSpinner } from '../LoadingSpinner';
import './playlists.scss';

const headers = {
  headers: new Headers({ 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` }),
  method: 'get'
};

export function Playlists() {
  const addSongsMessage = 'Add songs to view playlist';
  const errorMessage = 'Error while fetching playlist';
  const [playlists, setPlaylists] = useState([]);
  const [previousTarget, setPreviousTarget] = useState(null);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistSelected, setPlaylistSelected] = useState(false);
  const [hasSongs, setHasSongs] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [playlistMessage, setPlaylistMessage] = useState(addSongsMessage);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  


  useEffect(() => {
    fetch("https://api.spotify.com/v1/me/playlists", headers).then(response => response.json()).then((data) => {
      setPlaylists(data.items);
      localStorage.setItem("playlist_info", JSON.stringify(data))
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
    setSelectedPlaylist(item.id);
    fetchTracks(item.tracks.href);
  }
  
  function fetchTracks(trackUrl) {
    setIsLoading(true);
    fetch(trackUrl + '?offset=0&limit=20', headers).then(response => response.json()).then((tracks) => {
      setPlaylistTracks(tracks);
      setPlaylistSelected(true);
      setHasSongs(tracks.items && tracks.items.length > 0 ? true : false);
      setPlaylistMessage(addSongsMessage);
      setIsLoading(false);
    }, err => {
      setIsLoading(false);
      setPlaylistMessage(errorMessage);
    });
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
          {playlistSelected ? (
            isLoading ? (
              <LoadingSpinner />
            ) : (hasSongs ? (
                <PlaylistTable playlistTracks={playlistTracks} selectedPlaylistId={selectedPlaylist}/>
              ) : (<p>Add songs to view playlist</p>))
            ) : (<p>{playlistMessage}</p>)
          }
          </Col>
          <Col sm={1}>
            <SlidePanel />
          </Col>
        </Row>
      </Container>
    </>
  )
}



