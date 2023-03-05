import React, {useState} from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

  const headers = {
  'Accept': 'application/json',
  'Content-type': 'application/json',
  'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
}
  
  const CustomDropdown = React.forwardRef(({children, onClick}, ref) => (
    <FontAwesomeIcon className='clickable' icon="fa-solid fa-chevron-down" ref={ref} onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}>
    </FontAwesomeIcon>
  ));

  const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      const [value, setValue] = useState('');

      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}>
          <ul className="list-unstyled" style={{margin: '0'}}>
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value),
            )}
          </ul>
        </div>
      );
    },
  )

  export function PlaylistDropdown({playlist, trackId, deleteCallback}) {
    const user = JSON.parse(localStorage.getItem("user"));
    return (
      <Dropdown>
        <Dropdown.Toggle as={CustomDropdown}></Dropdown.Toggle>
        <Dropdown.Menu as={CustomMenu}>
          {
            playlist.owner.id === user.id && 
              <Dropdown.Item eventKey="1" onClick={() => (deleteFunction(playlist.id, trackId, deleteCallback))}>Delete</Dropdown.Item>
          }
          <Dropdown.Item eventKey="2">Details</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
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
