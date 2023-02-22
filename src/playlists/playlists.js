import { SlidePanel } from '../slide-panel/slide-panel';
import { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import './playlists.scss';
// import { Button } from 'bootstrap';

const hardCodedPlaylists = [
  {id: 1, name: 'Rock This'},
  {id: 2, name: 'Country Mix'},
  {id: 3, name: 'Luke Combs Radio'},
  {id: 4, name: 'CCMF 2021'},
  {id: 5, name: 'Blues'},
  {id: 6, name: 'Jazz'},
  {id: 7, name: 'Tunes'},
  {id: 8, name: 'Oscars'},
  {id: 9, name: 'Rap'},
  {id: 10, name: 'Outlaw Country'},
  {id: 11, name: 'Good Stuff'},
  {id: 12, name: 'Liked'},
  {id: 13, name: 'Good Vibes'},
  {id: 14, name: 'Starred'},
  {id: 15, name: 'Band'},
  {id: 16, name: 'SkatePark Punks'},
];

export function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [previousTarget, setPreviousTarget] = useState(null);

  useEffect(() => {
    setPlaylists(hardCodedPlaylists);
    // fetch("https://api.spotify.com/v1/me/playlists", {
    //   method: 'get',
    //   headers: new Headers({ 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` })
    // }).then(response => response.json()).then((data) => {
    //   setPlaylists(data.items);
    // });
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
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col md={{span: 3, offset: 1}} lg={{span: 2, offset: 1}}>
          <div  className="mt-5 ">
            <label style={{width: '100%', textAlign: 'left', fontWeight: 500, fontSize: '20px'}}>Playlists</label>
            <ul  className='border playlist-container' style={{paddingLeft: "0px", margin: 'auto'}}>
              {playlists.map(el =>
                <li className="list-item" key={el.id} value={el.name} onClick={(e) => {selectItem(e, el)}}>{el.name}</li>
              )}
            </ul>
            <Button className='playlist-button' style={{width: '100%'}} variant="dark"> Create Playlist</Button>
          </div>

          </Col>
          <Col>
            <SlidePanel />
          </Col>
        </Row>
      </Container>
    </>
  )
}



