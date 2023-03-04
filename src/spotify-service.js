const basePlaylistUrl = 'https://api.spotify.com/v1/playlists/';
const baseUserPlaylistUrl = 'https://api.spotify.com/v1/me/playlists';
const baseSearchUrl = 'https://api.spotify.com/v1/search';

const getHeader = {
  headers: new Headers({ 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` }),
  method: 'get'
};

const postHeader = {
  headers: new Headers({ 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` }),
  method: 'POST'
};

const SpotifyService = {
  getPlaylists: async () => {
    const response = await fetch(baseUserPlaylistUrl, getHeader);
    return await response.json();
  },

  getPlaylistTracks: async (trackUrl) => {
    const response = await fetch(trackUrl + '?offset=0&limit=20', getHeader);
    return await response.json();
  },

  addSongToPlaylist: async (playlistId, trackUri) => {
    var params = '?position=0&uris=' + trackUri;
    const response = await fetch(basePlaylistUrl + playlistId + '/tracks' + params, postHeader);
    return await response.json();
  },

  search: async (keyword, typeString) => {
    var params = '?q=' + keyword + '&type=' + typeString;
    const response = await fetch(baseSearchUrl + params, getHeader);
    return await response.json();
  },
}

export default SpotifyService;