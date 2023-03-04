import { React, useEffect, useState } from 'react';         
import { LoadingSpinner } from '../LoadingSpinner';

const headers = {
  'Accept': 'application/json',
  'Content-type': 'application/json',
  'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
}

export function Home() {
  const [ username, setUsername ] = useState(null);
  const [ loading, setLoading ] = useState(false);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("loggedIn")) {
      getUserProfile();
    }
  }, [username])

  function getUserProfile() {
    setLoading(true);
    fetch("https://api.spotify.com/v1/me", {
        method: 'get',
        headers
    }).then((response) => response.json())
      .then((data) => {
        setIsLoggedIn(localStorage.getItem("loggedIn"));
        localStorage.setItem("user", JSON.stringify(data));
        setUsername(data.display_name);
        setLoading(false);
    });
  }

  return (
    !loading ? 
    (
      <>

        {isLoggedIn ? (
          <p>Welcome {username}</p>) : (<p></p>)}
      
      
        <div style={{fontSize: '24px', fontColor: 'green'}}>
          Tabify
        </div>
      </>
    ):(
      <LoadingSpinner />
    )
  )
}



