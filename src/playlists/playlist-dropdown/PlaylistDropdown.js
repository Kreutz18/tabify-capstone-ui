import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TrackDetailsModal } from '../track-details-modal';

  const headers = {
  'Accept': 'application/json',
  'Content-type': 'application/json',
  'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
}
  
  const CustomDropdown = React.forwardRef(({children, onClick}, ref) => (
    <FontAwesomeIcon id='dropdown-chevron-icon' className='clickable' icon="fa-solid fa-chevron-down" ref={ref} onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}>
    </FontAwesomeIcon>
  ));

  const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {

      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}>
          <ul className="list-unstyled" style={{margin: '0'}}>
            {React.Children.toArray(children).filter(
              (child) => child.props.children.toLowerCase()
            )}
          </ul>
        </div>
      );
    },
  )

  export function PlaylistDropdown({id, playlist, track, deleteCallback, showBandView}) {
    const user = JSON.parse(localStorage.getItem("user"));
    const [showDetails, setShowDetails] = useState(false);

    return (
      <>
        <Dropdown id={'dropdown-toggle-' + id}>
          <Dropdown.Toggle as={CustomDropdown}></Dropdown.Toggle>
          <Dropdown.Menu as={CustomMenu}>
            {
              playlist.owner.id === user.id && 
                <Dropdown.Item id={'dropdown-delete-' + id} eventKey="2" onClick={() => (deleteFunction(playlist.id, track.id, deleteCallback))}>Delete</Dropdown.Item>
            }
            <Dropdown.Item id={'dropdown-details-' + id} eventKey="3" onClick={() => setShowDetails(true)}>Details</Dropdown.Item>
            <Dropdown.Item id={'tab-details-' + id} eventKey="4" onClick={() => showBandView(track)}>Show Tab</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {showDetails && <TrackDetailsModal track={track} closeModal={() => setShowDetails(false)}/>}
      </>
    )
  }

 function deleteFunction (playlistId, trackId, deleteCallback)
 {
  var fetchUrl = "https://api.spotify.com/v1/playlists/"+ playlistId + "/tracks";
  var fetchBody = JSON.stringify({"tracks": [{"uri": "spotify:track:" + trackId}]});
  fetch(fetchUrl, {
        method: 'DELETE',
        headers,
        body: fetchBody
    }).then(() => {
      deleteCallback();
    })
 }