import { useEffect, useState } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

export function MusicPlayer() {
    const givenToken = localStorage.getItem("accessToken");
    const [trackUri, setTrackUri] = useState(null);
    
    useEffect(() => {
        const updateSong = () => {
            console.log('UPDATE SONG');

            setTrackUri(localStorage.getItem('trackUri'));
        };

        window.addEventListener('change_song', () => updateSong());
        return () => window.removeEventListener('change_song', updateSong());
    }, [trackUri]);


    return ( 
        trackUri && <SpotifyPlayer
            token={givenToken}
            uris={trackUri}
            styles={{
                activeColor: '#fff',
                width: '100%',
                bgColor: '#333',
                color: '#fff',
                loaderColor: '#fff',
                sliderColor: '#1cb954',
                trackArtistColor: '#ccc',
                trackNameColor: '#fff',
            }}
            play={trackUri ? true : false}
        />
    )
}