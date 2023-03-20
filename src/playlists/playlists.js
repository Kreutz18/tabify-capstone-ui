import { React, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { SlidePanel } from '../slide-panel/slide-panel';
import { PlaylistTable } from './playlist-table/PlaylistTable';
import { LoadingSpinner } from '../LoadingSpinner';
import SpotifyService from '../spotify-service';
import { PlaylistModal } from './create-playlist-modal';
import './playlists.scss';
import { DeletePlaylist } from './delete-playlist-modal';

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
    getPlaylists();
  }, []);
  
  function getPlaylists() {
    setIsLoading(true);
    SpotifyService.getPlaylists().then((data) => {
      setSelectedPlaylist(null);
      setPlaylistSelected(false);
      setDisplayMessage(selectPlaylistMessage);
      setPlaylists(data.items);
      setIsLoading(false);
    });
  }

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

  const currentUser = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Container className='mt-5' fluid>
        <Row>
          <label style={{width: '100%', textAlign: 'left', fontWeight: 500, fontSize: '20px'}}>Playlists</label>
          <Col md={3} lg={2}>
            <div>
              <ul  className='border playlist-container' style={{paddingLeft: "0px", margin: 'auto'}}>
                {playlists.map(el =>
                  <li className="list-item" key={el.id} value={el.name} onClick={(e) => {selectItem(e, el)}}>{el.name}</li>
                )}
              </ul>
              <PlaylistModal userId={currentUser.id} playlistCallback={() => (getPlaylists())}/>
            </div>
          </Col>
          <Col>
          {!hasError && playlistSelected && !isLoading && 
            <DeletePlaylist playlist={selectedPlaylist} deleteCallback={() => (getPlaylists())} />
          }
          {!hasError && playlistSelected ? (
            isLoading ? (
              <LoadingSpinner />
            ) : (hasSongs ? (
                <PlaylistTable playlistTracks={playlistTracks} selectedPlaylist={selectedPlaylist} deleteCallback={() => (fetchTracks(selectedPlaylist.tracks.href))}/>
              ) : (<p>{displayMessage}</p>))
            ) : (<p>{displayMessage}</p>)
          }
          </Col>
          {playlistSelected && selectedPlaylist.owner.id === currentUser.id && 
            <Col sm={1}>
              <SlidePanel playlist={selectedPlaylist} addSongCallback={(playlist) => (fetchTracks(playlist.tracks.href))}/>
            </Col>
          }
        </Row>
      </Container>
    </>
  )
}