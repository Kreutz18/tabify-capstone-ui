import { SlidePanel } from '../slide-panel/slide-panel';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Spinner } from '../Spinner';
import './playlists.css';

export function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://api.spotify.com/v1/me/playlists", {
      method: 'get',
      headers: new Headers({ 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` })
    }).then(response => response.json()).then((data) => {
      setPlaylists(data.items);
      setLoading(false);
    });
  }, []);

  if (loading) {
    <Spinner />
  } else {
    return (
      <>
          <Row style={{height: "50vh"}}>
            <Col xs={4} className="border playlist-item-view">
              <ul className="playlist-list">
                {
                  // console.log(playlists)
                  playlists.map(el => 
                    <li className="list-item" key={el.id}>
                      {el.name}
                    </li>
                  )
                }
              </ul>
            </Col>
          </Row>
        <SlidePanel />
      </>
    )
  }
}