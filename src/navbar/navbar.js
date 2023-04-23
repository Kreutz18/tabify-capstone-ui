import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './navbar.scss';

export function NavigationBar() {
  const isLogin = localStorage.getItem("loggedIn");

  return (
    <Navbar collapseOnSelect bg="black" variant="dark" expand="md">
      <Container fluid>
        <Navbar.Brand href="/home" className="tabify-logo">
        <img src={require('./tabifylogo.png')} alt='tabify' width={"133px"} height={"30px"} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!isLogin ? (
              <LinkContainer to="/login">
                <Nav.Link>Login to Spotify</Nav.Link>
              </LinkContainer>
            ) :
            (
              <>
                <LinkContainer id='nav-playlist-link' to="/playlists">
                  <Nav.Link>Playlists</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/logout">
                  <Nav.Link>Logout</Nav.Link>
                </LinkContainer>
              </>
            )
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );}
