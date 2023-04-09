import { React, useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { SlidePanel } from '../slide-panel/slide-panel';
import { PlaylistTable } from './playlist-table/PlaylistTable';
import { LoadingSpinner } from '../LoadingSpinner';
import SpotifyService from '../spotify-service';
import { PlaylistModal } from './create-playlist-modal';
import './playlists.scss';
import { DeletePlaylist } from './delete-playlist-modal';
import { Paging } from '../paging';
import { BandView } from '../band-view/band-view';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Musicplayer from '../music-player/musicplayer';

const VIEWS = {
  PLAYLIST: 'PLAYLIST',
  BAND: 'BAND'
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
  const [pageTotal, setPageTotal] = useState(null);
  const [pageOptions, setPageOptions] = useState({offset: 0, currentPage: 1});
  const [selectedView, setSelectedView] = useState(VIEWS.PLAYLIST);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const selectedTrackUri = useRef(null);
  
  
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
    initPageTotal(item);
    updatePageOptions({offset: 0, currentPage: 1});
    fetchTracks(item.tracks.href);
  }

  function addParamsToUrl(url) {
    var params = "?offset=" + pageOptions.offset + "&limit=20";

    return url + params; 
  }
  
  function fetchTracks(trackUrl, stayOnCurrentPage = false, resetPaging = false) {
    setIsLoading(true);
    let url = stayOnCurrentPage ? addParamsToUrl(trackUrl) : trackUrl;
    SpotifyService.getPlaylistTracks(url).then((tracks) => {
      setPlaylistTracks(tracks);
      setHasError(false);
      if (tracks.items && tracks.items.length > 0) {
        setHasSongs(true);
      } else {
        setHasSongs(false);
        setDisplayMessage(addSongsMessage);
      }
      if (!stayOnCurrentPage && resetPaging) {
        updatePageOptions({offset: 0, currentPage: 1});
      }
      initPageTotal(tracks);
      setIsLoading(false);
      
    }, () => {
      setHasError(true);
      setDisplayMessage(errorMessage);
    });
  }

  function initPageTotal(item) {
    var limit = 20;
    var playlistTotal = item.tracks ? item.tracks.total : item.total;
    setPageTotal(Math.floor((playlistTotal / limit) + ((playlistTotal / limit > 1 && playlistTotal % limit !== 0) ? 1 : 0)));
  }

  function updatePageOptions(options) {
    setPageOptions({offset: options.offset, currentPage: options.currentPage});
  }

  function handleViewChange(VIEW, track) {
    setSelectedView(VIEW);
    setSelectedTrack(track);
  }

  // useEffect(() => {
  //   updateCurrentSong();
  // }, [selectedTrackUri]);

  function updateCurrentSong(trackUri) {
    console.log(trackUri)
    selectedTrackUri.current = trackUri;
    console.log(selectedTrackUri)
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
              {!isLoading && currentUser && selectedView === VIEWS.PLAYLIST && <PlaylistModal userId={currentUser.id} playlistCallback={() => (getPlaylists())}/>}
            </div>
          </Col>
          {selectedView === VIEWS.PLAYLIST ? ( 
            <Col>
              {!hasError && playlistSelected && !isLoading && selectedView !== VIEWS.BAND && 
                <DeletePlaylist playlist={selectedPlaylist} deleteCallback={() => (getPlaylists())} />
              }
              {!hasError && playlistSelected ? (
              isLoading ? (
                <LoadingSpinner />
              ) : (hasSongs ? (
                <>
                  <PlaylistTable 
                    playlistTracks={playlistTracks} 
                    selectedPlaylist={selectedPlaylist} 
                    deleteCallback={() => (fetchTracks(selectedPlaylist.tracks.href, true, false))}
                    showBandView={(track) => handleViewChange(VIEWS.BAND, track)}
                    setSelectedTrack={(trackUri) => updateCurrentSong(trackUri)}
                  />
                  {pageTotal > 1 && 
                    <Paging tracks={playlistTracks} 
                      pageTotal={pageTotal} 
                      pageOptions={pageOptions} 
                      updatePageOptions={(options) => updatePageOptions(options)} 
                      getPage={(url) => fetchTracks(url, false, false)}/>
                  }
                </>
                ) : (<p>{displayMessage}</p>))
              ) : (<p>{displayMessage}</p>)}
            </Col>
          ) : (
            <>
              <Col xs={9}>
                <Row>
                  <div className='mb-2' style={{paddingLeft: '0px'}}>
                    <Button variant='link' style={{float: 'left', textDecoration: 'none', paddingLeft: '0px'}} onClick={() => handleViewChange(VIEWS.PLAYLIST, null)}>
                      <FontAwesomeIcon icon="fa-solid fa-chevron-left"/> Back to Playlists
                    </Button>
                  </div>
                </Row>
                <Row>
                  <BandView track={selectedTrack} />
                </Row>
              </Col>
            </>
          )
          }
          {playlistSelected && selectedPlaylist.owner.id === currentUser.id && selectedView === VIEWS.PLAYLIST &&  
            <Col sm={1}>
              <SlidePanel playlist={selectedPlaylist} addSongCallback={(playlist) => (fetchTracks(playlist.tracks.href, false, true))}/>
            </Col>
          }
        </Row>
        <Row>
          <Musicplayer selectedTrack={selectedTrackUri.current}/>
        </Row>
      </Container>
    </>
  )
}