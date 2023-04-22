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
          <p style={{textAlign: 'right', padding:'10px'}}>Welcome {username}</p>) : (<p></p>)}
        
        <div style={{fontSize: '30px', padding: "20px 5px 35px", color:'green'}}>
          Hello and Welcome to Tabify!
        </div>
      
        <div style={{fontSize: '30px', textAlign: "left", padding: "25px 10px 0px", margin:'25px, 100px'}}>
          What is Tabify?
        </div>

        <div style={{fontSize: '20px', textAlign: "left", padding: "25px 10px 25px", margin:'25px, 100px'}}>
         Our application is a music-related web application that utilizes the Spotify API and a web scraper based on Ultimate-Guitar to provide users with track data, including information about artists, albums, and lyrics. Users can search for their favorite songs or artists and retrieve relevant information, such as album artwork, release dates, and track duration. Additionally, the application also integrates with a web scraper from Ultimate-Guitar, allowing users to access tabs and bass notes for their favorite songs, making it a comprehensive platform for music enthusiasts to explore and learn about their favorite tracks. By combining data from these sources, users can access both the audio content and the accompanying musical notation, making it easier to study or perform the music they are interested in. Overall, our application offers a valuable tool for anyone interested in music, whether as a casual listener or a more serious practitioner.
        </div>

        <div style={{fontSize: '30px', textAlign: "left", padding: "25px 10px 0px", margin:'25px, 100px'}}>
          How do I begin using Tabify?
        </div>

        <div style={{fontSize: '20px', fontColor: 'blue', textAlign: "left", padding: "25px 10px 0px", margin:'20px, 100px'}}>
          Please click on the 'Login to Spotify' prompt and navigate to the 'Playlists' view. From there you should have your Spotify Playlists already imported! Click on a track to begin playing a song off your playlist. Click on the 3 dots to the left to view other key track details such as album artwork, release dates, and track duration. You can also view the song's tab information from there. After clicking on a selected 6 String or Bass, you can see the chords from there!
        </div>
      </>
    ):(
      <LoadingSpinner />
    )
  )
}



