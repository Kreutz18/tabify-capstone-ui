import { SlidePanel } from '../slide-panel/slide-panel';
import './playlists.css';

export function Playlists() {
  const playlists = getUsersPlaylists();
  return (
    <>
      <p>Playlists Works!</p>
      <SlidePanel />
    </>
  )
}

function getUsersPlaylists() {
  fetch("http://localhost:8080/api/user-playlists")
    .then((response) => {
      console.log(response);
    }).catch((e) => {console.log(e);})
}