import { useState, useEffect } from "react"
import SpotifyPlayer from 'react-spotify-web-playback';

export default function Musicplayer({selectedTrackUri}) {
    const givenToken = localStorage.getItem("accessToken");
    console.log("Musicplayer:" + selectedTrackUri)
    // console.log(selectedTrackUri)
    return ( 
        <SpotifyPlayer
        token={givenToken}
        uris={selectedTrackUri}
        styles={{
            activeColor: '#fff',
            bgColor: '#333',
            color: '#fff',
            loaderColor: '#fff',
            sliderColor: '#1cb954',
            trackArtistColor: '#ccc',
            trackNameColor: '#fff',
          }}
        play={true}
    />
    )
}