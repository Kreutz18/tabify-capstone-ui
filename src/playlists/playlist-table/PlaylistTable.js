import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "react-bootstrap";
import { PlaylistDropdown } from "../playlist-dropdown/PlaylistDropdown";
import { getTime } from "../../time-service";

export function PlaylistTable({playlistTracks, selectedPlaylist, deleteCallback}) {
  return (
    <Table hover>
      <thead>
        <tr>
          <th className='align-left'>#</th>
          <th className='align-left'>Title</th>
          <th className='align-left'>Artist</th>
          <th><FontAwesomeIcon icon="fa-regular fa-clock" /></th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {playlistTracks.items?.map((item, i) => {
          return (
            <tr key={i}>
              <td className='align-left' key={'number-' + item.track.id}>{i + 1}</td>
              <td className='align-left' key={'name-' + item.track.id}>{item.track.name}</td>
              <td className='align-left' key={item.track.artists[0].id + '-' + item.track.id}>{item.track.artists[0].name}</td>
              <td key={'time-' + item.track.id + '-' + item.track.id}>{getTime(item.track.duration_ms)}</td>
              <td key={'chevron-' + item.track.id} >
                <PlaylistDropdown id={i} playlist={selectedPlaylist} track={item.track} deleteCallback={deleteCallback}/>
              </td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}