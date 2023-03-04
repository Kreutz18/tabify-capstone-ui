import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "react-bootstrap";
import { PlaylistDropdown } from "../playlist-dropdown/PlaylistDropdown";

function millisToMinutesAndSeconds(milliseconds) {
  const seconds = Math.floor((milliseconds / 1000) % 60);
  const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
  const hours = Math.floor((milliseconds / 1000 / 60 / 60) % 24);
  return (hours ? hours + ":" : '') + (hours && minutes < 10 ? '0' : '') + minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

export function PlaylistTable({playlistTracks, selectedPlaylistId, deleteCallback}) {
  return (
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
              <td key={'chevron-' + item.track.id} className='clickable'>
                <PlaylistDropdown playlistId = {selectedPlaylistId} trackId = {item.track.id} deleteCallback={deleteCallback}/>
              </td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}