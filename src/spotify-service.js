const basePlaylistUrl = 'https://api.spotify.com/v1/playlists/';
const baseUserPlaylistUrl = 'https://api.spotify.com/v1/me/playlists';
const baseSearchUrl = 'https://api.spotify.com/v1/search';
const baseUsersUrl = 'https://api.spotify.com/v1/users/';

const getHeader = {
  headers: new Headers({ 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` }),
  method: 'get'
};

const postHeader = {
  headers: new Headers({ 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` }),
  method: 'POST'
};

const deleteHeader = {
  headers: new Headers({ 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` }),
  method: 'DELETE'
};

const SpotifyService = {
  addSongToPlaylist: async (playlistId, trackUri) => {
    var params = '?position=0&uris=' + trackUri;
    const response = await fetch(basePlaylistUrl + playlistId + '/tracks' + params, postHeader);
    return await response.json();
  },

  createPlaylist: async (userId, name, description, isPublic) => {
    const header = {
      method: 'POST',
      headers: 
        new Headers({ 
          'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
          'Content-Type': 'application/json'   
        }),
      body: JSON.stringify({
        'name': name,
        'description': description,
        'public': isPublic
      })
    };

    const response = await fetch(baseUsersUrl + userId + '/playlists', header);
    return await response.json();
  },

  getPlaylists: async () => {
    const response = await fetch(baseUserPlaylistUrl, getHeader);
    return await response.json();
  },

  getPlaylistTracks: async (trackUrl) => {
    var paramsString = trackUrl.includes("?") ? '' : '?offset=0&limit=20';
    const response = await fetch(trackUrl + paramsString, getHeader);
    return await response.json();
  },

  search: async (keyword, typeString) => {
    var params = '?q=' + keyword + '&type=' + typeString;
    const response = await fetch(baseSearchUrl + params, getHeader);
    return await response.json();
  },

  unfollowPlaylist: async (playlistId) => {
    await fetch(basePlaylistUrl + playlistId + '/followers', deleteHeader);
  }
}

export default SpotifyService;