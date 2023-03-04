import { React, useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { SlidePanel } from '../slide-panel/slide-panel';
import { PlaylistTable } from './playlist-table/PlaylistTable';
import { LoadingSpinner } from '../LoadingSpinner';
import './playlists.scss';
import SpotifyService from '../spotify-service';

const headers = {
  headers: new Headers({ 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` }),
  method: 'get'
};

export function Playlists() {
  const selectPlaylistMessage = 'Please select a playlist';
  const errorMessage = 'Error while fetching playlist';
  const addSongsMessage = 'Add songs to view playlist';
  const [playlists, setPlaylists] = useState([]);
  const [previousTarget, setPreviousTarget] = useState(null);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistSelected, setPlaylistSelected] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hasSongs, setHasSongs] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(selectPlaylistMessage);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  


  useEffect(() => {
    setIsLoading(true);
    SpotifyService.getPlaylists().then((data) => {
      setPlaylists(data.items);
      setIsLoading(false);
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
    setSelectedPlaylist(item);
    setPlaylistSelected(true);
    fetchTracks(item.tracks.href);
  }
  
  function fetchTracks(trackUrl) {
    setIsLoading(true);
    SpotifyService.getPlaylistTracks(trackUrl).then((tracks) => {
      setPlaylistTracks(tracks);
      setHasError(false);
      if (tracks.items && tracks.items.length > 0) {
        setHasSongs(true);
      } else {
        setHasSongs(false);
        setDisplayMessage(addSongsMessage);
      }
      setIsLoading(false);
    }, () => {
      setHasError(true);
      setDisplayMessage(errorMessage);
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
          {!hasError && playlistSelected ? (
            isLoading ? (
              <LoadingSpinner />
            ) : (hasSongs ? (
                <PlaylistTable playlistTracks={playlistTracks} selectedPlaylist={selectedPlaylist} deleteCallback={() => (fetchTracks(selectedPlaylist.tracks.href))}/>
              ) : (<p>{displayMessage}</p>))
            ) : (<p>{displayMessage}</p>)
          }
          </Col>
          {playlistSelected && 
            <Col sm={1}>
              <SlidePanel playlist={selectedPlaylist} addSongCallback={(playlist) => (fetchTracks(playlist.tracks.href))}/>
            </Col>
          }
        </Row>
      </Container>
    </>
  )
}



